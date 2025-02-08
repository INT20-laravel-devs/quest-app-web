'use client';

import { Button } from '@/components/ui/button';

interface CtaProps {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const Cta = ({
  heading = 'Ready to Get Started?',
  description = 'The platform is focused on interactive learning, entertainment, and team building.',
  buttons = {
    primary: {
      text: 'Get Started',
      url: 'https://www.shadcnblocks.com',
    },
    secondary: {
      text: 'Source Code',
      url: 'https://www.shadcnblocks.com',
    },
  },
}: CtaProps) => {
  return (
    <section className="py-32  max-w-screen-lg m-auto">
      <div className="container">
        <div className="relative flex flex-col items-center rounded-lg text-center md:rounded-xl lg:p-16 overflow-hidden">
          <img
            src="/bg-main-large.webp"
            alt="A background image"
            sizes="(max-width: 640px) 480px, (max-width: 1024px) 1024px, 1920px"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 p-8 lg:p-16">
            <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6 text-white">
              {heading}
            </h3>
            <p className="mb-8 max-w-3xl text-lg text-gray-200 lg:text-lg">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
              {buttons.secondary && (
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
                </Button>
              )}
              {buttons.primary && (
                <Button className="w-full sm:w-auto" asChild>
                  <a href={buttons.primary.url}>{buttons.primary.text}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Cta };
