'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useEffect } from 'react';
import { createParticipation, getParticipation } from '@/api/participation';
import useAuthStore from '@/store/use-auth-store';
import { toast } from 'sonner';

const QuestResults = () => {
  const user = useAuthStore((state) => state.user);
  console.log(user);
  const results = {
    score: 850,
    maxScore: 1000,
    timeSpent: '45:30',
    correctAnswers: 8,
    totalQuestions: 10,
    achievements: [
      {
        id: 1,
        name: 'Швидкий старт',
        description: 'Завершено перше завдання за 1 хвилину',
      },
      { id: 2, name: 'Точність', description: '80% правильних відповідей' },
      { id: 3, name: 'Марафонець', description: 'Завершено всі завдання' },
    ],
  };

  const fetchParticipations = async () => {
    if (!user?.id) return;
    try {
      const res = await getParticipation(
        '1d2a0096-6511-47b5-a6b2-764bf5afb9f6',
      );
      console.log(res);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
      console.error(e);
    }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchParticipations();
    // createParticipation({
    //   userId: user?.id as string,
    //   questId: 'a9e396c9-9097-4260-a19e-b8bc0b692bba',
    //   points: 850,
    //   correctAnswers: 8,
    //   timeSpent: 45,
    // }).then();
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Your results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {results.score}
              </div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {results.correctAnswers}/{results.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Correct answers</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {results.timeSpent}
              </div>
              <div className="text-sm text-gray-600">Time</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span>Progress</span>
              <span>
                {Math.round((results.score / results.maxScore) * 100)}%
              </span>
            </div>
            <Progress
              value={(results.score / results.maxScore) * 100}
              className="h-2"
            />
          </div>

          {/*TODO: Uncomment when achievements will be available*/}
          {/*<div>*/}
          {/*  <h3 className="font-semibold mb-3">Отримані досягнення</h3>*/}
          {/*  <div className="grid gap-3">*/}
          {/*    {results.achievements.map((achievement) => (*/}
          {/*      <div*/}
          {/*        key={achievement.id}*/}
          {/*        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"*/}
          {/*      >*/}
          {/*        <Award className="w-8 h-8 text-yellow-500" />*/}
          {/*        <div>*/}
          {/*          <div className="font-medium">{achievement.name}</div>*/}
          {/*          <div className="text-sm text-gray-600">*/}
          {/*            {achievement.description}*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestResults;
