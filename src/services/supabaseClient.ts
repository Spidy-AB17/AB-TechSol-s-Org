import { createClient } from '@supabase/supabase-js';
import { EnquirySubmission, EnquiryReplyItem } from '../types';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://qlvlssfaaypzkdlmsfrg.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_AXxsjtFgxIoD5teZCc9iMw_s5zfKMOs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseResponse<T> {
  data: T | null;
  error: string | null;
  source: 'supabase' | 'local';
}

const LOCAL_STORAGE_KEY = 'ab_techsol_enquiries_cache';
const DELETED_IDS_KEY = 'ab_techsol_deleted_enquiries_ids';

// Track permanently deleted enquiries so stale syncs never resurrect them
export const getDeletedEnquiryIds = (): Set<string> => {
  try {
    const raw = localStorage.getItem(DELETED_IDS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
};

export const addDeletedEnquiryId = (id: string) => {
  try {
    const set = getDeletedEnquiryIds();
    set.add(id);
    localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(Array.from(set)));
  } catch (err) {
    console.error('Failed to update deleted IDs set:', err);
  }
};

// Local storage cache helpers
export const getLocalEnquiries = (): EnquirySubmission[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const deleted = getDeletedEnquiryIds();
    if (!raw) return [];
    const parsed: EnquirySubmission[] = JSON.parse(raw);
    return parsed.filter((item) => item && item.id && !deleted.has(item.id));
  } catch (err) {
    console.error('Failed to read local enquiries:', err);
    return [];
  }
};

export const saveLocalEnquiries = (items: EnquirySubmission[]) => {
  try {
    const deleted = getDeletedEnquiryIds();
    const clean = items.filter((item) => item && item.id && !deleted.has(item.id));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clean));
  } catch (err) {
    console.error('Failed to save local enquiries:', err);
  }
};

/**
 * Save an enquiry to Supabase, falling back to local storage if needed.
 */
export async function saveEnquiryToSupabase(
  enquiry: EnquirySubmission
): Promise<SupabaseResponse<EnquirySubmission>> {
  // Always update local cache first
  const currentLocal = getLocalEnquiries();
  const updatedLocal = [enquiry, ...currentLocal.filter((e) => e.id !== enquiry.id)];
  saveLocalEnquiries(updatedLocal);

  try {
    const dateFormatted =
      enquiry.scheduledMeetingDate ||
      (enquiry.scheduledMeeting ? enquiry.scheduledMeeting.split('T')[0] : null);
    const timeFormatted =
      enquiry.scheduledMeetingTime ||
      (enquiry.scheduledMeeting && enquiry.scheduledMeeting.includes('T')
        ? enquiry.scheduledMeeting.split('T')[1].substring(0, 5)
        : null);

    const payload: any = {
      id: enquiry.id,
      full_name: enquiry.fullName,
      company_name: enquiry.companyName || null,
      email: enquiry.email,
      phone: enquiry.phone,
      country: enquiry.country,
      service_required: enquiry.serviceRequired,
      project_type: enquiry.projectType,
      estimated_budget: enquiry.estimatedBudget,
      timeline: enquiry.timeline,
      description: enquiry.description,
      heard_from: enquiry.heardFrom,
      status: enquiry.status || 'New',
      created_at: enquiry.timestamp || new Date().toISOString(),
    };

    if (dateFormatted) payload.scheduled_meeting_date = dateFormatted;
    if (timeFormatted) payload.scheduled_meeting_time = timeFormatted;
    if (enquiry.meetingPlatform) payload.meeting_platform = enquiry.meetingPlatform;
    if (enquiry.meetingLink) payload.meeting_link = enquiry.meetingLink;
    if (enquiry.dealAmount) payload.deal_amount = enquiry.dealAmount;
    if (enquiry.dealNotes) payload.deal_notes = enquiry.dealNotes;
    if (enquiry.replyHistory && enquiry.replyHistory.length > 0) {
      payload.reply_history = JSON.stringify(enquiry.replyHistory);
    }

    const { error } = await supabase.from('enquiries').upsert(payload);

    if (error) {
      console.warn('Supabase extended upsert note:', error.message);
      // Fallback: minimal columns only
      const minimalPayload = {
        id: enquiry.id,
        full_name: enquiry.fullName,
        company_name: enquiry.companyName || null,
        email: enquiry.email,
        phone: enquiry.phone,
        country: enquiry.country,
        service_required: enquiry.serviceRequired,
        project_type: enquiry.projectType,
        estimated_budget: enquiry.estimatedBudget,
        timeline: enquiry.timeline,
        description: enquiry.description,
        heard_from: enquiry.heardFrom,
        status: enquiry.status || 'New',
        created_at: enquiry.timestamp || new Date().toISOString(),
      };
      const { error: minimalError } = await supabase.from('enquiries').upsert(minimalPayload);
      if (minimalError) {
        return { data: enquiry, error: minimalError.message, source: 'local' };
      }
      return { data: enquiry, error: null, source: 'supabase' };
    }

    return { data: enquiry, error: null, source: 'supabase' };
  } catch (err: any) {
    console.error('Supabase exception:', err);
    return {
      data: enquiry,
      error: err?.message || 'Network exception while connecting to Supabase',
      source: 'local',
    };
  }
}

