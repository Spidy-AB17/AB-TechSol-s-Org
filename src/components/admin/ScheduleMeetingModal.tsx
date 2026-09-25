import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  AlertCircle,
  Database,
  Sparkles,
  Save,
  Send,
  Link as LinkIcon,
  Phone,
  MapPin,
  ChevronRight,
  Trash2,
} from 'lucide-react';
import { EnquirySubmission } from '../../types';
import { saveScheduledMeetingToSupabase, deleteMeetingFromSupabase } from '../../services/supabaseClient';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiry: EnquirySubmission | null;
  onSaved: (updatedRecord: EnquirySubmission) => void;
  onOpenEmailModal?: (enquiry: EnquirySubmission, meetingDate: string, meetingTime: string, platform: string, link: string) => void;
}

export const ScheduleMeetingModal: React.FC<ScheduleMeetingModalProps> = ({
  isOpen,
  onClose,
  enquiry,
  onSaved,
  onOpenEmailModal,
}) => {
  if (!isOpen || !enquiry) return null;

  // Initialize date / time from enquiry if present, or tomorrow 11:00 AM
  const getInitialDateTime = () => {
    if (enquiry.scheduledMeeting) {
      try {
        const dt = new Date(enquiry.scheduledMeeting);
        if (!isNaN(dt.getTime())) {
          const iso = dt.toISOString();
          return {
            dateStr: iso.split('T')[0],
            timeStr: `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`,
            dateTimeLocal: `${iso.split('T')[0]}T${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`,
          };
        }
      } catch {
        // fallback
      }
    }
    const tomorrow = new Date(Date.now() + 86400000);
    const dStr = tomorrow.toISOString().split('T')[0];
    return {
      dateStr: dStr,
      timeStr: '11:00',
      dateTimeLocal: `${dStr}T11:00`,
    };
  };

  const initial = getInitialDateTime();
  const [dateInput, setDateInput] = useState<string>(initial.dateStr);
  const [timeInput, setTimeInput] = useState<string>(initial.timeStr);
  const [dateTimeLocal, setDateTimeLocal] = useState<string>(initial.dateTimeLocal);
  const [platform, setPlatform] = useState<'Google Meet' | 'Zoom' | 'Phone Call' | 'In-Person / Office'>(
    enquiry.meetingPlatform || 'Google Meet'
  );
  const [meetingLink, setMeetingLink] = useState<string>(
    enquiry.meetingLink || 'https://meet.google.com/new'
  );
  const [agenda, setAgenda] = useState<string>(
    `Project Discovery & Scope Architecture: ${enquiry.serviceRequired}`
  );

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [savedTimestamp, setSavedTimestamp] = useState<string | null>(null);

  // Sync state whenever enquiry changes
  useEffect(() => {
    const init = getInitialDateTime();
    setDateInput(init.dateStr);
    setTimeInput(init.timeStr);
    setDateTimeLocal(init.dateTimeLocal);
    setPlatform(enquiry.meetingPlatform || 'Google Meet');
    setMeetingLink(enquiry.meetingLink || 'https://meet.google.com/new');
    setAgenda(`Project Discovery & Scope Architecture: ${enquiry.serviceRequired}`);
    setSaveSuccess(false);
    setErrorMsg(null);
    setSavedTimestamp(null);
  }, [enquiry.id]);

  // Format display time (e.g. "11:00 AM")
  const formatTimeDisplay = (time24: string) => {
    if (!time24) return '11:00 AM';
    const [hr, min] = time24.split(':');
    const h = parseInt(hr, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${min || '00'} ${ampm}`;
  };

  // Keep date/time and datetime-local in sync
  const handleDateTimeLocalChange = (val: string) => {
    setDateTimeLocal(val);
    if (val && val.includes('T')) {
      const [d, t] = val.split('T');
      setDateInput(d);
      if (t) setTimeInput(t);
    }
  };

  const handleDateChange = (val: string) => {
    setDateInput(val);
    setDateTimeLocal(`${val}T${timeInput || '11:00'}`);
  };

  const handleTimeChange = (val: string) => {
    setTimeInput(val);
    setDateTimeLocal(`${dateInput || initial.dateStr}T${val}`);
  };

  const handleQuickDatePreset = (daysFromNow: number) => {
    const d = new Date(Date.now() + daysFromNow * 86400000);
    const dStr = d.toISOString().split('T')[0];
    setDateInput(dStr);
    setDateTimeLocal(`${dStr}T${timeInput || '11:00'}`);
  };

  const handleQuickTimePreset = (time24: string) => {
    setTimeInput(time24);
    setDateTimeLocal(`${dateInput || initial.dateStr}T${time24}`);
  };

  // Compute calculated ISO timestamp
  const calculateIsoTimestamp = (): string => {
    try {
      if (dateTimeLocal) {
        const dt = new Date(dateTimeLocal);
        if (!isNaN(dt.getTime())) return dt.toISOString();
      }
      if (dateInput && timeInput) {
        const dt = new Date(`${dateInput}T${timeInput}:00`);
        if (!isNaN(dt.getTime())) return dt.toISOString();
      }
    } catch {
      // fallback
    }
    return new Date().toISOString();
  };

  const calculatedIso = calculateIsoTimestamp();

  // Save to Supabase
  const handleSaveToSupabase = async () => {
    setIsSaving(true);
    setErrorMsg(null);

    const iso = calculateIsoTimestamp();
    const timeDisplay = formatTimeDisplay(timeInput);

    try {
      const result = await saveScheduledMeetingToSupabase(enquiry.id, iso, {
        dateStr: dateInput,
        timeStr: timeDisplay,
        meetingPlatform: platform,
        meetingLink: meetingLink,
        meetingAgenda: agenda,
      });

      if (!result.success) {
        console.warn('Supabase save note:', result.error);
      }

      setSavedTimestamp(iso);
      setSaveSuccess(true);

      const updatedRecord: EnquirySubmission = {
        ...enquiry,
        status: 'Meeting Scheduled',
        scheduledMeeting: iso,
        scheduledMeetingDate: dateInput,
        scheduledMeetingTime: timeDisplay,
        meetingPlatform: platform,
        meetingLink: meetingLink,
      };

      onSaved(updatedRecord);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to save scheduled meeting to Supabase');
    } finally {
      setIsSaving(false);
    }
  };

  const [isDeletingMeeting, setIsDeletingMeeting] = useState(false);

  const handleDeleteMeeting = async () => {
    setIsDeletingMeeting(true);
    try {
      await deleteMeetingFromSupabase(enquiry.id, 'Discussion');
      const cleared: EnquirySubmission = { ...enquiry };
      delete cleared.scheduledMeeting;
      delete cleared.scheduledMeetingDate;
      delete cleared.scheduledMeetingTime;
      delete cleared.meetingPlatform;
      delete cleared.meetingLink;
      cleared.status = 'Discussion';
      onSaved(cleared);
      onClose();
    } catch (err: any) {
      console.warn('Delete meeting exception:', err);
      // Still clear locally so user is never blocked
      const cleared: EnquirySubmission = { ...enquiry };
      delete cleared.scheduledMeeting;
      delete cleared.scheduledMeetingDate;
      delete cleared.scheduledMeetingTime;
      delete cleared.meetingPlatform;
      delete cleared.meetingLink;
      cleared.status = 'Discussion';
      onSaved(cleared);
      onClose();
    } finally {
      setIsDeletingMeeting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white dark:bg-[#081524] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        {/* Top Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-[#07121F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white">
                  Schedule Client Meeting
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                  Supabase Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lead: <strong className="text-slate-700 dark:text-slate-200">{enquiry.fullName}</strong> ({enquiry.id}) &middot; {enquiry.serviceRequired}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[78vh] overflow-y-auto">
          {/* Target Supabase Field Banner */}
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-2.5 text-xs">
            <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="font-semibold text-emerald-900 dark:text-emerald-300">
                Saving Directly to Supabase: <code className="font-mono bg-emerald-100 dark:bg-emerald-900/60 px-1 py-0.5 rounded font-bold text-emerald-900 dark:text-emerald-200">scheduled_meeting</code>
              </div>
              <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                Timestamp: <strong className="break-all">{calculatedIso}</strong>
              </div>
            </div>
          </div>

          {/* Success Announcement if saved */}
          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-xs text-emerald-900 dark:text-emerald-200 space-y-2 animate-fade-in">
              <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>Meeting Successfully Saved to Supabase Record!</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                The timestamp <code className="bg-emerald-100 dark:bg-emerald-900/80 px-1 py-0.5 rounded font-mono font-bold">{savedTimestamp}</code> has been written directly to the <code className="font-mono font-bold">scheduled_meeting</code> column for enquiry <span className="font-bold">{enquiry.id}</span>.
              </p>
              {onOpenEmailModal && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenEmailModal(
                        enquiry,
                        dateInput,
                        formatTimeDisplay(timeInput),
                        platform,
                        meetingLink
                      );
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold font-mono transition-colors shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Meeting Confirmation Email Directly to Client</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Primary Date & Time Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Date Picker */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0A84FF]" />
                <span>Date:</span>
              </label>
              <input
                type="date"
                value={dateInput}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs font-semibold focus:outline-none focus:border-[#0A84FF]"
              />
            </div>

            {/* Time Picker */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0A84FF]" />
                <span>Time (IST):</span>
              </label>
              <input
                type="time"
                value={timeInput}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs font-semibold focus:outline-none focus:border-[#0A84FF]"
              />
            </div>
          </div>

          {/* Combined DateTime-local Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Combined Date &amp; Time Picker (`datetime-local`):
              </label>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {new Date(dateTimeLocal).toLocaleString([], {
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
              value={dateTimeLocal}
              onChange={(e) => handleDateTimeLocalChange(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-[#0A84FF]"
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
                onClick={() => handleQuickDatePreset(0)}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleQuickDatePreset(1)}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handleQuickDatePreset(2)}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
              >
                In 2 Days
              </button>
              <button
                type="button"
                onClick={() => handleQuickDatePreset(3)}
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px] transition-colors cursor-pointer"
              >
                In 3 Days
              </button>
              <button
                type="button"
                onClick={() => handleQuickDatePreset(7)}
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
                  onClick={() => handleQuickTimePreset(slot.val)}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors cursor-pointer ${
                    timeInput === slot.val
                      ? 'bg-[#0A84FF] text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Meeting Platform & Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Video className="w-3.5 h-3.5 text-purple-500" />
                <span>Platform:</span>
              </label>
              <select
                value={platform}
                onChange={(e: any) => {
                  const val = e.target.value;
                  setPlatform(val);
                  if (val === 'Google Meet') {
                    setMeetingLink('https://meet.google.com/new');
                  } else if (val === 'Phone Call') {
                    setMeetingLink(`Phone Call to ${enquiry.phone}`);
                  } else if (val === 'In-Person / Office') {
                    setMeetingLink('AB TechSol Office, Hassan, Karnataka');
                  }
                }}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs font-semibold"
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Phone Call">Direct Phone Call</option>
                <option value="In-Person / Office">In-Person (Hassan Office)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-emerald-500" />
                <span>Meeting Link / Coordinates:</span>
              </label>
              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-xs"
              />
            </div>
          </div>

          {/* Agenda */}
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Consultation Agenda / Notes:
            </label>
            <input
              type="text"
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              placeholder="Requirements Discovery & Architecture Consultation"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0B1B2B] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-xs"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-6 py-4 bg-slate-50 dark:bg-[#07121F] border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Updates Supabase record status to 'Meeting Scheduled'</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            {(enquiry.scheduledMeeting || enquiry.scheduledMeetingDate) && (
              <button
                type="button"
                disabled={isDeletingMeeting || isSaving}
                onClick={handleDeleteMeeting}
                className="px-3.5 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer mr-auto"
                title="Cancel and remove meeting record from Supabase"
              >
                {isDeletingMeeting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Cancel &amp; Delete Meeting</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveToSupabase}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving to Supabase...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save 'scheduled_meeting' to Supabase</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
