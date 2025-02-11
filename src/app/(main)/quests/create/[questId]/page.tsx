import RoundCreatePage from '@/features/round-create/round-create-page';

interface QuestCreateTasksProps {
  params: {
    questId: string;
  };
}

const QuestCreateTasks = ({ params }: QuestCreateTasksProps) => {
  return <RoundCreatePage questId={params.questId} />;
};

export default QuestCreateTasks;