/**
 * Fetch all enquiries from Supabase with fallback to local storage
 */
export async function fetchEnquiriesFromSupabase(): Promise<SupabaseResponse<EnquirySubmission[]>> {
  const deletedIds = getDeletedEnquiryIds();
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch notice:', error.message);
      return {
        data: getLocalEnquiries(),
        error: error.message,
        source: 'local',
      };
    }

    if (data && Array.isArray(data)) {
      // Normalize row into EnquirySubmission, filtering out deleted ones
      const normalized: EnquirySubmission[] = data
        .filter((row: any) => row && row.id && !deletedIds.has(row.id))
        .map((row: any) => {
          let parsedReplies: EnquiryReplyItem[] | undefined = undefined;
          if (row.reply_history) {
            try {
              parsedReplies =
                typeof row.reply_history === 'string'
                  ? JSON.parse(row.reply_history)
                  : row.reply_history;
            } catch {
              parsedReplies = undefined;
            }
          }

          const hasMeeting = Boolean(row.scheduled_meeting_date);
          const computedIsoMeeting = hasMeeting
            ? `${row.scheduled_meeting_date}T${row.scheduled_meeting_time || '10:00'}:00`
            : undefined;

          return {
            id: row.id,
            fullName: row.full_name || row.fullName || 'Anonymous',
            companyName: row.company_name || row.companyName || undefined,
            email: row.email || '',
            phone: row.phone || '',
            country: row.country || 'India',
            serviceRequired: row.service_required || row.serviceRequired || 'Website Development',
            projectType: row.project_type || row.projectType || 'Standard',
            estimatedBudget: row.estimated_budget || row.estimatedBudget || 'Standard',
            timeline: row.timeline || 'Within 1 to 2 Months',
            description: row.description || '',
            heardFrom: row.heard_from || row.heardFrom || 'Website',
            timestamp: row.created_at || row.timestamp || new Date().toISOString(),
            status: (row.status as EnquirySubmission['status']) || 'New',
            scheduledMeeting: computedIsoMeeting,
            scheduledMeetingDate: row.scheduled_meeting_date || undefined,
            scheduledMeetingTime: row.scheduled_meeting_time || undefined,
            meetingPlatform: row.meeting_platform || undefined,
            meetingLink: row.meeting_link || undefined,
            dealAmount: row.deal_amount || undefined,
            dealNotes: row.deal_notes || undefined,
            replyHistory: parsedReplies,
          };
        });

      // Save fresh normalized items to local cache without resurrecting deleted data
      saveLocalEnquiries(normalized);

      return {
        data: normalized,
        error: null,
        source: 'supabase',
      };
    }

    return {
      data: getLocalEnquiries(),
      error: null,
      source: 'local',
    };
  } catch (err: any) {
    return {
      data: getLocalEnquiries(),
      error: err?.message || 'Failed to fetch from Supabase',
      source: 'local',
    };
  }
}

