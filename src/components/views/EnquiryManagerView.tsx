import React, { useState, useEffect } from 'react';
import { EnquirySubmission, EnquiryReplyItem } from '../../types';
import { DirectEmailModal } from '../admin/DirectEmailModal';
import { ScheduleMeetingModal } from '../admin/ScheduleMeetingModal';
import { SEOGuideModal } from '../common/SEOGuideModal';
import { getAdminSession } from '../../services/authService';
import { 
  saveScheduledMeetingToSupabase, 
  deleteMeetingFromSupabase, 
  deleteContractFromSupabase 
} from '../../services/supabaseClient';
import { 
  Database, 
  Search, 
  RefreshCw, 
  Download, 
  Trash2, 
  Copy, 
  Check, 
  Code,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Send,
  MessageSquare,
  Mail,
  Phone,
  FileCheck,
  TrendingUp,
  AlertCircle,
  Briefcase,
  Users,
  ChevronRight,
  ExternalLink,
  DollarSign,
  LogOut,
  ShieldCheck,
  CalendarCheck,
  Save,
  Sparkles
} from 'lucide-react';

interface EnquiryManagerViewProps {
  enquiries: EnquirySubmission[];
  isLoading?: boolean;
  onRefresh: () => void;
  onUpdateStatus: (id: string, newStatus: EnquirySubmission['status']) => void;
  onUpdateFullEnquiry: (enquiry: EnquirySubmission) => void;
  onDeleteEnquiry: (id: string) => void;
  onLogout?: () => void;
}

