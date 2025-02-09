'use client'

import React from 'react';
import {
  Table as TableShadcn,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface Quests {
  id: string;
  title: string;
  description: string;
  is_approved: boolean;
}

interface TableProps {
  rounds?: Quests[];
  onViewRound?: (id: string) => void;
}

const Table = ({
  rounds = [
    {
      id: '1',
      title: 'City Adventure',
      description: 'Explore the hidden gems of downtown',
      is_approved: true,
    },
    {
      id: '2',
      title: 'Forest Quest',
      description: 'Navigate through the ancient woodland trails',
      is_approved: false,
    },
    {
      id: '3',
      title: 'Historical Tour',
      description: "Discover the city's rich historical landmarks",
      is_approved: true,
    },
  ],
  onViewRound = (id: string) => console.log('View round:', id),
}: TableProps) => {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <TableShadcn>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead className="w-[400px]">Description</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rounds.map((round) => (
              <TableRow key={round.id} className="group hover:bg-muted/50">
                <TableCell className="font-medium">{round.title}</TableCell>
                <TableCell className="text-muted-foreground">
                  {round.description}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={round.is_approved ? 'success' : 'secondary'}
                    className={`
                      ${
                        round.is_approved
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                      }
                    `}
                  >
                    {round.is_approved ? 'Approved' : 'Pending'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewRound(round.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableShadcn>
      </div>
    </div>
  );
};

export default Table;
