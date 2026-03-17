import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export function Icon({ name, className = '', filled = false }: IconProps): React.JSX.Element {
  return (
    <span
      className={`material-symbols-outlined ${filled ? 'filled' : ''} ${className}`}
      style={filled ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}
