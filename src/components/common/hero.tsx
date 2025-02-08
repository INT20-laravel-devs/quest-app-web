import { Gamepad, Map, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import GradientHeading from './gradient-heading';

interface Feature {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

interface HeroProps {
  badge?: string;
  heading?: string;
  imageSrc?: string;
  imageAlt?: string;
  features?: Feature[] | [];
}

const Hero = ({
  badge = 'Start your adventure by creating a new quest',
  heading = 'Create a new quest!',
  imageSrc = 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  imageAlt = 'placeholder',
  features = [
    {
      icon: <Gamepad className="h-auto w-5" />,
      title: 'Creating quests',
      description:
        'The user can create new quests by specifying the name, description, number oftasks, and time limit',
    },
    {
      icon: <Map className="h-auto w-5" />,
      title: 'Completing quests',
      description:
        'Interface for passing with an interactive task map. Real-time tracking of user progress. Time counter for tasks with a time limit.',
    },
    {
      icon: <Star className="h-auto w-5" />,
      title: 'Rating system',
      description:
        'Rating of quest authors. Evaluation of the quest by participants',
    },
  ],
}: HeroProps) => {
  return (
    <section className="py-16 max-w-6xl m-auto">
      <div className="container overflow-hidden">
        <div className="mb-20 flex flex-col items-center gap-6 text-center">
          <Badge variant="outline">{badge}</Badge>
          <GradientHeading level="h1" heading={heading} />
        </div>
        <div className="relative mx-auto max-w-screen-lg">
          <img
            width="1920"
            height="1080"
            src={imageSrc}
            alt={imageAlt}
            className="aspect-video max-h-[500px] w-full rounded-xl object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div className="absolute -right-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
          <div className="absolute -left-28 -top-28 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
        </div>
        <div className="mx-auto mt-10 flex max-w-screen-lg flex-col md:flex-row">
          {features.map((feature, index) => (
            <>
              {index > 0 && (
                <Separator
                  orientation="vertical"
                  className="mx-6 hidden h-auto w-[2px] bg-gradient-to-b from-muted via-transparent to-muted md:block"
                />
              )}
              <div
                key={index}
                className="flex grow basis-0 flex-col rounded-md bg-background p-4"
              >
                <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero };
