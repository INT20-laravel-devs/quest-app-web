import { PropsWithChildren } from 'react';
import QuestDashboard from '@/features/quests/components/quest-dashboard';
import { ChatPopover } from '@/features/chat/components/chat-popover';

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
      <ChatPopover />
    </div>
  );
};

export default QuestLayout;
