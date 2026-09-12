import { getMessages } from "@/lib/data-access";
import AdminMessagesClient from "./AdminMessagesClient";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  return <AdminMessagesClient initialMessages={messages} />;
}
