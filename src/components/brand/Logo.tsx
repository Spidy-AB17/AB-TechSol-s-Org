import React from 'react';

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'symbol' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light' | 'adaptive';
  className?: string;
  onClick?: () => void;
  badge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  theme = 'adaptive',
  className = '',
  onClick,
  badge = true,
}) => {
  const sizeMap = {
    sm: {
      symbolWidth: badge ? 40 : 36,
      symbolHeight: badge ? 27 : 24,
      text: 'text-lg',
      subtext: 'text-[9px]',
      dotSize: 'w-1.5 h-1.5',
    },
    md: {
      symbolWidth: badge ? 54 : 48,
      symbolHeight: badge ? 36 : 32,
      text: 'text-xl',
      subtext: 'text-[10px]',
      dotSize: 'w-1.5 h-1.5',
    },
    lg: {
      symbolWidth: badge ? 72 : 66,
      symbolHeight: badge ? 48 : 44,
      text: 'text-2xl',
      subtext: 'text-xs',
      dotSize: 'w-2 h-2',
    },
    xl: {
      symbolWidth: badge ? 108 : 96,
      symbolHeight: badge ? 72 : 64,
      text: 'text-3xl',
      subtext: 'text-sm',
      dotSize: 'w-2.5 h-2.5',
    },
  };

  const currentSize = sizeMap[size];

  // Theme text styling
  const textColor =
    theme === 'dark'
      ? 'text-white'
      : theme === 'light'
      ? 'text-slate-900'
      : 'text-slate-900 dark:text-white';

  const subtextColor =
    theme === 'dark'
      ? 'text-slate-400'
      : theme === 'light'
      ? 'text-slate-500'
      : 'text-slate-500 dark:text-slate-400';

  const isStacked = variant === 'stacked';

  return (
    <div
      onClick={onClick}
      className={`group inline-flex ${
        isStacked ? 'flex-col items-center text-center gap-2.5' : 'items-center gap-3'
      } select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Official AB TechSol Interlocking Monogram Emblem */}
      <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg
          width={currentSize.symbolWidth}
          height={currentSize.symbolHeight}
          viewBox={badge ? '0 0 300 200' : '20 28 260 148'}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-md"
          aria-label="AB TechSol Official Logo"
        >
          <defs>
            {/* Primary Cyan-to-Blue Brand Gradient for 'B' */}
            <linearGradient id="abLogoGradComponent" x1="140" y1="58" x2="272" y2="168" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="25%" stopColor="#00C8F8" />
              <stop offset="60%" stopColor="#0A84FF" />
              <stop offset="100%" stopColor="#0052CC" />
            </linearGradient>

            {/* Left Leg Gradient of 'A' */}
            <linearGradient id="abLeftLegGradComponent" x1="28" y1="168" x2="120" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0066FF" />
              <stop offset="40%" stopColor="#0A84FF" />
              <stop offset="85%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#80F2FF" />
            </linearGradient>

            {/* Right Chiseled 3D Facet Gradient of 'A' */}
            <linearGradient id="abRightFacetGradComponent" x1="120" y1="36" x2="168" y2="168" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0A84FF" />
              <stop offset="40%" stopColor="#0052CC" />
              <stop offset="100%" stopColor="#003599" />
            </linearGradient>

            {/* Center Mountain Left Facet */}
            <linearGradient id="abMountainLeftComponent" x1="88" y1="168" x2="105" y2="128" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00B4D8" />
              <stop offset="100%" stopColor="#00F5FF" />
            </linearGradient>

            {/* Center Mountain Right Facet */}
            <linearGradient id="abMountainRightComponent" x1="105" y1="128" x2="122" y2="168" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0066E0" />
              <stop offset="100%" stopColor="#0044B8" />
            </linearGradient>

            {/* Specular sheen gradient */}
            <linearGradient id="abSheenComponent" x1="30" y1="160" x2="120" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
            </linearGradient>

            {/* Obsidian Glass Badge Background */}
            <linearGradient id="abBadgeBgComponent" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0F1F38" />
              <stop offset="50%" stopColor="#081324" />
              <stop offset="100%" stopColor="#040914" />
            </linearGradient>

            {/* Glowing Border Rim Gradient */}
            <linearGradient id="abBadgeBorderComponent" x1="0" y1="0" x2="300" y2="200" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#0A84FF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0052CC" stopOpacity="0.2" />
            </linearGradient>

            {/* Ambient Radial Tech Glow */}
            <filter id="abAmbientGlowComponent" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Optional Obsidian Squircle Badge Container */}
          {badge && (
            <>
              {/* Subtle outer glow */}
              <rect
                x="6"
                y="6"
                width="288"
                height="188"
                rx="36"
                fill="#0A84FF"
                opacity="0.12"
                filter="url(#abAmbientGlowComponent)"
              />
              {/* Base Badge */}
              <rect
                x="6"
                y="6"
                width="288"
                height="188"
                rx="36"
                fill="url(#abBadgeBgComponent)"
              />
              {/* Precision Border */}
              <rect
                x="6"
                y="6"
                width="288"
                height="188"
                rx="36"
                stroke="url(#abBadgeBorderComponent)"
                strokeWidth="1.5"
              />
            </>
          )}

          {/* Exact Official Interlocking AB Monogram from Reference Image */}
          <g>
            {/* --- Letter 'A': Left Leg & Summit --- */}
            <path
              fill="url(#abLeftLegGradComponent)"
              d="
                M 28,168
                L 120,36
                L 140,168
                L 111,98
                L 64,168
                Z
              "
            />

            {/* --- Letter 'A': Right 3D Chiseled Facet --- */}
            <path
              fill="url(#abRightFacetGradComponent)"
              d="
                M 120,36
                L 168,168
                L 140,168
                Z
              "
            />

            {/* --- Letter 'A': Inner Mountain / Arrowhead --- */}
            <path
              fill="url(#abMountainLeftComponent)"
              d="
                M 88,168
                L 105,128
                L 105,168
                Z
              "
            />
            <path
              fill="url(#abMountainRightComponent)"
              d="
                M 105,128
                L 122,168
                L 105,168
                Z
              "
            />

            {/* --- Letter 'B': Continuous Stylized Ribbon with Open Slots and Diagonal Slice --- */}
            <path
              fill="url(#abLogoGradComponent)"
              d="
                M 142,58
                L 218,58
                C 242,58 256,70 256,88
                C 256,98 248,106 238,112
                C 254,118 272,128 272,146
                C 272,162 252,168 226,168
                L 182,168
                L 173,144
                L 222,144
                A 11 11 0 0 0 222,122
                L 165,122
                L 159,104
                L 216,104
                A 10 10 0 0 0 216,84
                L 151,84
                Z
              "
            />

            {/* --- Precision Specular Sheen Accents --- */}
            <path
              d="M 32,164 L 118,38"
              stroke="url(#abSheenComponent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.75"
            />
            <path
              d="M 144,60 L 216,60 C 236,60 248,70 252,82"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.45"
            />
            <path
              d="M 163,106 L 214,106"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.3"
            />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      {variant !== 'symbol' && (
        <div className={`flex flex-col ${isStacked ? 'items-center' : ''}`}>
          <div className="flex items-center gap-1.5 leading-none">
            {/* AB with official tech gradient */}
            <span
              className={`font-display font-black tracking-tight ${currentSize.text} bg-gradient-to-r from-[#00E5FF] via-[#0A84FF] to-blue-500 bg-clip-text text-transparent`}
              style={{ letterSpacing: '-0.03em' }}
            >
              AB
            </span>

            {/* TechSol with bold typography */}
            <span
              className={`font-display font-bold tracking-tight ${currentSize.text} ${textColor}`}
              style={{ letterSpacing: '-0.015em' }}
            >
              TechSol
            </span>

            {/* Glowing Silicon Valley Tech Spark */}
            <span
              className={`${currentSize.dotSize} rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF] inline-block self-baseline mt-1 shrink-0 animate-pulse`}
              aria-hidden="true"
            />
          </div>

          {/* Subtitle / Tagline */}
          {(variant === 'full' || variant === 'stacked') && (
            <span
              className={`font-mono uppercase tracking-[0.18em] font-semibold mt-1 ${currentSize.subtext} ${subtextColor}`}
            >
              IT Solutions &amp; Consulting
            </span>
          )}
        </div>
      )}
    </div>
  );
};
