import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Mail,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Copy,
  Check,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { sendDirectEmail, getGmailWebComposeUrl } from '../../services/emailService';

interface DirectEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTo: string;
  initialToName: string;
  initialSubject: string;
  initialMessage: string;
  enquiryId: string;
  templateType: 'general' | 'meeting' | 'deal' | 'custom';
  onSuccess: (details: {
    messageId: string;
    subject: string;
    message: string;
    timestamp: string;
  }) => void;
}

export const DirectEmailModal: React.FC<DirectEmailModalProps> = ({
  isOpen,
  onClose,
  initialTo,
  initialToName,
  initialSubject,
  initialMessage,
  enquiryId,
  templateType,
  onSuccess,
}) => {
  const [to, setTo] = useState(initialTo);
  const [toName, setToName] = useState(initialToName);
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState(initialMessage);
  const [bccAdmin, setBccAdmin] = useState(true);

  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [deliveryResult, setDeliveryResult] = useState<{
    messageId: string;
    timestamp: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTo(initialTo);
    setToName(initialToName);
    setSubject(initialSubject);
    setMessage(initialMessage);
    setSentSuccess(false);
    setDeliveryResult(null);
    setErrorMessage(null);
  }, [isOpen, initialTo, initialToName, initialSubject, initialMessage]);

  if (!isOpen) return null;

  const handleSendDirectly = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to.trim() || !subject.trim() || !message.trim()) {
      setErrorMessage('Please fill in recipient, subject, and message.');
      return;
    }

    setIsSending(true);
    setErrorMessage(null);

    try {
      const res = await sendDirectEmail({
        to: to.trim(),
        toName: toName.trim(),
        subject: subject.trim(),
        message: message.trim(),
        enquiryId,
        templateType,
        bccAdmin,
      });

      setIsSending(false);
      setSentSuccess(true);
      setDeliveryResult({
        messageId: res.messageId,
        timestamp: res.timestamp,
      });

      onSuccess({
        messageId: res.messageId,
        subject: subject.trim(),
        message: message.trim(),
        timestamp: res.timestamp,
      });
    } catch (err: any) {
      setIsSending(false);
      setErrorMessage(err?.message || 'Failed to dispatch email directly. Please retry.');
    }
  };

  const handleOpenGmailWeb = () => {
    const url = getGmailWebComposeUrl({
      to,
      subject,
      body: message,
    });
    window.open(url, '_blank');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-[#0B1B2B] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#07121F]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#0A84FF]/10 text-[#0A84FF]">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white">
                  Direct Web Mail Dispatcher
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">
                  Direct from Website
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Dispatches directly from abtechsol660@gmail.com without opening external apps
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {sentSuccess && deliveryResult ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  Email Dispatched Directly from Website!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  Your message was transmitted to <strong>{to}</strong> and automatically recorded to your Supabase database reply audit log.
                </p>
              </div>

              {/* Delivery Receipt Card */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 text-left text-xs font-mono space-y-2">
                <div className="flex justify-between text-slate-500">
                  <span>Tracking Reference:</span>
                  <span className="text-emerald-500 font-bold">{deliveryResult.messageId}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Enquiry Linked:</span>
                  <span className="text-slate-800 dark:text-slate-200">{enquiryId}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Sender:</span>
                  <span className="text-slate-800 dark:text-slate-200">abtechsol660@gmail.com</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>BCC Confirmation:</span>
                  <span className="text-slate-800 dark:text-slate-200">Sent to abtechsol660@gmail.com</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Timestamp:</span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {new Date(deliveryResult.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold cursor-pointer shadow-sm"
                >
                  Done & Return to Hub
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendDirectly} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-600 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Sender & Recipient bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                    From (Website Sender):
                  </label>
                  <div className="px-3 py-2 bg-slate-100 dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300">
                    AB TechSol &lt;abtechsol660@gmail.com&gt;
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                    To (Recipient Client):
                  </label>
                  <input
                    type="email"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    required
                    placeholder="client@domain.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#0A84FF]"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mb-1">
                  Subject Line:
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Subject of your reply..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:border-[#0A84FF]"
                />
              </div>

              {/* Message Body */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Email Message Content:
                  </label>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="text-[11px] font-mono text-[#0A84FF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>
                </div>
                <textarea
                  rows={9}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full p-3 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono leading-relaxed focus:outline-none focus:border-[#0A84FF]"
                />
              </div>

              {/* BCC Admin Toggle */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bccAdmin}
                    onChange={(e) => setBccAdmin(e.target.checked)}
                    className="rounded border-slate-300 text-[#0A84FF] focus:ring-[#0A84FF] cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-300">
                    Send BCC copy to <code className="text-[#0A84FF] font-mono">abtechsol660@gmail.com</code>
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleOpenGmailWeb}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white inline-flex items-center gap-1 cursor-pointer"
                  title="Or open directly in browser Gmail"
                >
                  <span>Or open Gmail Web</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSending}
                  className="px-6 py-2.5 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-bold tracking-wide flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting from Website...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Email Directly Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
