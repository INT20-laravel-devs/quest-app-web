'use client';
import { getTasks } from '@/api/quests';
import QuestTasks from '@/features/quests/components/quest-tasks';
import { useQuery } from '@tanstack/react-query';

interface QuestGameProps {
  params: {
    questId: string;
  };
}

const QuestGame = ({ params }: QuestGameProps) => {
  const { data } = useQuery({
    queryKey: ['tasks', params.questId],
    queryFn: () => getTasks(params.questId),
  });

  if (!data) return null;

  return (
    <QuestTasks
      durationMinutes={20}
      startTime={new Date()}
      data={data}
      questId={params.questId}
    />
  );
};

export default QuestGame;
