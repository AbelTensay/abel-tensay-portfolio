"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Archive, Trash2, Clock, User, MessageSquare } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const MOCK_MESSAGES: MessageItem[] = [
  {
    id: "msg-1",
    name: "Sarah Jenkins",
    email: "sarah.j@techrecruitment.com",
    subject: "Full-Stack Software Engineer Opportunity",
    message: "Hi Abel, I reviewed your Digital Ekub platform case study and was impressed by your architectural breakdown. We have an open Senior Full-Stack role that aligns with your stack.",
    read: false,
    createdAt: "Today at 09:30 AM",
  },
  {
    id: "msg-2",
    name: "Marcus Vance",
    email: "m.vance@innovate.io",
    subject: "Consulting Inquiry: Computer Vision Stream Architecture",
    message: "Hello Abel, We are looking for a system engineer to consult on a real-time RTSP stream decoding queue similar to your Vision Feed Processing project. Are you available for contract work?",
    read: false,
    createdAt: "Yesterday at 03:15 PM",
  },
  {
    id: "msg-3",
    name: "David Chen",
    email: "david@fintechventures.org",
    subject: "Feedback on Digital Ekub Architecture",
    message: "Great work on the ROSCA savings architecture! Would love to chat about your experience with transactional consistency in Next.js Server Actions.",
    read: true,
    createdAt: "3 days ago",
  },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>(MOCK_MESSAGES);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(MOCK_MESSAGES[0]);

  const toggleRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <Heading level={1} eyebrow="Inbox // Contact Submissions">
              Messages & Inquiries
            </Heading>
            <Text variant="small" className="text-neutral-400 mt-1">
              Read, organize, and manage visitor messages submitted via the contact form.
            </Text>
          </div>

          <Badge variant="accent" size="md">
            {messages.filter((m) => !m.read).length} Unread
          </Badge>
        </div>

        {/* Inbox Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Message List Panel */}
          <div className="lg:col-span-5 space-y-3">
            {messages.map((msg) => (
              <Card
                key={msg.id}
                hoverEffect={false}
                onClick={() => {
                  setSelectedMessage(msg);
                  toggleRead(msg.id);
                }}
                className={`p-4 space-y-2 cursor-pointer transition-all border-neutral-800 ${
                  selectedMessage?.id === msg.id
                    ? "bg-neutral-900 border-blue-500/50 shadow-md"
                    : "bg-neutral-900/40 hover:bg-neutral-900/60"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono font-bold ${!msg.read ? "text-blue-400" : "text-neutral-300"}`}>
                    {msg.name}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">{msg.createdAt}</span>
                </div>
                <h4 className="text-xs font-semibold text-neutral-100 truncate">{msg.subject}</h4>
                <p className="text-[11px] text-neutral-400 line-clamp-2">{msg.message}</p>
              </Card>
            ))}
          </div>

          {/* Detailed Message Inspector */}
          <div className="lg:col-span-7">
            {selectedMessage ? (
              <Card hoverEffect={false} className="p-6 sm:p-8 space-y-6 bg-neutral-900/60 border-neutral-800">
                <div className="flex items-start justify-between border-b border-neutral-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-100">{selectedMessage.subject}</h3>
                    <p className="text-xs font-mono text-neutral-400 mt-1">
                      From: <span className="text-neutral-200">{selectedMessage.name}</span> ({selectedMessage.email})
                    </p>
                    <p className="text-[10px] font-mono text-neutral-500 mt-0.5">{selectedMessage.createdAt}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="p-2 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                      title="Delete Message"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-neutral-200 leading-relaxed font-sans whitespace-pre-wrap rounded-xl bg-neutral-950 p-4 border border-neutral-800">
                  {selectedMessage.message}
                </div>

                <div className="pt-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono font-semibold text-white transition"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </Card>
            ) : (
              <Card hoverEffect={false} className="p-12 text-center text-neutral-500 space-y-2">
                <MessageSquare className="h-8 w-8 mx-auto" />
                <p>Select a message from the list to inspect</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
