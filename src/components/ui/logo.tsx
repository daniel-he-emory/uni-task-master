
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Logo = ({ size = 'medium', className }: LogoProps) => {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl',
  };

  return (
    <div className={cn('font-bold text-unitask-primary flex items-center', sizeClasses[size], className)}>
      <span>Uni</span>
      <span className="text-unitask-secondary">Task</span>
    </div>
  );
};

export default Logo;
