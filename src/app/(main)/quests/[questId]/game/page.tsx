import { getTasks } from '@/api/quests';
import QuestTasks from '@/features/quests/components/quest-tasks';

interface QuestGameProps {
  params: {
    questId: string;
  };
}

const QuestGame = async ({ params }: QuestGameProps) => {
  const data = await getTasks(params.questId);
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
