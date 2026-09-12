import { db } from "@/lib/db";

export async function getMessages() {
  try {
    return await db.message.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getUnreadMessageCount(): Promise<number> {
  try {
    return await db.message.count({
      where: { read: false, archived: false },
    });
  } catch {
    return 0;
  }
}
