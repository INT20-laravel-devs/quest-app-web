'use client';

import GradientHeading from '@/components/common/gradient-heading';
import Table from '@/components/common/table';
import { Button } from '@/components/ui/button';
import { Routes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const QuestsPage: FC = () => {
  const router = useRouter();

  return (
    <section className="max-w-6xl m-auto">
      <div className="py-12 text-center">
        <GradientHeading heading="Quests" />
      </div>
      <div className="py-4 flex justify-end">
        <Button onClick={() => router.push(Routes.QUEST_CREATE)}>
          Add new quest
        </Button>
      </div>
      <Table />
    </section>
  );
};

export default QuestsPage;
