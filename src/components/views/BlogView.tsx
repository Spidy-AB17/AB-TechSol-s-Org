import React, { useState } from 'react';
import { blogData } from '../../data/blogData';
import { BlogPost } from '../../types';
import { Calendar, Clock, User, ArrowRight, Search, BookOpen } from 'lucide-react';

interface BlogViewProps {
  onSelectArticle: (post: BlogPost) => void;
  onStartProject: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onSelectArticle,
  onStartProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Software Engineering', label: 'Software Engineering' },
    { id: 'AI & Automation', label: 'AI & Automation' },
    { id: 'Web Development', label: 'Web Development' },
    { id: 'Technology', label: 'Databases & Cloud' },
  ];

  const filteredPosts = blogData.filter((post) => {
    const matchesCat =
      selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-[#07121F] text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#0A84FF] font-mono font-semibold block mb-2">
            Engineering Insights & Blueprints
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Technical Thinking & Product Strategy
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            In-depth architectural analysis, practical AI implementation advice, and software engineering philosophy from the AB TechSol engineering group.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-white dark:bg-[#0B1B2B] text-slate-900 dark:text-white font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search insights..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-[#0B1B2B] border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#0A84FF]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectArticle(post)}
              className="group p-7 rounded-2xl bg-white dark:bg-[#0B1B2B] border border-slate-200/80 dark:border-slate-800 hover:border-[#0A84FF]/60 dark:hover:border-[#0A84FF]/60 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                  <span className="text-[#0A84FF] font-semibold">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-[#0A84FF] transition-colors mb-3 leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-mono">
                  {post.date}
                </span>

                <span className="inline-flex items-center gap-1 font-semibold text-[#0A84FF] group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
