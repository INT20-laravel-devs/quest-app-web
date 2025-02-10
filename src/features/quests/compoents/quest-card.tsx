import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Quest } from '@/types/quest';
import Image from 'next/image';
import { Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React from 'react';
import { cn } from '@/utils/styles-utils';
import Link from 'next/link';
import { Routes } from '@/constants/routes';

interface QuestCardProps {
  quest: Quest;
}

const QuestCard = ({ quest }: QuestCardProps) => {
  const questHref = Routes.QUEST.replace('[id]', quest.id);
  return (
    <Card className="overflow-hidden">
      <Link href={questHref}>
        <CardHeader className="p-0 relative">
          {quest.image ? (
            <Image
              src={quest.image || '/placeholder.svg'}
              alt={quest.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          {quest.approved && (
            <Badge
              variant={quest.approved ? 'success' : 'secondary'}
              className={cn(
                'absolute top-1 right-2',
                quest.approved
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
              )}
            >
              Approved
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-2">{quest.title}</CardTitle>
          <p className="text-sm text-gray-600 mb-4">{quest.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            {quest.duration && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{quest.duration} min</span>
              </div>
            )}
            {quest.reviewScore !== undefined &&
              quest.reviewCount !== undefined && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  <span>
                    {quest.reviewScore.toFixed(1)} ({quest.reviewCount} reviews)
                  </span>
                </div>
              )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default QuestCard;
