'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Star, UserRound } from 'lucide-react';
import QuestReviewsForm from '@/features/quests/components/quest-reviews-form';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getComments } from '@/api/comments';
import { Comment } from '@/types/comments';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAuthStore from '@/store/use-auth-store';

interface QuestReviewsProps {
  questId: string;
}

const QuestReviews = ({ questId }: QuestReviewsProps) => {
  const user = useAuthStore((state) => state.user);
  const [reviews, setReviews] = useState<Comment[]>([]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['questReviews', questId],
    queryFn: () => getComments(questId),
  });

  useEffect(() => {
    if (data && reviews.length === 0 && !isLoading) {
      setReviews(data);
    }
  }, [data, reviews.length, isLoading]);

  useEffect(() => {
    refetch().then();
  }, [reviews]);

  const isCommentAllowed = !reviews.find(
    (review) => review.userId === user?.id,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-green-500" />
          Reviews and ratings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isCommentAllowed && (
          <QuestReviewsForm
            setReviews={setReviews}
            questId={questId}
            reviews={reviews}
          />
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage
                    src={review?.user?.avatarLink as string}
                    alt={review?.user?.nickname}
                  />
                  <AvatarFallback>
                    <UserRound
                      size={16}
                      strokeWidth={2}
                      className="opacity-60"
                      aria-hidden="true"
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="w-full">
                  <div className="flex w-full items-center justify-between mb-2">
                    <div className="font-medium">{review?.user?.nickname}</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.grade
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review?.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestReviews;
