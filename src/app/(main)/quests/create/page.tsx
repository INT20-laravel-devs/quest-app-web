import QuestCreatePage from '@/features/quest-create/quest-create-page';

interface CreateQuestProps {
  params: {
    questId: string;
  };
}

const CreateQuest = ({ params }: CreateQuestProps) => {
  return <QuestCreatePage questId={params.questId} />;
};

export default CreateQuest;
