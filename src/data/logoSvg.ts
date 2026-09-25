// Clean standalone SVG asset for the official AB TechSol logo (exact match with public/logo.svg)
export const AB_TECHSOL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 230" fill="none">
  <defs>
    <!-- Primary Cyan-to-Blue Brand Gradient for 'B' -->
    <linearGradient id="abLogoGrad" x1="140" y1="48" x2="272" y2="158" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF"/>
      <stop offset="25%" stop-color="#00C8F8"/>
      <stop offset="60%" stop-color="#0A84FF"/>
      <stop offset="100%" stop-color="#0052CC"/>
    </linearGradient>

    <!-- Left Leg Gradient of 'A' -->
    <linearGradient id="abLeftLegGrad" x1="28" y1="158" x2="120" y2="26" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0066FF"/>
      <stop offset="40%" stop-color="#0A84FF"/>
      <stop offset="85%" stop-color="#00E5FF"/>
      <stop offset="100%" stop-color="#80F2FF"/>
    </linearGradient>

    <!-- Right Chiseled 3D Facet Gradient of 'A' -->
    <linearGradient id="abRightFacetGrad" x1="120" y1="26" x2="168" y2="158" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0A84FF"/>
      <stop offset="40%" stop-color="#0052CC"/>
      <stop offset="100%" stop-color="#003599"/>
    </linearGradient>

    <!-- Center Mountain Left Facet -->
    <linearGradient id="abMountainLeft" x1="88" y1="158" x2="105" y2="118" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00B4D8"/>
      <stop offset="100%" stop-color="#00F5FF"/>
    </linearGradient>

    <!-- Center Mountain Right Facet -->
    <linearGradient id="abMountainRight" x1="105" y1="118" x2="122" y2="158" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0066E0"/>
      <stop offset="100%" stop-color="#0044B8"/>
    </linearGradient>

    <!-- Specular sheen gradient -->
    <linearGradient id="abSheen" x1="30" y1="150" x2="120" y2="26" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.1"/>
      <stop offset="70%" stop-color="#FFFFFF" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.9"/>
    </linearGradient>
  </defs>

  <!-- The Exact Official Interlocking AB Monogram from User Reference Image -->
  <g transform="translate(0, -10)">
    <!-- Letter 'A': Left Leg & Summit -->
    <path fill="url(#abLeftLegGrad)" d="
      M 28,168
      L 120,36
      L 140,168
      L 111,98
      L 64,168
      Z
    "/>

    <!-- Letter 'A': Right 3D Chiseled Facet -->
    <path fill="url(#abRightFacetGrad)" d="
      M 120,36
      L 168,168
      L 140,168
      Z
    "/>

    <!-- Letter 'A': Inner Mountain / Arrowhead -->
    <path fill="url(#abMountainLeft)" d="
      M 88,168
      L 105,128
      L 105,168
      Z
    "/>
    <path fill="url(#abMountainRight)" d="
      M 105,128
      L 122,168
      L 105,168
      Z
    "/>

    <!-- Letter 'B': Continuous Stylized Ribbon with Open Slots and Diagonal Slice -->
    <path fill="url(#abLogoGrad)" d="
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
    "/>

    <!-- Specular highlight accents -->
    <path d="M 32,164 L 118,38" stroke="url(#abSheen)" stroke-width="2.5" stroke-linecap="round" opacity="0.75"/>
    <path d="M 144,60 L 216,60 C 236,60 248,70 252,82" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" opacity="0.45"/>
    <path d="M 163,106 L 214,106" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" opacity="0.3"/>
  </g>

  <!-- Wordmark 'AB TechSol' -->
  <text x="150" y="206" text-anchor="middle" fill="#FFFFFF" font-family="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.02em">
    <tspan fill="#00E5FF">AB</tspan> TechSol
  </text>
  <text x="150" y="224" text-anchor="middle" fill="#94A3B8" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="600" letter-spacing="0.25em">
    SOFTWARE &amp; DIGITAL SOLUTIONS
  </text>
</svg>`;
