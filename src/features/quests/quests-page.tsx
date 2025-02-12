'use client';

import GradientHeading from '@/components/common/gradient-heading';
import Table from '@/components/common/table';
import { Button } from '@/components/ui/button';
import { Routes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { QuestBody } from '@/types/quests';
import QuestCard from '@/features/quests/components/quest-card';
import QuestFilters from '@/features/quests/components/quest-filters';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { getQuests } from '@/api/quests';

const QuestsPage: FC = () => {
  const router = useRouter();

  const [search] = useQueryState('search');
  const [showApprovedOnly] = useQueryState('approved', parseAsBoolean);
  const [quests, setQuests] = useState<QuestBody[]>([]);

  const filteredQuests = quests.filter((quest) => {
    if (showApprovedOnly && !quest.isApproved) return false;
    return !(
      search && !quest.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const fetchQuests = async () => {
    const data = await getQuests();
    setQuests(data);
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  return (
    <section className="max-w-6xl m-auto">
      <div className="py-12 text-center">
        <GradientHeading heading="Quests" />
      </div>
      <div className="py-4 flex justify-between">
        <QuestFilters />
        <Button onClick={() => router.push(Routes.CREATE_QUEST)}>
          Add new quest
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuests.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </section>
  );
};

export default QuestsPage;
