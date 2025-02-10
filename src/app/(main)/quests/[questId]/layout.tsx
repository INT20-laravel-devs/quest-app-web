import { PropsWithChildren } from 'react';
import QuestDashboard from '@/features/quests/compoents/quest-dashboard';

interface QuestLayoutProps extends PropsWithChildren {
  params: {
    questId: string;
  };
}

const QuestLayout = ({ children, params }: QuestLayoutProps) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      <QuestDashboard questId={params.questId} />
      {children}
    </div>
  );
};

export default QuestLayout;
