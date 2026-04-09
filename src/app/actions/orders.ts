"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function updateOrderStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  const supabase = await createClient();
  await supabase.from("quote_requests").update({ status }).eq("id", id);

  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