export const EnquiryManagerView: React.FC<EnquiryManagerViewProps> = ({
  enquiries,
  isLoading = false,
  onRefresh,
  onUpdateStatus,
  onUpdateFullEnquiry,
  onDeleteEnquiry,
  onLogout,
}) => {
  const adminSession = getAdminSession();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all-enquiries' | 'meetings' | 'deals'>('all-enquiries');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquirySubmission | null>(
    enquiries[0] || null
  );

  // Direct In-App Email State
  const [isDirectEmailModalOpen, setIsDirectEmailModalOpen] = useState<boolean>(false);
  const [directEmailNotice, setDirectEmailNotice] = useState<string | null>(null);
  const [showSEOGuide, setShowSEOGuide] = useState<boolean>(false);

  // Dedicated Schedule Meeting Modal State
  const [isScheduleMeetingModalOpen, setIsScheduleMeetingModalOpen] = useState<boolean>(false);
  const [meetingModalTarget, setMeetingModalTarget] = useState<EnquirySubmission | null>(null);

  const handleMeetingModalSaved = (updatedRecord: EnquirySubmission) => {
    onUpdateFullEnquiry(updatedRecord);
    if (selectedEnquiry && selectedEnquiry.id === updatedRecord.id) {
      setSelectedEnquiry(updatedRecord);
    }
    setDirectEmailNotice(
      `Meeting scheduled and timestamp saved directly to Supabase record ('scheduled_meeting': ${updatedRecord.scheduledMeeting})!`
    );
    setTimeout(() => setDirectEmailNotice(null), 6000);
  };

  // Dedicated In-App Deletion Confirmation States (No blocked window.confirm)
  const [enquiryToDelete, setEnquiryToDelete] = useState<EnquirySubmission | null>(null);
  const [meetingToDelete, setMeetingToDelete] = useState<EnquirySubmission | null>(null);
  const [contractToDelete, setContractToDelete] = useState<EnquirySubmission | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // 1. Permanently Delete Enquiry
  const handleConfirmDeleteEnquiry = async () => {
    if (!enquiryToDelete) return;
    setIsDeleting(true);
    const targetId = enquiryToDelete.id;
    try {
      await onDeleteEnquiry(targetId);
      if (selectedEnquiry && selectedEnquiry.id === targetId) {
        setSelectedEnquiry(null);
      }
      setEnquiryToDelete(null);
      setDirectEmailNotice(`Enquiry ${targetId} permanently deleted from records.`);
      setTimeout(() => setDirectEmailNotice(null), 5000);
    } catch (err: any) {
      console.warn('Delete enquiry notice:', err);
      if (selectedEnquiry && selectedEnquiry.id === targetId) {
        setSelectedEnquiry(null);
      }
      setEnquiryToDelete(null);
      setDirectEmailNotice(`Enquiry ${targetId} removed from view.`);
      setTimeout(() => setDirectEmailNotice(null), 5000);
    } finally {
      setIsDeleting(false);
    }
  };

  // 2. Cancel & Delete Scheduled Meeting
  const handleConfirmDeleteMeeting = async () => {
    const target = meetingToDelete || selectedEnquiry;
    if (!target) return;
    setIsDeleting(true);
    try {
      await deleteMeetingFromSupabase(target.id, 'Discussion');
      const cleared: EnquirySubmission = { ...target };
      delete cleared.scheduledMeeting;
      delete cleared.scheduledMeetingDate;
      delete cleared.scheduledMeetingTime;
      delete cleared.meetingPlatform;
      delete cleared.meetingLink;
      cleared.status = 'Discussion';
      onUpdateFullEnquiry(cleared);
      if (selectedEnquiry && selectedEnquiry.id === target.id) {
        setSelectedEnquiry(cleared);
      }
      setMeetingToDelete(null);
      setDirectEmailNotice(`Scheduled meeting for ${target.fullName} was cancelled and cleared.`);
      setTimeout(() => setDirectEmailNotice(null), 5000);
    } catch (err) {
      console.warn('Delete meeting exception:', err);
      const cleared: EnquirySubmission = { ...target };
      delete cleared.scheduledMeeting;
      delete cleared.scheduledMeetingDate;
      delete cleared.scheduledMeetingTime;
      delete cleared.meetingPlatform;
      delete cleared.meetingLink;
      cleared.status = 'Discussion';
      onUpdateFullEnquiry(cleared);
      if (selectedEnquiry && selectedEnquiry.id === target.id) {
        setSelectedEnquiry(cleared);
      }
      setMeetingToDelete(null);
      setDirectEmailNotice(`Scheduled meeting for ${target.fullName} cancelled.`);
      setTimeout(() => setDirectEmailNotice(null), 5000);
    } finally {
      setIsDeleting(false);
    }
  };

  // 3. Clear / Delete Agreed Deal & Contract
  const handleConfirmDeleteContract = async () => {
    const target = contractToDelete || selectedEnquiry;
    if (!target) return;
    setIsDeleting(true);
    try {
      await deleteContractFromSupabase(target.id, 'Discussion');
      const cleared: EnquirySubmission = { ...target };
      delete cleared.dealAmount;
      delete cleared.dealNotes;
      cleared.status = 'Discussion';
      onUpdateFullEnquiry(cleared);
      if (selectedEnquiry && selectedEnquiry.id === target.id) {
        setSelectedEnquiry(cleared);
      }
      setContractToDelete(null);
      setDirectEmailNotice(`Agreed deal and contract terms for ${target.fullName} were removed.`);
      setTimeout(() => setDirectEmailNotice(null), 5000);
    } catch (err) {
      console.warn('Delete contract exception:', err);
      const cleared: EnquirySubmission = { ...target };
      delete cleared.dealAmount;
      delete cleared.dealNotes;
      cleared.status = 'Discussion';
      onUpdateFullEnquiry(cleared);
      if (selectedEnquiry && selectedEnquiry.id === target.id) {
        setSelectedEnquiry(cleared);
      }
      setContractToDelete(null);
      setDirectEmailNotice(`Agreed deal for ${target.fullName} removed.`);
      setTimeout(() => setDirectEmailNotice(null), 5000);
    } finally {
      setIsDeleting(false);
    }
  };

  // 4. Delete Single Recorded Reply Item from Audit History
  const handleDeleteReplyItem = (replyIndex: number) => {
    if (!selectedEnquiry || !selectedEnquiry.replyHistory) return;
    const updatedHistory = selectedEnquiry.replyHistory.filter((_, idx) => idx !== replyIndex);
    const updated: EnquirySubmission = {
      ...selectedEnquiry,
      replyHistory: updatedHistory,
    };
    setSelectedEnquiry(updated);
    onUpdateFullEnquiry(updated);
    setDirectEmailNotice('Communication history record removed.');
    setTimeout(() => setDirectEmailNotice(null), 4000);
  };

  const handleOpenEmailFromMeetingModal = (
    enq: EnquirySubmission,
    meetingDateStr: string,
    meetingTimeStr: string,
    meetingPlatformStr: string,
    meetingLinkStr: string
  ) => {
    setSelectedEnquiry(enq);
    setReplyType('meeting');
    setMeetingDate(meetingDateStr);
    setMeetingTime(meetingTimeStr);
    setMeetingPlatform(meetingPlatformStr as any);
    setMeetingLink(meetingLinkStr);
    setIsDirectEmailModalOpen(true);
  };

  // Reply Composer & Date/Time Scheduling State
  const [replyType, setReplyType] = useState<
    'general' | 'meeting' | 'deal' | 'custom'
  >('general');

  const defaultMeetingDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [meetingDate, setMeetingDate] = useState<string>(defaultMeetingDate);
  const [meetingTime, setMeetingTime] = useState<string>('11:00 AM');
  const [meetingDateTimeInput, setMeetingDateTimeInput] = useState<string>(
    `${defaultMeetingDate}T11:00`
  );
  const [isSavingMeeting, setIsSavingMeeting] = useState<boolean>(false);

  const [meetingPlatform, setMeetingPlatform] = useState<
    'Google Meet' | 'Zoom' | 'Phone Call' | 'In-Person / Office'
  >('Google Meet');
  const [meetingLink, setMeetingLink] = useState<string>('https://meet.google.com/new');
  const [meetingTopic, setMeetingTopic] = useState<string>('Project Discovery & Requirements Walkthrough');

  // Synchronize meeting schedule state whenever active enquiry changes
  useEffect(() => {
    if (selectedEnquiry?.scheduledMeeting) {
      try {
        const dt = new Date(selectedEnquiry.scheduledMeeting);
        if (!isNaN(dt.getTime())) {
          const iso = dt.toISOString();
          const d = iso.split('T')[0];
          const t = iso.split('T')[1].substring(0, 5);
          setMeetingDate(d);
          setMeetingDateTimeInput(`${d}T${t}`);
          const hour = dt.getHours();
          const minute = dt.getMinutes().toString().padStart(2, '0');
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const hr12 = hour % 12 || 12;
          setMeetingTime(`${hr12}:${minute} ${ampm}`);
        }
      } catch {
        // fallback
      }
    } else if (selectedEnquiry?.scheduledMeetingDate) {
      setMeetingDate(selectedEnquiry.scheduledMeetingDate);
      if (selectedEnquiry.scheduledMeetingTime) {
        setMeetingTime(selectedEnquiry.scheduledMeetingTime);
      }
    }
  }, [selectedEnquiry?.id]);

  const handleDateTimeInputChange = (val: string) => {
    setMeetingDateTimeInput(val);
    if (val && val.includes('T')) {
      const [d, t] = val.split('T');
      setMeetingDate(d);
      if (t) {
        const [hr, min] = t.split(':');
        const hourNum = parseInt(hr, 10);
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        const formattedHour = hourNum % 12 || 12;
        setMeetingTime(`${formattedHour}:${min || '00'} ${ampm}`);
      }
    }
  };

  const handleSetQuickTime = (timeDisplay: string, time24: string) => {
    setMeetingTime(timeDisplay);
    const datePart = meetingDateTimeInput.split('T')[0] || meetingDate;
    setMeetingDateTimeInput(`${datePart}T${time24}`);
  };

  const handleSetQuickDate = (daysFromNow: number) => {
    const targetDate = new Date(Date.now() + daysFromNow * 86400000);
    const dateStr = targetDate.toISOString().split('T')[0];
    setMeetingDate(dateStr);
    const timePart = meetingDateTimeInput.split('T')[1] || '11:00';
    setMeetingDateTimeInput(`${dateStr}T${timePart}`);
  };

  const handleSaveMeetingDirectlyToSupabase = async () => {
    if (!selectedEnquiry) return;
    setIsSavingMeeting(true);

    let isoTimestamp: string;
    try {
      const parsedDate = new Date(meetingDateTimeInput);
      if (isNaN(parsedDate.getTime())) {
        isoTimestamp = new Date(`${meetingDate}T11:00:00`).toISOString();
      } else {
        isoTimestamp = parsedDate.toISOString();
      }
    } catch {
      isoTimestamp = new Date().toISOString();
    }

    const res = await saveScheduledMeetingToSupabase(selectedEnquiry.id, isoTimestamp, {
      dateStr: meetingDate,
      timeStr: meetingTime,
      meetingPlatform,
      meetingLink,
      meetingAgenda: meetingTopic,
    });

    setIsSavingMeeting(false);

    const updatedRecord: EnquirySubmission = {
      ...selectedEnquiry,
      status: 'Meeting Scheduled',
      scheduledMeeting: isoTimestamp,
      scheduledMeetingDate: meetingDate,
      scheduledMeetingTime: meetingTime,
      meetingPlatform,
      meetingLink,
    };

    onUpdateFullEnquiry(updatedRecord);
    setSelectedEnquiry(updatedRecord);

    setDirectEmailNotice(
      `Meeting scheduled and timestamp saved directly to Supabase record ('scheduled_meeting': ${isoTimestamp})!`
    );
    setTimeout(() => setDirectEmailNotice(null), 6000);
  };

  // Deal state
  const [dealAmount, setDealAmount] = useState<string>('₹ 50,000');
  const [dealMilestones, setDealMilestones] = useState<string>('30% Advance Kickoff, 40% Milestone Staging Demo, 30% Final Delivery & Code Handover');
  const [dealScopeNotes, setDealScopeNotes] = useState<string>('Complete responsive web application, custom database, and cloud deployment.');

  // Custom text state
  const [customReplyMessage, setCustomReplyMessage] = useState<string>('');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [showSqlGuide, setShowSqlGuide] = useState<boolean>(false);
  const [sqlMode, setSqlMode] = useState<'alter' | 'fresh'>('alter');
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  const statuses: EnquirySubmission['status'][] = [
    'New',
    'Contacted',
    'Discussion',
    'Meeting Scheduled',
    'Proposal Sent',
    'Negotiation',
    'Won',
    'Lost',
  ];

  // Filtered inquiries
  const filtered = enquiries.filter((item) => {
    if (activeTab === 'meetings') {
      if (!item.scheduledMeetingDate && item.status !== 'Meeting Scheduled') return false;
    } else if (activeTab === 'deals') {
      if (item.status !== 'Won' && item.status !== 'Negotiation' && !item.dealAmount) return false;
    }

    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.serviceRequired.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.companyName && item.companyName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  // KPI Calculations
  const totalCount = enquiries.length;
  const newCount = enquiries.filter((e) => e.status === 'New').length;
  const meetingCount = enquiries.filter(
    (e) => e.status === 'Meeting Scheduled' || Boolean(e.scheduledMeetingDate)
  ).length;
  const wonCount = enquiries.filter((e) => e.status === 'Won').length;

  const getStatusBadge = (status: EnquirySubmission['status']) => {
    const colors: Record<EnquirySubmission['status'], string> = {
      New: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      Contacted: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      Discussion: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      'Meeting Scheduled': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-bold',
      'Proposal Sent': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
      Negotiation: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      Won: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-bold',
      Lost: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    };
    return colors[status] || 'bg-slate-100 text-slate-800';
  };

  // Generate Reply Message Text based on selected tab and enquiry
  const generateReplyContent = (): { subject: string; message: string } => {
    if (!selectedEnquiry) {
      return { subject: '', message: '' };
    }

    const clientName = selectedEnquiry.fullName.split(' ')[0] || selectedEnquiry.fullName;
    const service = selectedEnquiry.serviceRequired;
    const refId = selectedEnquiry.id;

    if (replyType === 'general') {
      const subject = `AB TechSol &middot; Regarding your inquiry for ${service} [${refId}]`;
      const message = `Hello ${clientName},

Thank you for reaching out to AB TechSol regarding ${service}. We have reviewed your initial project notes:

"${selectedEnquiry.description}"

We would love to understand more about your business goals and share how we can architect a high-performance solution for you.

Key Highlights of partnering with AB TechSol:
- Custom-built architecture tailored to your specific workflows
- 100% intellectual property and full source code ownership upon completion
- Transparent milestone schedules with zero hidden lock-ins

Could you let us know what time works best for a brief 15-minute phone or Google Meet call to discuss?

Warm regards,
AB &middot; Founder & Technology Lead
AB TechSol | Your Vision. Our Technology. Real Solutions.
Phone / WhatsApp: +91 8861375377
Email: abtechsol660@gmail.com
Hassan, Karnataka, India`;

      return { subject, message };
    }

    if (replyType === 'meeting') {
      const subject = `Presentation & Discovery Meeting: ${service} &middot; AB TechSol [${refId}]`;
      const message = `Hello ${clientName},

We are excited to schedule our Presentation & Discovery Consultation for your ${service} initiative.

Meeting Schedule Details:
- Date: ${meetingDate}
- Time: ${meetingTime} IST
- Platform: ${meetingPlatform}
- Meeting Link / Location: ${meetingLink || 'Phone Call to ' + selectedEnquiry.phone}
- Agenda: ${meetingTopic}

During this session, we will present our technical blueprint, walk you through the system workflow, and outline estimated sprint milestones.

Please confirm if this time works for you, or let us know an alternative slot.

Looking forward to speaking with you!

Warm regards,
AB &middot; Technology Lead
AB TechSol
Mobile / WhatsApp: +91 8861375377
Email: abtechsol660@gmail.com`;

      return { subject, message };
    }

    if (replyType === 'deal') {
      const subject = `OK Deal Confirmation & SOW Kickoff: ${service} &middot; AB TechSol [${refId}]`;
      const message = `Hello ${clientName},

Congratulations! We are delighted to confirm our partnership agreement ("OK Deal") for your project: ${service}.

Agreed Project Parameters:
- Client: ${selectedEnquiry.fullName} (${selectedEnquiry.companyName || 'Independent'})
- Solution Scope: ${dealScopeNotes}
- Agreed Total Value: ${dealAmount}
- Payment Terms: ${dealMilestones}
- Estimated Kickoff: Immediate following 30% advance deposit

Next Action Items:
1. Advance milestone invoice dispatched to ${selectedEnquiry.email}
2. Sprint 1 Architecture & Wireframe review scheduled for next week
3. Full Git repository & development environment initialized

Thank you for trusting AB TechSol as your technology partner. We look forward to delivering an exceptional product for you!

Best regards,
AB &middot; Founder & Technology Lead
AB TechSol | Hassan, Karnataka, India
Phone: +91 8861375377`;

      return { subject, message };
    }

    // Custom
    const subject = `Follow-up regarding your project: ${service} [${refId}]`;
    const message = customReplyMessage || `Hello ${clientName},\n\nFollowing up on your inquiry with AB TechSol...`;
    return { subject, message };
  };

  const currentReply = generateReplyContent();

  const handleCopyGeneratedMessage = () => {
    navigator.clipboard.writeText(currentReply.message);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSendWhatsApp = () => {
    if (!selectedEnquiry) return;
    const cleanPhone = selectedEnquiry.phone.replace(/\D/g, '');
    const phoneToUse = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = `https://wa.me/${phoneToUse}?text=${encodeURIComponent(currentReply.message)}`;
    window.open(url, '_blank');
  };

  const handleSendEmail = () => {
    if (!selectedEnquiry) return;
    const mailtoUrl = `mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
      currentReply.subject
    )}&body=${encodeURIComponent(currentReply.message)}`;
    window.location.href = mailtoUrl;
  };

  const handleDirectEmailSentSuccess = (details: {
    messageId: string;
    subject: string;
    message: string;
    timestamp: string;
  }) => {
    if (!selectedEnquiry) return;

    const newReplyItem: EnquiryReplyItem = {
      id: details.messageId,
      type: replyType === 'meeting' ? 'meeting_scheduled' : replyType === 'deal' ? 'deal_accepted' : 'general',
      subject: details.subject,
      message: details.message,
      sentVia: 'direct_web_email',
      timestamp: details.timestamp,
      meetingDetails:
        replyType === 'meeting'
          ? {
              date: meetingDate,
              time: meetingTime,
              platform: meetingPlatform,
              link: meetingLink,
            }
          : undefined,
      dealDetails:
        replyType === 'deal'
          ? {
              amount: dealAmount,
              notes: dealScopeNotes,
            }
          : undefined,
    };

    let updatedStatus = selectedEnquiry.status;
    if (replyType === 'meeting') updatedStatus = 'Meeting Scheduled';
    if (replyType === 'deal') updatedStatus = 'Won';
    if (replyType === 'general' && selectedEnquiry.status === 'New') updatedStatus = 'Contacted';

    let meetingIso: string | undefined = undefined;
    if (replyType === 'meeting') {
      try {
        meetingIso = new Date(meetingDateTimeInput).toISOString();
      } catch {
        meetingIso = new Date(`${meetingDate}T11:00:00`).toISOString();
      }
    } else {
      meetingIso = selectedEnquiry.scheduledMeeting;
    }

    const updatedRecord: EnquirySubmission = {
      ...selectedEnquiry,
      status: updatedStatus,
      scheduledMeeting: meetingIso,
      scheduledMeetingDate: replyType === 'meeting' ? meetingDate : selectedEnquiry.scheduledMeetingDate,
      scheduledMeetingTime: replyType === 'meeting' ? meetingTime : selectedEnquiry.scheduledMeetingTime,
      meetingPlatform: replyType === 'meeting' ? meetingPlatform : selectedEnquiry.meetingPlatform,
      meetingLink: replyType === 'meeting' ? meetingLink : selectedEnquiry.meetingLink,
      dealAmount: replyType === 'deal' ? dealAmount : selectedEnquiry.dealAmount,
      dealNotes: replyType === 'deal' ? dealScopeNotes : selectedEnquiry.dealNotes,
      replyHistory: [newReplyItem, ...(selectedEnquiry.replyHistory || [])],
    };

    onUpdateFullEnquiry(updatedRecord);
    setSelectedEnquiry(updatedRecord);
    setDirectEmailNotice(
      `Email successfully dispatched directly from website to ${selectedEnquiry.email} (BCC to abtechsol660@gmail.com)!`
    );
    setTimeout(() => setDirectEmailNotice(null), 6000);
  };

  const handleRecordInteraction = () => {
    if (!selectedEnquiry) return;

    const newReplyItem: EnquiryReplyItem = {
      id: `REP-${Date.now().toString().slice(-6)}`,
      type: replyType === 'meeting' ? 'meeting_scheduled' : replyType === 'deal' ? 'deal_accepted' : 'general',
      subject: currentReply.subject,
      message: currentReply.message,
      sentVia: 'logged',
      timestamp: new Date().toISOString(),
      meetingDetails:
        replyType === 'meeting'
          ? {
              date: meetingDate,
              time: meetingTime,
              platform: meetingPlatform,
              link: meetingLink,
            }
          : undefined,
      dealDetails:
        replyType === 'deal'
          ? {
              amount: dealAmount,
              notes: dealScopeNotes,
            }
          : undefined,
    };

    let updatedStatus = selectedEnquiry.status;
    if (replyType === 'meeting') updatedStatus = 'Meeting Scheduled';
    if (replyType === 'deal') updatedStatus = 'Won';
    if (replyType === 'general' && selectedEnquiry.status === 'New') updatedStatus = 'Contacted';

    let meetingIso: string | undefined = undefined;
    if (replyType === 'meeting') {
      try {
        meetingIso = new Date(meetingDateTimeInput).toISOString();
      } catch {
        meetingIso = new Date(`${meetingDate}T11:00:00`).toISOString();
      }
    } else {
      meetingIso = selectedEnquiry.scheduledMeeting;
    }

    const updatedRecord: EnquirySubmission = {
      ...selectedEnquiry,
      status: updatedStatus,
      scheduledMeeting: meetingIso,
      scheduledMeetingDate: replyType === 'meeting' ? meetingDate : selectedEnquiry.scheduledMeetingDate,
      scheduledMeetingTime: replyType === 'meeting' ? meetingTime : selectedEnquiry.scheduledMeetingTime,
      meetingPlatform: replyType === 'meeting' ? meetingPlatform : selectedEnquiry.meetingPlatform,
      meetingLink: replyType === 'meeting' ? meetingLink : selectedEnquiry.meetingLink,
      dealAmount: replyType === 'deal' ? dealAmount : selectedEnquiry.dealAmount,
      dealNotes: replyType === 'deal' ? dealScopeNotes : selectedEnquiry.dealNotes,
      replyHistory: [newReplyItem, ...(selectedEnquiry.replyHistory || [])],
    };

    onUpdateFullEnquiry(updatedRecord);
    setSelectedEnquiry(updatedRecord);
    alert('Communication log & meeting parameters recorded and saved to Supabase!');
  };

  const handleExportCSV = () => {
    const header = 'ID,Name,Company,Email,Phone,Service,Budget,Timeline,Status,MeetingDate,MeetingTime,DealAmount,Timestamp\n';
    const rows = enquiries
      .map(
        (e) =>
          `"${e.id}","${e.fullName}","${e.companyName || ''}","${e.email}","${e.phone}","${e.serviceRequired}","${e.estimatedBudget}","${e.timeline}","${e.status}","${e.scheduledMeetingDate || ''}","${e.scheduledMeetingTime || ''}","${e.dealAmount || ''}","${e.timestamp}"`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AB_TechSol_Enquiries_Database_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const alterSql = `-- =================================================================
-- OPTION 1: SAFE UPDATE (NO DATA LOSS!)
-- DO NOT DELETE YOUR OLD TABLE! Just run this in your Supabase SQL editor.
-- It safely adds the new meeting, presentation, and deal columns.
-- All your previous enquiries and leads remain 100% intact!
-- =================================================================

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS scheduled_meeting TIMESTAMPTZ;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS scheduled_meeting_date TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS scheduled_meeting_time TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS meeting_platform TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS meeting_link TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS deal_amount TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS deal_notes TEXT;
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS reply_history JSONB;

-- Ensure Row Level Security allows updates for logging meetings & replies:
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public update" ON enquiries;
CREATE POLICY "Allow public update" ON enquiries FOR UPDATE USING (true);
DROP POLICY IF EXISTS "Allow public select" ON enquiries;
CREATE POLICY "Allow public select" ON enquiries FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert" ON enquiries;
CREATE POLICY "Allow public insert" ON enquiries FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public delete" ON enquiries;
CREATE POLICY "Allow public delete" ON enquiries FOR DELETE USING (true);`;

  const freshSql = `-- =================================================================
-- OPTION 2: FRESH CLEAN SETUP (Wipes & recreates table from scratch)
-- Use this ONLY if you have no real data or want a complete fresh start.
-- =================================================================

DROP TABLE IF EXISTS enquiries CASCADE;

CREATE TABLE enquiries (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  service_required TEXT NOT NULL,
  project_type TEXT,
  estimated_budget TEXT,
  timeline TEXT,
  description TEXT NOT NULL,
  heard_from TEXT,
  status TEXT DEFAULT 'New',
  scheduled_meeting TIMESTAMPTZ,
  scheduled_meeting_date TEXT,
  scheduled_meeting_time TEXT,
  meeting_platform TEXT,
  meeting_link TEXT,
  deal_amount TEXT,
  deal_notes TEXT,
  reply_history JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON enquiries FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON enquiries FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON enquiries FOR DELETE USING (true);`;

  const handleCopySql = () => {
    const sql = sqlMode === 'alter' ? alterSql : freshSql;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-[#07121F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar with Supabase Live status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-bold">
                AB TechSol Executive Dashboard
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">
                <Database className="w-3 h-3" />
                <span>Supabase Live: qlvlssfaaypzkdlmsfrg</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mt-1">
              Admin Client Enquiry & Meeting Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              View all inquiries, send professional responses, schedule presentations & meetings, and manage deal commitments in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Active Admin Session Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Admin: {adminSession?.username || 'ABSIR'}</span>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3 py-2 rounded-lg border border-rose-300 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Lock admin session and sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock &amp; Sign Out</span>
              </button>
            )}

            <button
              onClick={() => setShowSEOGuide(true)}
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer text-[#0A84FF] dark:text-[#00E5FF] shadow-2xs"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Google Search &amp; SEO</span>
            </button>

            <button
              onClick={() => setShowSqlGuide(!showSqlGuide)}
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Code className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Supabase Schema SQL</span>
            </button>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#0A84FF] ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Syncing...' : 'Sync Live'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Direct Email Dispatch Success Toast */}
        {directEmailNotice && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center justify-between shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{directEmailNotice}</span>
            </div>
            <button
              onClick={() => setDirectEmailNotice(null)}
              className="text-emerald-600 dark:text-emerald-400 hover:underline text-[11px] font-mono cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Supabase Schema Helper Box */}
        {showSqlGuide && (
          <div className="p-5 mb-8 rounded-2xl bg-slate-900 border border-slate-700 text-white animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 mb-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                  <Database className="w-4 h-4" />
                  <span>Supabase SQL Script Guide</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Choose whether you want to preserve your existing records or start completely fresh:
                </p>
              </div>
              <button
                onClick={handleCopySql}
                className="self-start sm:self-auto px-3.5 py-1.5 bg-[#0A84FF] hover:bg-[#0070E0] rounded-lg text-xs font-mono font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? 'Copied Active Script!' : 'Copy Active SQL Script'}</span>
              </button>
            </div>

            {/* Mode Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <button
                onClick={() => setSqlMode('alter')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  sqlMode === 'alter'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Option 1: Safe Update (Keep Existing Data — DO NOT DELETE)</span>
              </button>

              <button
                onClick={() => setSqlMode('fresh')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  sqlMode === 'fresh'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                <span>Option 2: Fresh Setup (Clean Recreate Table)</span>
              </button>
            </div>

            {sqlMode === 'alter' ? (
              <div className="p-3 mb-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-200 leading-relaxed">
                <strong>Answer to "Do I need to delete old SQL?":</strong> <span className="underline font-bold">NO, you do NOT need to delete your old table!</span> If you already ran the first SQL table creation, run this safe script below in Supabase. It uses <code className="bg-black/50 px-1 py-0.5 rounded text-emerald-300">ADD COLUMN IF NOT EXISTS</code> to append the meeting, scheduling, and deal fields without deleting or altering any existing client submissions!
              </div>
            ) : (
              <div className="p-3 mb-3 rounded-lg bg-cyan-950/40 border border-cyan-800/60 text-xs text-cyan-200 leading-relaxed">
                <strong>Option 2 Notice:</strong> This script starts with <code className="bg-black/50 px-1 py-0.5 rounded text-cyan-300">DROP TABLE IF EXISTS enquiries CASCADE;</code> which will wipe existing data. Use this ONLY if you are setting up a brand new Supabase project or want a fresh start.
              </div>
            )}

            <pre className="p-3.5 rounded-lg bg-black/60 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed max-h-72">
              {sqlMode === 'alter' ? alterSql : freshSql}
            </pre>
          </div>
        )}

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Total Inquiries
            </span>
            <div className="text-2xl font-black font-display text-slate-900 dark:text-white">
              {totalCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">In Supabase Database</div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-[#0B1B2B] border border-blue-200/80 dark:border-blue-900/40">
            <span className="text-[10px] font-mono uppercase text-[#0A84FF] font-semibold block mb-1">
              New Leads
            </span>
            <div className="text-2xl font-black font-display text-[#0A84FF]">
              {newCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Awaiting Initial Review</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-[#0B1B2B] border border-emerald-200/80 dark:border-emerald-900/40">
            <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold block mb-1">
              Meetings & Demos
            </span>
            <div className="text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">
              {meetingCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Scheduled or In-Progress</div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-[#0B1B2B] border border-purple-200/80 dark:border-purple-900/40">
            <span className="text-[10px] font-mono uppercase text-purple-600 dark:text-purple-400 font-semibold block mb-1">
              Deals Won
            </span>
            <div className="text-2xl font-black font-display text-purple-600 dark:text-purple-400">
              {wonCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Confirmed Agreements</div>
          </div>
        </div>

        {/* View Mode Tabs (All Enquiries vs Scheduled Meetings vs Deals) */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('all-enquiries')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'all-enquiries'
                ? 'bg-[#0A84FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>All Inquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('meetings')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'meetings'
                ? 'bg-[#0A84FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-500" />
            <span>Scheduled Meetings & Demos ({meetingCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('deals')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'deals'
                ? 'bg-[#0A84FF] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-500" />
            <span>Deals & Agreed SOWs</span>
          </button>
        </div>

        {/* Search & Status Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, email, phone, service..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-white dark:bg-[#07121F] text-[#0A84FF] font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              All
            </button>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors cursor-pointer ${
                  filterStatus === st
                    ? 'bg-white dark:bg-[#07121F] text-[#0A84FF] font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Master / Detail Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Enquiries List */}
          <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 dark:bg-[#0B1B2B] rounded-xl border border-slate-200 dark:border-slate-800">
                No matching inquiries found. Any new visitor submitting the Contact form or Estimator will instantly appear here!
              </div>
            ) : (
              filtered.map((enq) => {
                const isSelected = selectedEnquiry?.id === enq.id;
                return (
                  <div
                    key={enq.id}
                    onClick={() => setSelectedEnquiry(enq)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/70 dark:bg-[#0B1B2B] border-[#0A84FF] shadow-md ring-1 ring-[#0A84FF]'
                        : 'bg-white dark:bg-[#081524] border-slate-200 dark:border-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#0A84FF]">
                          {enq.id}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {new Date(enq.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${getStatusBadge(
                          enq.status
                        )}`}
                      >
                        {enq.status}
                      </span>
                    </div>

                    <div className="text-sm font-bold font-display text-slate-900 dark:text-white">
                      {enq.fullName}
                      {enq.companyName && (
                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400 ml-1.5">
                          ({enq.companyName})
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 truncate">
                      {enq.serviceRequired} &middot; {enq.estimatedBudget}
                    </div>

                    {/* Scheduled Meeting Indicator if present */}
                    {enq.scheduledMeetingDate && (
                      <div className="mt-2 flex items-center justify-between gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center gap-1.5 truncate">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">Meeting: {enq.scheduledMeetingDate} @ {enq.scheduledMeetingTime || '11:00 AM'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMeetingToDelete(enq);
                          }}
                          className="shrink-0 text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-rose-300 dark:border-rose-800 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Cancel and delete this scheduled meeting"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                          <span>Cancel Meeting</span>
                        </button>
                      </div>
                    )}

                    {/* Agreed Deal Indicator if present */}
                    {enq.dealAmount && (
                      <div className="mt-1.5 flex items-center justify-between gap-1.5 text-[11px] font-mono text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center gap-1.5 truncate">
                          <DollarSign className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">Deal: {enq.dealAmount}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setContractToDelete(enq);
                          }}
                          className="shrink-0 text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50 px-1.5 py-0.5 rounded text-[10px] font-bold border border-rose-300 dark:border-rose-800 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Delete contract and clear agreed deal"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                          <span>Clear Deal</span>
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono">
                      <div className="flex items-center gap-2 text-slate-400 truncate">
                        <span>{enq.phone}</span>
                        <span>&bull;</span>
                        <span className="truncate">{enq.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEnquiry(enq);
                            setMeetingModalTarget(enq);
                            setIsScheduleMeetingModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800 transition-colors"
                          title="Open date/time picker to schedule meeting in Supabase"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>{enq.scheduledMeeting || enq.scheduledMeetingDate ? 'Reschedule' : 'Schedule'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEnquiryToDelete(enq);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Selected Enquiry Detail View, Action Controls & Reply Suite */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-[#0B1B2B] p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 sticky top-28 shadow-sm space-y-6">
            {selectedEnquiry ? (
              <>
                {/* Header Information */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[11px] font-mono text-[#0A84FF] font-semibold block">
                      Enquiry ID: {selectedEnquiry.id} &middot; {selectedEnquiry.serviceRequired}
                    </span>
                    <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                      {selectedEnquiry.fullName}
                    </h2>
                    {selectedEnquiry.companyName && (
                      <div className="text-xs text-slate-500 font-mono">
                        Company: {selectedEnquiry.companyName}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMeetingModalTarget(selectedEnquiry);
                        setIsScheduleMeetingModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold font-mono flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      title="Open Date/Time Picker to Schedule Meeting and save 'scheduled_meeting' directly to Supabase"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>{selectedEnquiry.scheduledMeeting || selectedEnquiry.scheduledMeetingDate ? 'Reschedule' : 'Schedule Meeting'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setEnquiryToDelete(selectedEnquiry)}
                      className="p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer border border-rose-200/60 dark:border-rose-900/40"
                      title="Permanently delete enquiry from Supabase"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Pipeline Status Selector */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Lead Pipeline Status:
                  </span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => {
                      const newSt = e.target.value as EnquirySubmission['status'];
                      onUpdateStatus(selectedEnquiry.id, newSt);
                      setSelectedEnquiry({ ...selectedEnquiry, status: newSt });
                    }}
                    className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono font-semibold"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quick Client Coordinates */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Email</span>
                    <a href={`mailto:${selectedEnquiry.email}`} className="text-[#0A84FF] hover:underline font-semibold truncate block">
                      {selectedEnquiry.email}
                    </a>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Phone</span>
                    <a href={`tel:${selectedEnquiry.phone}`} className="text-slate-700 dark:text-slate-300 hover:underline font-semibold truncate block">
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Budget</span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold truncate block">
                      {selectedEnquiry.estimatedBudget}
                    </span>
                  </div>
                </div>

                {/* Client's Original Message */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
                    Client's Requirements & Scope:
                  </span>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {selectedEnquiry.description}
                  </div>
                </div>

                {/* Active Meeting / Deal Info Box if already scheduled */}
                {(selectedEnquiry.scheduledMeeting || selectedEnquiry.scheduledMeetingDate || selectedEnquiry.dealAmount) && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
                    <div className="font-semibold text-emerald-800 dark:text-emerald-400 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Active Engagement Records in Supabase</span>
                      </div>
                      {(selectedEnquiry.scheduledMeeting || selectedEnquiry.scheduledMeetingDate) && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          Supabase: scheduled_meeting
                        </span>
                      )}
                    </div>
                    {(selectedEnquiry.scheduledMeeting || selectedEnquiry.scheduledMeetingDate) && (
                      <div className="font-mono text-emerald-900 dark:text-emerald-300 space-y-1">
                        <div className="flex items-center gap-2">
                          <CalendarCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>
                            Scheduled: <strong>{selectedEnquiry.scheduledMeeting ? new Date(selectedEnquiry.scheduledMeeting).toLocaleString() : `${selectedEnquiry.scheduledMeetingDate} at ${selectedEnquiry.scheduledMeetingTime || '11:00 AM'}`}</strong> ({selectedEnquiry.meetingPlatform || 'Google Meet'})
                          </span>
                        </div>
                        {selectedEnquiry.scheduledMeeting && (
                          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 pl-5">
                            Supabase 'scheduled_meeting': <code className="bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded font-mono font-bold text-emerald-800 dark:text-emerald-200">{selectedEnquiry.scheduledMeeting}</code>
                          </div>
                        )}
                        {selectedEnquiry.meetingLink && (
                          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 pl-5">
                            Link: <a href={selectedEnquiry.meetingLink} target="_blank" rel="noopener noreferrer" className="underline">{selectedEnquiry.meetingLink}</a>
                          </div>
                        )}
                        <div className="pt-2 pl-5 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setMeetingModalTarget(selectedEnquiry);
                              setIsScheduleMeetingModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] font-bold transition-colors cursor-pointer shadow-sm"
                          >
                            <Clock className="w-3 h-3" />
                            <span>Change Date/Time &amp; Reschedule</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setMeetingToDelete(selectedEnquiry)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 font-mono text-[11px] font-bold transition-colors cursor-pointer shadow-sm"
                            title="Cancel scheduled meeting and clear record in Supabase"
                          >
                            <Trash2 className="w-3 h-3 text-rose-500" />
                            <span>Cancel &amp; Delete Meeting</span>
                          </button>
                        </div>
                      </div>
                    )}
                    {selectedEnquiry.dealAmount && (
                      <div className="font-mono text-emerald-900 dark:text-emerald-300 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60 flex flex-wrap items-center justify-between gap-2">
                        <div>
                          &bull; Agreed Deal Value: <strong>{selectedEnquiry.dealAmount}</strong> ({selectedEnquiry.dealNotes})
                        </div>
                        <button
                          type="button"
                          onClick={() => setContractToDelete(selectedEnquiry)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 font-mono text-[10px] font-bold transition-colors cursor-pointer"
                          title="Clear agreed deal amount and contract notes from Supabase"
                        >
                          <Trash2 className="w-3 h-3 text-rose-500" />
                          <span>Clear Contract &amp; Deal</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Prompt to schedule meeting if not scheduled yet */}
                {!(selectedEnquiry.scheduledMeeting || selectedEnquiry.scheduledMeetingDate) && (
                  <div className="p-3.5 rounded-xl bg-slate-100/90 dark:bg-[#07121F] border border-dashed border-slate-300 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>No client meeting scheduled yet. Set a date/time to sync directly with Supabase.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setMeetingModalTarget(selectedEnquiry);
                        setIsScheduleMeetingModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 self-start sm:self-auto shadow-sm"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Schedule Meeting (Date/Time Picker)</span>
                    </button>
                  </div>
                )}

                {/* REPLY & SCHEDULING SUITE (The core requested feature) */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#0A84FF] font-bold">
                      Direct Reply & Meeting Scheduler
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Choose template & dispatch
                    </span>
                  </div>

                  {/* 4 Reply Mode Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-xl mb-4 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setReplyType('general')}
                      className={`py-2 px-2.5 rounded-lg transition-all text-center cursor-pointer ${
                        replyType === 'general'
                          ? 'bg-white dark:bg-[#07121F] text-[#0A84FF] shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      General Query
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyType('meeting')}
                      className={`py-2 px-2.5 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                        replyType === 'meeting'
                          ? 'bg-white dark:bg-[#07121F] text-emerald-500 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Meeting / Demo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyType('deal')}
                      className={`py-2 px-2.5 rounded-lg transition-all text-center cursor-pointer flex items-center justify-center gap-1 ${
                        replyType === 'deal'
                          ? 'bg-white dark:bg-[#07121F] text-purple-500 shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      <FileCheck className="w-3 h-3" />
                      <span>OK Deal / SOW</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyType('custom')}
                      className={`py-2 px-2.5 rounded-lg transition-all text-center cursor-pointer ${
                        replyType === 'custom'
                          ? 'bg-white dark:bg-[#07121F] text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      Custom Reply
                    </button>
                  </div>

                  {/* Contextual Input Fields for Meeting with full Date/Time Picker & Direct Supabase Persistence */}
                  {replyType === 'meeting' && (
                    <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 space-y-4 mb-4 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <CalendarCheck className="w-4 h-4 text-emerald-500" />
                          <span>Presentation &amp; Meeting Date/Time Scheduler</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold self-start sm:self-auto">
                          <Database className="w-3 h-3" />
                          <span>Supabase: scheduled_meeting</span>
                        </span>
                      </div>

                      {/* Primary Date/Time Picker */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#0A84FF]" />
                            <span>Select Meeting Date &amp; Time Picker:</span>
                          </label>
                          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            {new Date(meetingDateTimeInput).toLocaleString([], {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <input
                          type="datetime-local"
                          value={meetingDateTimeInput}
                          onChange={(e) => handleDateTimeInputChange(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs font-semibold focus:outline-none focus:border-[#0A84FF] focus:ring-1 focus:ring-[#0A84FF]"
                        />
                      </div>

                      {/* Quick Date Presets */}
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block mb-1">
                          Quick Date Presets:
                        </span>
                        <div className="flex flex-wrap gap-1.5 text-xs">
                          <button
                            type="button"
                            onClick={() => handleSetQuickDate(1)}
                            className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
                          >
                            Tomorrow
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetQuickDate(2)}
                            className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
                          >
                            In 2 Days
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetQuickDate(3)}
                            className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
                          >
                            In 3 Days
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetQuickDate(5)}
                            className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
                          >
                            Next Week
                          </button>
                        </div>
                      </div>

                      {/* Quick Time Presets */}
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block mb-1">
                          Quick Time Slots (IST):
                        </span>
                        <div className="flex flex-wrap gap-1.5 text-xs">
                          {[
                            { label: '10:00 AM', val: '10:00' },
                            { label: '11:30 AM', val: '11:30' },
                            { label: '02:30 PM', val: '14:30' },
                            { label: '04:00 PM', val: '16:00' },
                            { label: '05:30 PM', val: '17:30' },
                            { label: '07:00 PM', val: '19:00' },
                          ].map((slot) => (
                            <button
                              key={slot.val}
                              type="button"
                              onClick={() => handleSetQuickTime(slot.label, slot.val)}
                              className={`px-2 py-1 rounded font-mono text-[11px] transition-colors cursor-pointer ${
                                meetingTime.includes(slot.label) || meetingDateTimeInput.endsWith(slot.val)
                                  ? 'bg-[#0A84FF] text-white font-bold'
                                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {slot.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Platform & Link */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">
                            Meeting Platform:
                          </label>
                          <select
                            value={meetingPlatform}
                            onChange={(e: any) => setMeetingPlatform(e.target.value)}
                            className="w-full px-2.5 py-2 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs font-semibold"
                          >
                            <option value="Google Meet">Google Meet</option>
                            <option value="Zoom">Zoom</option>
                            <option value="Phone Call">Phone Call</option>
                            <option value="In-Person / Office">In-Person (Hassan Office)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">
                            Meeting Link / Location:
                          </label>
                          <input
                            type="text"
                            value={meetingLink}
                            onChange={(e) => setMeetingLink(e.target.value)}
                            placeholder="https://meet.google.com/xyz-abc"
                            className="w-full px-2.5 py-2 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">
                          Presentation Agenda:
                        </label>
                        <input
                          type="text"
                          value={meetingTopic}
                          onChange={(e) => setMeetingTopic(e.target.value)}
                          placeholder="Project Discovery &amp; Requirements Walkthrough"
                          className="w-full px-2.5 py-2 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
                        />
                      </div>

                      {/* Supabase Timestamp Sync Card & Direct Save Button */}
                      <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Target Supabase Field: `scheduled_meeting`</span>
                          </div>
                          <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                            Timestamp: <code className="font-bold">{new Date(meetingDateTimeInput).toISOString()}</code>
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={isSavingMeeting}
                          onClick={handleSaveMeetingDirectlyToSupabase}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-lg text-xs font-bold font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-50 shrink-0"
                          title="Save this 'scheduled_meeting' timestamp directly to the Supabase record"
                        >
                          {isSavingMeeting ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Saving to Supabase...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-3.5 h-3.5" />
                              <span>Save to Supabase Record</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Contextual Input Fields for OK Deal */}
                  {replyType === 'deal' && (
                    <div className="p-4 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 space-y-3 mb-4">
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-purple-500" />
                        <span>Confirm "OK Deal" Parameters & Scope</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">
                            Agreed Deal Value (₹ INR / USD):
                          </label>
                          <input
                            type="text"
                            value={dealAmount}
                            onChange={(e) => setDealAmount(e.target.value)}
                            placeholder="e.g. ₹ 65,000"
                            className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-white font-mono text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">
                            Payment Milestones:
                          </label>
                          <input
                            type="text"
                            value={dealMilestones}
                            onChange={(e) => setDealMilestones(e.target.value)}
                            placeholder="30% Advance, 40% Demo, 30% Launch"
                            className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">
                          Brief Statement of Work (SOW):
                        </label>
                        <input
                          type="text"
                          value={dealScopeNotes}
                          onChange={(e) => setDealScopeNotes(e.target.value)}
                          placeholder="Complete web application, mobile views, cloud hosting setup"
                          className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded text-slate-900 dark:text-white text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* Contextual Custom Message Box */}
                  {replyType === 'custom' && (
                    <div className="mb-4">
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">
                        Type Custom Message:
                      </label>
                      <textarea
                        rows={3}
                        value={customReplyMessage}
                        onChange={(e) => setCustomReplyMessage(e.target.value)}
                        placeholder="Write your custom response here..."
                        className="w-full p-2.5 text-xs bg-white dark:bg-[#07121F] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-[#0A84FF]"
                      />
                    </div>
                  )}

                  {/* Preview of Generated Message */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">
                        Generated Message Preview:
                      </span>
                      <button
                        onClick={handleCopyGeneratedMessage}
                        className="text-[11px] font-mono text-[#0A84FF] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedText ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedText ? 'Copied!' : 'Copy Text'}</span>
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-sans max-h-48 overflow-y-auto leading-relaxed">
                      {currentReply.message}
                    </div>
                  </div>

                  {/* Action Dispatch Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsDirectEmailModalOpen(true)}
                      className="py-2.5 px-3 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
                      title="Send email directly from website via abtechsol660@gmail.com"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Directly from Website</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Send via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRecordInteraction}
                      className="py-2.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Record &amp; Save to DB</span>
                    </button>
                  </div>

                  <div className="mt-2.5 flex flex-wrap items-center justify-between text-[11px] text-slate-400 font-mono px-1 gap-2">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Direct web mail sends from abtechsol660@gmail.com
                    </span>
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="hover:text-[#0A84FF] hover:underline cursor-pointer"
                      title="Open in your default mail application as fallback"
                    >
                      Open in desktop mail app &rarr;
                    </button>
                  </div>
                </div>

                {/* Audit & Reply History Log */}
                {selectedEnquiry.replyHistory && selectedEnquiry.replyHistory.length > 0 && (
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        Previous Recorded Communications ({selectedEnquiry.replyHistory.length}):
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated: EnquirySubmission = { ...selectedEnquiry, replyHistory: [] };
                          setSelectedEnquiry(updated);
                          onUpdateFullEnquiry(updated);
                          setDirectEmailNotice('All recorded communications cleared.');
                          setTimeout(() => setDirectEmailNotice(null), 4000);
                        }}
                        className="text-[10px] font-mono text-rose-500 hover:underline cursor-pointer"
                      >
                        Clear All History
                      </button>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedEnquiry.replyHistory.map((hist, idx) => (
                        <div
                          key={hist.id || idx}
                          className="p-2.5 rounded-lg bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 relative group"
                        >
                          <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
                            <span className="text-[#0A84FF] font-semibold uppercase">{hist.type}</span>
                            <div className="flex items-center gap-2">
                              <span>{new Date(hist.timestamp).toLocaleString()}</span>
                              <button
                                type="button"
                                onClick={() => handleDeleteReplyItem(idx)}
                                className="p-0.5 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                title="Delete this communication record"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="font-semibold text-slate-900 dark:text-white truncate">
                            {hist.subject}
                          </div>
                          {hist.meetingDetails && (
                            <div className="text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                              Scheduled: {hist.meetingDetails.date} @ {hist.meetingDetails.time} ({hist.meetingDetails.platform})
                            </div>
                          )}
                          <div className="mt-1 text-[10px] font-mono text-slate-400">
                            Sent via: <span className="text-slate-600 dark:text-slate-300 font-semibold">{hist.sentVia || 'web_mail'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="p-12 text-center text-xs text-slate-400">
                Select an inquiry from the left to view details and launch the response scheduler.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Direct In-App Email Dispatch Modal */}
      {selectedEnquiry && (
        <DirectEmailModal
          isOpen={isDirectEmailModalOpen}
          onClose={() => setIsDirectEmailModalOpen(false)}
          initialTo={selectedEnquiry.email}
          initialToName={selectedEnquiry.fullName}
          initialSubject={currentReply.subject}
          initialMessage={currentReply.message}
          enquiryId={selectedEnquiry.id}
          templateType={replyType}
          onSuccess={handleDirectEmailSentSuccess}
        />
      )}

      {/* Dedicated Interactive Meeting Scheduler Modal with Date/Time Picker */}
      <ScheduleMeetingModal
        isOpen={isScheduleMeetingModalOpen}
        onClose={() => setIsScheduleMeetingModalOpen(false)}
        enquiry={meetingModalTarget || selectedEnquiry}
        onSaved={handleMeetingModalSaved}
        onOpenEmailModal={handleOpenEmailFromMeetingModal}
      />

      {/* 1. PERMANENT DELETE ENQUIRY IN-APP CONFIRMATION MODAL */}
      {enquiryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#0B1B2B] rounded-2xl border border-rose-200 dark:border-rose-900/60 shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Permanently Delete Enquiry?
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  ID: {enquiryToDelete.id}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete the inquiry for{' '}
              <strong className="text-slate-900 dark:text-white">{enquiryToDelete.fullName}</strong> ({enquiryToDelete.serviceRequired})?
              This will remove the record directly from your Supabase database and local storage. This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setEnquiryToDelete(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDeleteEnquiry}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Deleting from DB...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Permanently Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CANCEL & DELETE MEETING IN-APP CONFIRMATION MODAL */}
      {meetingToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#0B1B2B] rounded-2xl border border-rose-200 dark:border-rose-900/60 shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Cancel Scheduled Meeting?
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Client: {meetingToDelete.fullName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              This will cancel the scheduled meeting (<strong>{meetingToDelete.scheduledMeetingDate} at {meetingToDelete.scheduledMeetingTime || '11:00 AM'}</strong>) and clear the date, time, and meeting link from your Supabase record. The inquiry status will be returned to <strong>Discussion</strong>.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setMeetingToDelete(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Keep Meeting
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDeleteMeeting}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Clearing from Supabase...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel &amp; Delete Meeting</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DELETE / CLEAR CONTRACT & DEAL IN-APP CONFIRMATION MODAL */}
      {contractToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#0B1B2B] rounded-2xl border border-purple-200 dark:border-purple-900/60 shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <FileCheck className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Remove Contract &amp; Deal Terms?
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Client: {contractToDelete.fullName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              This will remove the agreed deal value (<strong>{contractToDelete.dealAmount}</strong>) and scope notes from your Supabase record.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setContractToDelete(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
              >
                Keep Contract
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDeleteContract}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Removing from Supabase...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Contract Terms</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Interactive Google Search & SEO Guide Modal */}
      <SEOGuideModal isOpen={showSEOGuide} onClose={() => setShowSEOGuide(false)} />
    </div>
  );
};
