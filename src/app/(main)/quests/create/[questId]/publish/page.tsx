import QuestPublishPage from '@/features/quest-create/quest-publish-page';

interface PublishQuestProps {
  params: {
    questId: string;
  };
}

const PublishQuest = ({ params }: PublishQuestProps) => {
  return <QuestPublishPage questId={params.questId} />;
};

export default PublishQuest;
