import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Rocket, Settings, Gamepad } from 'lucide-react';
import GradientHeading from './gradient-heading';

interface EnhancedStepperProps {
  badge?: string;
  heading?: string;
  steps?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const EnhancedStepper = ({
  badge = 'Follow these steps to success',
  heading = 'How to create a new quest?',
  steps = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: 'Start',
      description:
        'Create a new account or log in. Then click on the Start button',
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: 'Configure Settings',
      description:
        'Create a quest, specifying the name, description, number of tasks, and time limit. Add multimedia elements',
    },
    {
      icon: <Gamepad className="h-6 w-6" />,
      title: 'Finish',
      description:
        'Done! Now you can use the quest with an interactive task map ',
    },
  ],
}: EnhancedStepperProps) => {
  return (
    <section className="py-24 max-w-screen-lg mx-auto relative overflow-hidden">
      <div className="absolute -right-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
      <div className="absolute -left-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>

      <div className="container px-4">
        <div className="mb-20 flex flex-col items-center gap-6 text-center">
          <Badge variant="outline" className="animate-fade-in">
            {badge}
          </Badge>
          <GradientHeading heading={heading} />
        </div>

        <div className="grid gap-8 md:grid-cols-3 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center group">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#7c3aed] to-purple-400 text-white flex items-center justify-center mb-6 relative z-10 shadow-lg transform transition-transform duration-300 hover:scale-110">
                  {step.icon}
                </div>

                <div className="text-center p-6 rounded-xl bg-background/50 backdrop-blur-sm border border-muted transition-all duration-300 hover:border-purple-400">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 -right-8 z-20">
                    <ArrowRight className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedStepper;
