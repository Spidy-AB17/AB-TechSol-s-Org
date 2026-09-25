import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import { login, ADMIN_USERNAME } from '../../services/authService';
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  AlertCircle,
  Database,
  CheckCircle2,
} from 'lucide-react';

interface AdminLoginViewProps {
  onSuccess: () => void;
  onGoHome: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onSuccess,
  onGoHome,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Please provide the authorized admin username.');
      return;
    }

    if (!password) {
      setError('Please provide the admin security password.');
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      const res = login(username, password, rememberMe);
      setIsAuthenticating(false);

      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setUsername(ADMIN_USERNAME);
    setPassword('Abtechsol@2026');
    setError(null);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-[#F5F8FC] dark:bg-[#07121F] transition-colors">
      <div className="w-full max-w-md">
        {/* Top Back Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </button>

          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
            <ShieldCheck className="w-3 h-3" />
            <span>256-Bit SSL Encrypted</span>
          </span>
        </div>

        {/* Security Card */}
        <div className="bg-white dark:bg-[#0B1B2B] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-8 sm:p-9">
          {/* Header Branding */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo variant="stacked" size="lg" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
              Admin Security Gateway
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              Restricted portal for authorized AB TechSol administrators
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-600 dark:text-rose-300 flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username (e.g. ABSIR)"
                  autoCapitalize="characters"
                  autoComplete="username"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono font-medium focus:outline-none focus:border-[#0A84FF] focus:ring-1 focus:ring-[#0A84FF]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Security Password
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  Protected Key
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin security password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 dark:bg-[#07121F] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono focus:outline-none focus:border-[#0A84FF] focus:ring-1 focus:ring-[#0A84FF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#0A84FF] focus:ring-[#0A84FF] cursor-pointer"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Remember this device
                </span>
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] font-mono text-[#0A84FF] hover:underline cursor-pointer"
              >
                Auto-Fill ABSIR
              </button>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full py-3 px-4 rounded-lg bg-[#0A84FF] hover:bg-[#0070E0] active:scale-[0.99] text-white text-xs font-bold tracking-wide uppercase shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3"
            >
              {isAuthenticating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Clearance...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sign In to Admin Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Credentials badge indicator */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
              <Database className="w-3.5 h-3.5 text-emerald-500" />
              <span>Connected to Supabase Live Database</span>
            </div>
            <div className="mt-2 text-[10px] text-slate-400">
              Configured Admin: <span className="font-mono font-bold text-slate-600 dark:text-slate-300">ABSIR</span>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <p className="text-center text-[11px] text-slate-500 dark:text-slate-400 mt-6 font-mono">
          Unauthorized attempts are logged & reported &bull; AB TechSol Hassan
        </p>
      </div>
    </div>
  );
};
