'use client';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Star, Clock } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/styles-utils';
import { Routes } from '@/constants/routes';
import { useQuery } from '@tanstack/react-query';
import { getQuest } from '@/api/quests';

interface QuestDashboardProps {
  questId: string;
}

const getStars = (grade: number, maxStars: number = 5) => {
  const filledStars = Math.round(grade);
  return Array.from({ length: maxStars }, (_, index) => index < filledStars);
};

const QuestDashboard = ({ questId }: QuestDashboardProps) => {
  const gameHref = Routes.QUEST_GAME.replace('[id]', questId);

  const { data } = useQuery({
    queryKey: ['quest', questId],
    queryFn: () => getQuest(questId),
  });

  return (
    <Card className="flex flex-col md:flex-row w-full max-w-7xl bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="bg-gray-200 w-full h-64 md:w-1/2 md:h-auto"></div>

      <CardContent className="p-6 min-h-[350px] md:w-1/2 flex flex-col justify-between">
        <div>
          <div>
            <h2 className="text-2xl font-bold">{data?.title}</h2>
            <p className="text-gray-600 mt-2">{data?.description}</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            {data?.timeLimit && (
              <div className="flex items-center space-x-2 text-gray-500">
                <Clock className="w-5 h-5" />
                <span>{data?.timeLimit}m</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              {getStars(data?.grade || 0).map((filled, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
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

export default QuestDashboard;
