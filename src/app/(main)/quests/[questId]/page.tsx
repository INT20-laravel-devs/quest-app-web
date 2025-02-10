import QuestDashboard from '@/features/quests/compoents/quest-dashboard';
import QuestReviews from '@/features/quests/compoents/quest-reviews';
import QuestResults from '@/features/quests/compoents/quest-results';
import QuestTasks from '@/features/quests/compoents/quest-tasks';

interface QuestProps {
  params: {
    questId: string;
  };
}

const Quest = ({ params }: QuestProps) => {
  const { questId } = params;

  return (
    <div>
      <QuestResults />
      <QuestReviews />
    </div>
  );
};

export default Quest;
