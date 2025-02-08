'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  userRole?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const HeroSection = ({
  title,
  subtitle,
  userRole,
  buttonText,
  onButtonClick,
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[200px] object-cover">
      <Image
        src="/bg-main-large.webp"
        alt="A background image"
        width={1920}
        height={1080}
        sizes="(max-width: 640px) 480px, (max-width: 1024px) 1024px, 1920px"
        className="h-full max-h-60 sm:max-h-80 w-full object-cover"
        priority
      />

      <div className="absolute top-1/2 max-w-6xl left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full z-10 flex justify-between items-center px-8 py-6 min-h-[200px]">
        <div className="flex items-center gap-6">
          <div className="relative h-16 w-16 rounded-full bg-gray-300 overflow-hidden" />
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold text-white">{title}</h1>
            </div>
            <Badge variant="secondary">{userRole}</Badge>
            <p className="text-gray-200">{subtitle}</p>
          </div>
        </div>

        {buttonText && onButtonClick && (
          <div className="flex items-center gap-3">
            <Button onClick={onButtonClick}>{buttonText}</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
