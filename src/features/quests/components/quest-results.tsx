import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const QuestResults = () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Ваші результати
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {/* Основні показники */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {results.score}
              </div>
              <div className="text-sm text-gray-600">Набрані бали</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {results.correctAnswers}/{results.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">Правильні відповіді</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {results.timeSpent}
              </div>
              <div className="text-sm text-gray-600">Витрачений час</div>
            </div>
          </div>

          {/* Прогрес */}
          <div>
            <div className="flex justify-between mb-2">
              <span>Загальний прогрес</span>
              <span>
                {Math.round((results.score / results.maxScore) * 100)}%
              </span>
            </div>
            <Progress
              value={(results.score / results.maxScore) * 100}
              className="h-2"
            />
          </div>

          {/* Досягнення */}
          <div>
            <h3 className="font-semibold mb-3">Отримані досягнення</h3>
            <div className="grid gap-3">
              {results.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <Award className="w-8 h-8 text-yellow-500" />
                  <div>
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-sm text-gray-600">
                      {achievement.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestResults;
