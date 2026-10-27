import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true }) => {
  const dimensions = {
    sm: { width: 120, height: 90 },
    md: { width: 180, height: 130 },
    lg: { width: 220, height: 160 },
  }[size];

  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* Visual Adventure Emblem: Folded Map + Pin + Compass */}
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <defs>
          {/* Map Gradients */}
          <linearGradient id="mapFold1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4FB3D9" />
            <stop offset="100%" stopColor="#2E86AB" />
          </linearGradient>
          <linearGradient id="mapFold2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7CD0EC" />
            <stop offset="100%" stopColor="#4FB3D9" />
          </linearGradient>
          <linearGradient id="mapFold3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3A98BD" />
            <stop offset="100%" stopColor="#1E6585" />
          </linearGradient>

          {/* Pin Gradient */}
          <linearGradient id="pinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#E53935" />
          </linearGradient>

          {/* Gold Compass */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="100%" stopColor="#FFC400" />
          </linearGradient>
        </defs>

        {/* --- MAP PANELS --- */}
        {/* Left Panel */}
        <polygon points="30,45 85,25 85,120 30,140" fill="url(#mapFold1)" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        {/* Center Panel */}
        <polygon points="85,25 155,45 155,140 85,120" fill="url(#mapFold2)" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
        {/* Right Panel */}
        <polygon points="155,45 210,25 210,120 155,140" fill="url(#mapFold3)" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />

        {/* Map Topographical Contour Lines */}
        <path d="M45,70 Q60,60 75,75" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3,3" opacity="0.6" fill="none" />
        <path d="M100,55 Q120,40 140,65" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3,3" opacity="0.6" fill="none" />
        <path d="M165,80 Q185,65 200,85" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3,3" opacity="0.6" fill="none" />

        {/* Trail / Path */}
        <path d="M50,110 C80,95 110,120 135,80 C155,50 170,95 195,65" stroke="#FFC400" strokeWidth="4" strokeLinecap="round" strokeDasharray="6,4" fill="none" />

        {/* --- COMPASS ROSE (Bottom Right of Map) --- */}
        <g transform="translate(180, 115)">
          <circle cx="0" cy="0" r="18" fill="#1B4459" stroke="#FFC400" strokeWidth="2.5" />
          {/* North needle */}
          <polygon points="0,-14 4,-2 0,0 -4,-2" fill="#E53935" />
          {/* South needle */}
          <polygon points="0,14 4,2 0,0 -4,2" fill="#FFFFFF" />
          {/* East/West */}
          <polygon points="14,0 2,4 0,0 2,-4" fill="#FFC400" />
          <polygon points="-14,0 -2,4 0,0 -2,-4" fill="#FFC400" />
          <circle cx="0" cy="0" r="3" fill="#FFC400" />
        </g>

        {/* --- LOCATION PIN (Center) --- */}
        <g transform="translate(120, 65)">
          {/* Shadow */}
          <ellipse cx="0" cy="38" rx="14" ry="5" fill="#000000" opacity="0.3" />
          {/* Pin Body */}
          <path
            d="M0,36 C-1,-5 -22,-15 -22,-32 C-22,-45 -12,-55 0,-55 C12,-55 22,-45 22,-32 C22,-15 1,-5 0,36 Z"
            fill="url(#pinGrad)"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Pin Eye / Inner Compass */}
          <circle cx="0" cy="-32" r="11" fill="#FFFFFF" />
          <circle cx="0" cy="-32" r="8" fill="#245B78" />
          <path d="M0,-39 L2,-32 L0,-25 L-2,-32 Z" fill="#FFC400" />
          <circle cx="0" cy="-32" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>

      {/* Styled Brand Name Text as seen in Figure 1 */}
      {showSubtitle && (
        <div className="text-center mt-1">
          <div className="flex items-center justify-center space-x-1">
            <span className="text-2xl font-black tracking-tight text-[#4FB3D9] drop-shadow-sm">Educa</span>
            <span className="text-2xl font-black tracking-tight text-educa-yellow drop-shadow-sm">Tour</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-wide text-white drop-shadow mt-1">
            EducaTour
          </h1>
        </div>
      )}
    </div>
  );
};
