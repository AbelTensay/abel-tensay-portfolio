"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdminSession } from "@/lib/auth";

export async function markMessageRead(messageId: string, readState: boolean) {
  await requireAdminSession();
  try {
    await db.message.update({
      where: { id: messageId },
      data: { read: readState },
    });
    revalidatePath("/admin/messages");
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Failed to update message read state:", err);
    return { success: false, error: "Failed to update message" };
  }
}

export async function archiveMessage(messageId: string, archiveState: boolean) {
  await requireAdminSession();
  try {
    await db.message.update({
      where: { id: messageId },
      data: { archived: archiveState },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (err) {
    console.error("Failed to archive message:", err);
    return { success: false, error: "Failed to archive message" };
  }
}

export async function deleteMessage(messageId: string) {
  await requireAdminSession();
  try {
    await db.message.delete({
      where: { id: messageId },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (err) {
    console.error("Failed to delete message:", err);
    return { success: false, error: "Failed to delete message" };
  }
}
