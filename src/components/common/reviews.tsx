import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import GradientHeading from './gradient-heading';

interface ReviewProps {
  badge?: string;
  heading?: string;
  reviews?: {
    author: string;
    role?: string;
    content: string;
    rating: number;
    avatarSrc?: string;
  }[];
}

const ReviewBlock = ({
  badge = 'What People Say',
  heading = 'Customer Reviews',
  reviews = [
    {
      author: 'Sarah Johnson',
      role: 'Product Manager',
      content:
        'The platform exceeded our expectations. The interface is intuitive, and the features are exactly what we needed for our team collaboration.',
      rating: 5,
      avatarSrc: '/api/placeholder/100/100',
    },
    {
      author: 'Michael Chen',
      role: 'Tech Lead',
      content:
        'Implementation was seamless, and the support team was incredibly helpful. Our productivity has improved significantly since we started using it.',
      rating: 5,
      avatarSrc: '/api/placeholder/100/100',
    },
    {
      author: 'Emma Davis',
      role: 'Project Manager',
      content:
        "The automation features have saved us countless hours. It's been a game-changer for our workflow management and team coordination.",
      rating: 5,
      avatarSrc: '/api/placeholder/100/100',
    },
  ],
}: ReviewProps) => {
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

        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div key={index} className="group relative">
              <div className="h-full rounded-xl border border-muted bg-background/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-400">
                <div className="absolute -top-4 right-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-purple-400">
                    <Quote className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-300 text-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {/* Review Content */}
                <p className="mb-6 text-muted-foreground">{review.content}</p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={review.avatarSrc}
                    alt={review.author}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{review.author}</h4>
                    {review.role && (
                      <p className="text-sm text-muted-foreground">
                        {review.role}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewBlock;