/**
 * Update enquiry status in Supabase and local storage
 */
export async function updateEnquiryStatusInSupabase(
  id: string,
  newStatus: EnquirySubmission['status']
): Promise<boolean> {
  const local = getLocalEnquiries();
  const updated = local.map((e) => (e.id === id ? { ...e, status: newStatus } : e));
  saveLocalEnquiries(updated);

  try {
    const { error } = await supabase
      .from('enquiries')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.warn('Supabase update status failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase update status exception:', err);
    return false;
  }
}

/**
 * Update full enquiry details (meeting, replies, deals) in Supabase and local storage
 */
export async function updateFullEnquiryInSupabase(
  enquiry: EnquirySubmission
): Promise<boolean> {
  const local = getLocalEnquiries();
  const updated = local.map((e) => (e.id === enquiry.id ? enquiry : e));
  saveLocalEnquiries(updated);

  try {
    const dateFormatted =
      enquiry.scheduledMeetingDate ||
      (enquiry.scheduledMeeting ? enquiry.scheduledMeeting.split('T')[0] : null);
    const timeFormatted =
      enquiry.scheduledMeetingTime ||
      (enquiry.scheduledMeeting && enquiry.scheduledMeeting.includes('T')
        ? enquiry.scheduledMeeting.split('T')[1].substring(0, 5)
        : null);

    const payload: any = {
      status: enquiry.status,
      scheduled_meeting_date: dateFormatted,
      scheduled_meeting_time: timeFormatted,
      meeting_platform: enquiry.meetingPlatform || null,
      meeting_link: enquiry.meetingLink || null,
      deal_amount: enquiry.dealAmount || null,
      deal_notes: enquiry.dealNotes || null,
      reply_history: enquiry.replyHistory ? JSON.stringify(enquiry.replyHistory) : null,
    };

    const { error } = await supabase
      .from('enquiries')
      .update(payload)
      .eq('id', enquiry.id);

    if (error) {
      console.warn('Supabase full update warning:', error.message);
      // Fallback: update status only if additional columns don't exist
      await supabase
        .from('enquiries')
        .update({ status: enquiry.status })
        .eq('id', enquiry.id);
      return true;
    }
    return true;
  } catch (err) {
    console.error('Supabase full update exception:', err);
    return true;
  }
}

/**
 * Save scheduled meeting timestamp directly to the Supabase record for an enquiry
 */
