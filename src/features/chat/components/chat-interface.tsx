'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Plus, Send } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'agent';
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: 'Hi, how can I help you today?', sender: 'agent' },
    {
      id: 2,
      content: "Hey, I'm having trouble with my account.",
      sender: 'user',
    },
    { id: 3, content: 'What seems to be the problem?', sender: 'agent' },
    { id: 4, content: "I can't log in.", sender: 'user' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          content: newMessage,
          sender: 'user',
        },
      ]);
      setNewMessage('');

      // Simulate agent response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            content: "I'll help you with that right away.",
            sender: 'agent',
          },
        ]);
      }, 1000);
    }
  };

  return (
    <Card className="w-[400px] shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JGzOg2GU5NWGy1LhvYEOffHaYOEJQh.png" />
            <AvatarFallback>SD</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">Sofia Davis</div>
            <div className="text-sm text-muted-foreground">m@example.com</div>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="h-[300px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'user' ? 'bg-primary text-white' : 'bg-muted'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
