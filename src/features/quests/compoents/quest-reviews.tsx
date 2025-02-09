'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Star } from 'lucide-react';
import { useState } from 'react';

const QuestReviews = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const reviews = [
    {
      id: 1,
      author: 'Олександр',
      rating: 5,
      comment: 'Дуже цікавий квест! Особливо сподобались загадки.',
    },
    {
      id: 2,
      author: 'Ірина',
      rating: 4,
      comment:
        'Гарний баланс складності, але деякі завдання потребують уточнення.',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-green-500" />
          Reviews and ratings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="ghost"
                className="p-1 h-auto"
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Leave a comment..."
            className="mb-3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button>Comment</Button>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{review.author}</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-500 fill-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestReviews;
