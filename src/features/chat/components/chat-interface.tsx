'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Send, UserRound } from 'lucide-react';
import useAuthStore from '@/store/use-auth-store';
import { format } from 'date-fns';
import { socket } from '@/socket';

interface Message {
  nickname: string;
  createdAt: string;
  content: string;
  questId: string;
  avatarLink: string;
}

export function ChatInterface() {
  const user = useAuthStore((state) => state.user);
  const [messages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.on('connect', (data) => {
      console.log(data);
    });

    // socket.on('message', (message: Message) => {
    //   setMessages((prevMessages) => [...prevMessages, message]);
    // });
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket && user) {
      const message: Message = {
        nickname: user.nickname,
        createdAt: new Date().toISOString(),
        content: newMessage,
        questId: 'default-quest-id', // Replace with actual quest ID if available
        avatarLink: user.avatarLink || '',
      };

      socket.emit('message', message);
      setNewMessage('');
    }
  };

  return (
    <Card className="w-[400px] shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user?.avatarLink as string} />
            <AvatarFallback>
              <UserRound
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{user?.nickname}</div>
            <div className="text-sm text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      </div>

      <div className="h-[300px] overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={message.avatarLink} />
              <AvatarFallback>
                <UserRound
                  size={16}
                  strokeWidth={2}
                  className="opacity-60"
                  aria-hidden="true"
                />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-semibold text-sm">
                  {message.nickname}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(message.createdAt), 'HH:mm')}
                </span>
              </div>
              <div className="mt-1 text-sm bg-muted rounded-xl px-3 py-2">
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 w-full border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 w-full"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
