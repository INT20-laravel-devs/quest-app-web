import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Star, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/styles-utils';
import { Routes } from '@/constants/routes';

interface QuestCardProps {
  questId: string;
}

const QuestCard = ({ questId }: QuestCardProps) => {
  const gameHref = Routes.QUEST_GAME.replace('[id]', questId);

  return (
    <Card className="flex flex-col md:flex-row w-full max-w-7xl bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="bg-gray-200 w-full h-64 md:w-1/2 md:h-auto"></div>

      <CardContent className="p-6 min-h-[350px] md:w-1/2 flex flex-col justify-between">
        <div>
          <div>
            <h2 className="text-2xl font-bold">Quest</h2>
            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
              aliquam explicabo numquam quaerat vero nesciunt, adipisci non,
              amet soluta expedita illo. Praesentium illo, quidem soluta est
              corrupti accusamus enim quo.
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock className="w-5 h-5" />
              <span>20m</span>
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400" />
              ))}
              <Star className="w-5 h-5 text-gray-300" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link href={gameHref} className={cn(buttonVariants(), 'w-full')}>
            Start
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestCard;
