'use client';

import { FC } from 'react';

interface GradientHeadingProps {
  heading: string;
  className?: string;
  level?: 'h1' | 'h2' | 'h3';
}

const GradientHeading: FC<GradientHeadingProps> = ({
  heading,
  className,
  level = 'h2',
}) => {
  const HeadingTag = level;
  return (
    <HeadingTag
      className={`text-4xl font-semibold lg:text-5xl bg-gradient-to-r from-[#7c3aed] via-purple-400 to-[#7c3aed] 
        bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient ${className}`}
    >
      {heading}
    </HeadingTag>
  );
};

export default GradientHeading;
