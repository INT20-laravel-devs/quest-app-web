import RoundCreatePage from '@/features/quest-create/round-create-page';

interface QuestCreateTasksProps {
  params: {
    questId: string;
  };
}

const QuestCreateTasks = ({ params }: QuestCreateTasksProps) => {
  return <RoundCreatePage questId={params.questId} />;
};

export default QuestCreateTasks;
