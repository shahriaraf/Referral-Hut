import React from 'react';
import { colors } from '../programData'; // কালার ডাটা ইমপোর্ট করুন

const LevelBadge = ({ level, color }) => {
  const colorClass = colors[color].bg;
  return (
    <div className="relative w-20 h-24 mb-4">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 80 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 0L79.3728 23.75V71.25L40 95L0.627197 71.25V23.75L40 0Z"
          className={`fill-current ${colorClass} opacity-20`}
        />
        <path
          d="M40 4L75.5885 25.9375V69.0625L40 91L4.41154 69.0625V25.9375L40 4Z"
          className={`stroke-current ${colorClass}`}
          strokeWidth="4"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-bold text-white tracking-tighter">
          {level}
        </span>
      </div>
    </div>
  );
};

export default LevelBadge;