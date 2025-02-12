'use client';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MessageCircle } from 'lucide-react';
import { ChatInterface } from './chat-interface';

export function ChatPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="rounded-full h-12 w-12 fixed bottom-4 right-4"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="w-[400px] p-0">
        <ChatInterface />
      </PopoverContent>
    </Popover>
  );
}
