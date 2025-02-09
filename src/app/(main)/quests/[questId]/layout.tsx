import { PropsWithChildren } from 'react';
import QuestCard from '@/features/quests/compoents/quest-card';

interface QuestLayoutProps extends PropsWithChildren {
  params: {
    questId: string;
  };
}

const QuestLayout = ({ children, params }: QuestLayoutProps) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      <QuestCard questId={params.questId} />
      {children}
    </div>
  );
};

export default QuestLayout;
