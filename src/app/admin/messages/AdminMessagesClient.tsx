"use client";

import React, { useState, useTransition } from "react";
import {
  Mail,
  Trash2,
  MessageSquare,
  Archive,
  ArchiveRestore,
  Eye,
  EyeOff,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { markMessageRead, archiveMessage, deleteMessage } from "@/actions";

interface MessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: Date;
}

function formatDate(date: Date) {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffHours = diffMs / 3600000;
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
  if (diffHours < 48) return "Yesterday";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

type Filter = "all" | "unread" | "archived";

export default function AdminMessagesClient({
  initialMessages,
}: {
  initialMessages: MessageRecord[];
}) {
  const [messages, setMessages] = useState<MessageRecord[]>(initialMessages);
  const [selected, setSelected] = useState<MessageRecord | null>(
    initialMessages.find((m) => !m.archived) ?? initialMessages[0] ?? null
  );
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.read && !m.archived;
    if (filter === "archived") return m.archived;
    return !m.archived;
  });

  const unreadCount = messages.filter((m) => !m.read && !m.archived).length;

  const handleSelect = (msg: MessageRecord) => {
    setSelected(msg);
    if (!msg.read) {
      startTransition(async () => {
        await markMessageRead(msg.id, true);
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
        );
      });
    }
  };

  const handleToggleRead = (msg: MessageRecord) => {
    startTransition(async () => {
      await markMessageRead(msg.id, !msg.read);
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, read: !m.read } : m))
      );
    });
  };

  const handleToggleArchive = (msg: MessageRecord) => {
    startTransition(async () => {
      await archiveMessage(msg.id, !msg.archived);
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, archived: !m.archived } : m))
      );
      if (selected?.id === msg.id) setSelected(null);
    });
  };

  const handleDelete = (msg: MessageRecord) => {
    if (!confirm("Delete this message permanently?")) return;
    startTransition(async () => {
      await deleteMessage(msg.id);
      setMessages((prev) => prev.filter((m) => m.id !== msg.id));
      if (selected?.id === msg.id) setSelected(null);
    });
  };

  return (
    <div className="min-h-screen flex bg-neutral-950 text-neutral-100">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
          <div>
            <Heading level={1} eyebrow="Inbox // Contact Submissions">
              Messages & Inquiries
            </Heading>
            <Text variant="small" className="text-neutral-400 mt-1">
              {messages.length} total · {unreadCount} unread
            </Text>
          </div>
          {unreadCount > 0 && (
            <Badge variant="accent" size="md">
              {unreadCount} Unread
            </Badge>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 border-b border-neutral-800 pb-0">
          {(["all", "unread", "archived"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition border-b-2 -mb-px ${
                filter === f
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {f}
              {f === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[9px]">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Inbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Message List */}
          <div className="lg:col-span-5 space-y-2">
            {filtered.length === 0 && (
              <Card hoverEffect={false} className="p-8 text-center text-neutral-500 space-y-2 bg-neutral-900/40 border-neutral-800">
                <MessageSquare className="h-6 w-6 mx-auto" />
                <p className="font-mono text-xs">No messages in this view.</p>
              </Card>
            )}
            {filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelect(msg)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                  selected?.id === msg.id
                    ? "bg-neutral-900 border-blue-500/50 shadow-md shadow-blue-500/5"
                    : "bg-neutral-900/40 border-neutral-800 hover:bg-neutral-900/60"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono font-bold ${!msg.read ? "text-blue-400" : "text-neutral-300"}`}>
                    {msg.name}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">
                    {formatDate(msg.createdAt)}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-neutral-100 truncate">{msg.subject}</h4>
                <p className="text-[11px] text-neutral-400 line-clamp-2">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-7">
            {selected ? (
              <Card hoverEffect={false} className="p-6 sm:p-8 space-y-6 bg-neutral-900/60 border-neutral-800">
                <div className="flex items-start justify-between border-b border-neutral-800 pb-5">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-neutral-100">{selected.subject}</h3>
                    <p className="text-xs font-mono text-neutral-400">
                      From:{" "}
                      <span className="text-neutral-200">{selected.name}</span>{" "}
                      <span className="text-neutral-500">({selected.email})</span>
                    </p>
                    <p className="text-[10px] font-mono text-neutral-600">
                      {new Date(selected.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleRead(selected)}
                      disabled={isPending}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
                      title={selected.read ? "Mark Unread" : "Mark Read"}
                    >
                      {selected.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleToggleArchive(selected)}
                      disabled={isPending}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-amber-400 transition"
                      title={selected.archived ? "Unarchive" : "Archive"}
                    >
                      {selected.archived ? (
                        <ArchiveRestore className="h-4 w-4" />
                      ) : (
                        <Archive className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(selected)}
                      disabled={isPending}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-neutral-200 leading-relaxed font-sans whitespace-pre-wrap rounded-xl bg-neutral-950 p-5 border border-neutral-800">
                  {selected.message}
                </div>

                <div className="pt-1">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono font-semibold text-white transition"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Reply via Email
                  </a>
                </div>
              </Card>
            ) : (
              <Card hoverEffect={false} className="p-16 text-center text-neutral-600 space-y-2 bg-neutral-900/40 border-neutral-800">
                <MessageSquare className="h-8 w-8 mx-auto" />
                <p className="font-mono text-xs">Select a message to read it</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
