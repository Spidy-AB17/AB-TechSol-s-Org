import React, { useState } from 'react';
import { BlogPost } from '../../types';
import { X, Calendar, Clock, User, Share2, Check, ArrowRight } from 'lucide-react';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onStartProject: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  post,
  onClose,
  onStartProject,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#07121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#07121F]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <span className="text-[11px] font-mono text-[#0A84FF] uppercase tracking-wider font-semibold">
            AB TechSol Insights &middot; {post.category}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-mono"
              title="Share article link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-900 dark:text-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0A84FF]" />
                {post.date}
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#00E5FF]" />
                {post.readTime}
              </span>
              <span>&middot;</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-tight">
              {post.title}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed italic border-l-2 border-[#0A84FF] pl-4">
              "{post.excerpt}"
            </p>
          </div>

          {/* Article Body */}
          <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal pt-2">
            {post.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Topics
            </span>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-20 px-6 py-4 bg-slate-50 dark:bg-[#081524] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Written by {post.author} ({post.authorRole})
          </span>
          <button
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="px-4 py-2 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] text-white text-xs font-semibold shadow transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Discuss This Topic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
