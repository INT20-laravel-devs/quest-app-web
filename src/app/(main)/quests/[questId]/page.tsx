import QuestReviews from '@/features/quests/compoents/quest-reviews';
import QuestResults from '@/features/quests/compoents/quest-results';

interface QuestProps {
  params: {
    questId: string;
  };
}

const Quest = ({ params }: QuestProps) => {
  return (
    <div className="space-y-6">
      <QuestResults />
      <QuestReviews questId={params.questId} />
    </div>
  );
};

export default Quest;
