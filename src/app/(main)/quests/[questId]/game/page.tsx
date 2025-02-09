import QuestTasks from '@/features/quests/compoents/quest-tasks';

interface QuestGameProps {
  params: {
    questId: string;
  };
}

const QuestGame = ({ params }: QuestGameProps) => {
  return <QuestTasks questId={params.questId} />;
};

export default QuestGame;