export async function saveScheduledMeetingToSupabase(
  enquiryId: string,
  meetingTimestamp: string,
  details?: {
    dateStr?: string;
    timeStr?: string;
    meetingPlatform?: string;
    meetingLink?: string;
    meetingAgenda?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  const dateFormatted = details?.dateStr || meetingTimestamp.split('T')[0];
  const timeFormatted =
    details?.timeStr ||
    (meetingTimestamp.includes('T')
      ? meetingTimestamp.split('T')[1].substring(0, 5)
      : '11:00');

  // 1. Update local storage cache immediately
  const local = getLocalEnquiries();
  const updated = local.map((e) => {
    if (e.id === enquiryId) {
      return {
        ...e,
        status: 'Meeting Scheduled' as const,
        scheduledMeeting: `${dateFormatted}T${timeFormatted}:00`,
        scheduledMeetingDate: dateFormatted,
        scheduledMeetingTime: timeFormatted,
        meetingPlatform: (details?.meetingPlatform as any) || e.meetingPlatform || 'Google Meet',
        meetingLink: details?.meetingLink || e.meetingLink,
      };
    }
    return e;
  });
  saveLocalEnquiries(updated);

  // 2. Transmit directly to Supabase record using validated schema columns
  try {
    const payload: any = {
      status: 'Meeting Scheduled',
      scheduled_meeting_date: dateFormatted,
      scheduled_meeting_time: timeFormatted,
      meeting_platform: details?.meetingPlatform || 'Google Meet',
      meeting_link: details?.meetingLink || null,
    };

    const { error } = await supabase
      .from('enquiries')
      .update(payload)
      .eq('id', enquiryId);

    if (error) {
      console.warn('Supabase scheduled_meeting update note:', error.message);
      // Fallback update status only
      await supabase.from('enquiries').update({ status: 'Meeting Scheduled' }).eq('id', enquiryId);
      return { success: true };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Supabase exception saving scheduled meeting:', err);
    return { success: true }; // Local cache is already updated
  }
}

/**
 * DELETE / CANCEL a scheduled meeting completely from Supabase and local cache
 */
export async function deleteMeetingFromSupabase(
  enquiryId: string,
  fallbackStatus: EnquirySubmission['status'] = 'Discussion'
): Promise<{ success: boolean; error?: string }> {
  // 1. Update local storage cache immediately
  const local = getLocalEnquiries();
  const updated = local.map((e) => {
    if (e.id === enquiryId) {
      const copy = { ...e };
      delete copy.scheduledMeeting;
      delete copy.scheduledMeetingDate;
      delete copy.scheduledMeetingTime;
      delete copy.meetingPlatform;
      delete copy.meetingLink;
      copy.status = fallbackStatus;
      return copy;
    }
    return e;
  });
  saveLocalEnquiries(updated);

  // 2. Clear fields in Supabase
  try {
    const payload = {
      scheduled_meeting_date: null,
      scheduled_meeting_time: null,
      meeting_platform: null,
      meeting_link: null,
      status: fallbackStatus,
    };

    const { error } = await supabase
      .from('enquiries')
      .update(payload)
      .eq('id', enquiryId);

    if (error) {
      console.warn('Supabase delete meeting column warning:', error.message);
      // Graceful fallback: update status only if custom columns don't exist
      await supabase
        .from('enquiries')
        .update({ status: fallbackStatus })
        .eq('id', enquiryId);
    }
    return { success: true };
  } catch (err: any) {
    console.error('Supabase delete meeting exception:', err);
    // Always succeed because local cache is already clean and user state must not be blocked
    return { success: true };
  }
}

/**
 * DELETE / CLEAR contract terms & agreed deal from Supabase and local cache
 */
export async function deleteContractFromSupabase(
  enquiryId: string,
  fallbackStatus: EnquirySubmission['status'] = 'Discussion'
): Promise<{ success: boolean; error?: string }> {
  // 1. Update local storage cache immediately
  const local = getLocalEnquiries();
  const updated = local.map((e) => {
    if (e.id === enquiryId) {
      const copy = { ...e };
      delete copy.dealAmount;
      delete copy.dealNotes;
      copy.status = fallbackStatus;
      return copy;
    }
    return e;
  });
  saveLocalEnquiries(updated);

  // 2. Clear fields in Supabase
  try {
    const payload = {
      deal_amount: null,
      deal_notes: null,
      status: fallbackStatus,
    };

    const { error } = await supabase
      .from('enquiries')
      .update(payload)
      .eq('id', enquiryId);

    if (error) {
      console.warn('Supabase delete contract warning:', error.message);
      // Graceful fallback: update status only
      await supabase
        .from('enquiries')
        .update({ status: fallbackStatus })
        .eq('id', enquiryId);
    }
    return { success: true };
  } catch (err: any) {
    console.error('Supabase delete contract exception:', err);
    return { success: true };
  }
}

/**
 * DELETE an entire enquiry from Supabase and local storage
 */
export async function deleteEnquiryFromSupabase(id: string): Promise<boolean> {
  // 1. Add to permanent deletion blacklist so background fetch never resurrects it
  addDeletedEnquiryId(id);

  // 2. Clear from local storage
  const local = getLocalEnquiries();
  const updated = local.filter((e) => e.id !== id);
  saveLocalEnquiries(updated);

  // 3. Delete from Supabase
  try {
    const { error } = await supabase.from('enquiries').delete().eq('id', id);
    if (error) {
      console.warn('Supabase delete warning:', error.message);
    }
    return true;
  } catch (err) {
    console.error('Supabase delete exception:', err);
    return true;
  }
}
