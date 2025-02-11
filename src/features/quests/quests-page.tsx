'use client';

import GradientHeading from '@/components/common/gradient-heading';
import Table from '@/components/common/table';
import { Button } from '@/components/ui/button';
import { Routes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Quest } from '@/types/quest';
import QuestCard from '@/features/quests/compoents/quest-card';
import QuestFilters from '@/features/quests/compoents/quest-filters';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { getQuests } from '@/api/quests';

// const quests_dummy: Quest[] = [
//   {
//     id: '1',
//     title: 'The Enchanted Forest',
//     description:
//       'Navigate through a mystical forest filled with magical creatures and hidden treasures.',
//     image: '/placeholder.svg?height=200&width=300',
//     duration: 60,
//     reviewScore: 4.5,
//     reviewCount: 128,
//     approved: true,
//   },
//   {
//     id: '2',
//     title: 'The Ancient Ruins',
//     description:
//       'Explore the remnants of an ancient civilization and uncover its secrets.',
//     duration: 90,
//     reviewScore: 4.2,
//     reviewCount: 95,
//     approved: true,
//   },
//   {
//     id: '3',
//     title: "The Dragon's Lair",
//     description:
//       "Brave the perils of a dragon's domain to claim a legendary artifact.",
//     image: '/placeholder.svg?height=200&width=300',
//     approved: true,
//   },
//   {
//     id: '4',
//     title: 'The Underwater Kingdom',
//     description:
//       'Dive into an aquatic realm and help the merfolk solve an ancient mystery.',
//     image: '/placeholder.svg?height=200&width=300',
//     duration: 75,
//     approved: false,
//   },
//   {
//     id: '5',
//     title: 'The Time Paradox',
//     description:
//       'Travel through different eras to prevent a temporal catastrophe.',
//     reviewScore: 4.6,
//     reviewCount: 152,
//     approved: true,
//   },
//   {
//     id: '6',
//     title: 'The Cosmic Voyage',
//     description:
//       'Embark on an interstellar journey to save a dying alien civilization.',
//     image: '/placeholder.svg?height=200&width=300',
//     duration: 150,
//     reviewScore: 4.7,
//     reviewCount: 176,
//     approved: false,
//   },
// ];

const QuestsPage: FC = () => {
  const router = useRouter();

  const [search] = useQueryState('search');
  const [showApprovedOnly] = useQueryState('approved', parseAsBoolean);
  const [quests, setQuests] = useState<Quest[]>([]);

  const filteredQuests = quests.filter((quest) => {
    if (showApprovedOnly && !quest.approved) return false;
    if (search && !quest.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const featchQuests = async () => {
    const data = await getQuests();
    console.log(data);
    setQuests(data);
  }

  useEffect(()=> {
    featchQuests()
  }, [])

  return (
    <section className="max-w-7xl px-4 mx-auto">
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
      <Table />
    </section>
  );
};

export default QuestsPage;
