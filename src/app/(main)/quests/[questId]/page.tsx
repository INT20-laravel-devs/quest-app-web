import QuestReviews from '@/features/quests/components/quest-reviews';
import QuestResults from '@/features/quests/components/quest-results';

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
