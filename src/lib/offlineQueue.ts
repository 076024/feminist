import { supabase } from "@/integrations/supabase/client";

const QUEUE_KEY = "help_requests_queue_v1";

export interface QueuedHelpRequest {
  id: string;
  category: string;
  message: string;
  queued_at: number;
}

const read = (): QueuedHelpRequest[] => {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    return raw ? (JSON.parse(raw) as QueuedHelpRequest[]) : [];
  } catch {
    return [];
  }
};

const write = (items: QueuedHelpRequest[]) => {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
  } catch {
    // storage full or unavailable — ignore silently
  }
};

export const enqueueHelpRequest = (data: { category: string; message: string }) => {
  const items = read();
  items.push({
    id: crypto.randomUUID(),
    category: data.category,
    message: data.message,
    queued_at: Date.now(),
  });
  write(items);
};

export const getQueueSize = () => read().length;

let flushing = false;

export const flushHelpRequestQueue = async (): Promise<{ sent: number; remaining: number }> => {
  if (flushing) return { sent: 0, remaining: read().length };
  if (typeof navigator !== "undefined" && navigator.onLine === false) {
    return { sent: 0, remaining: read().length };
  }
  flushing = true;
  let sent = 0;
  try {
    let items = read();
    const remaining: QueuedHelpRequest[] = [];
    for (const item of items) {
      const { error } = await supabase
        .from("help_requests")
        .insert({ category: item.category, message: item.message });
      if (error) {
        // stop on first failure so order is preserved
        remaining.push(item, ...items.slice(items.indexOf(item) + 1));
        break;
      }
      sent++;
    }
    if (sent > 0) {
      const all = read();
      write(all.slice(sent));
    }
    return { sent, remaining: read().length };
  } finally {
    flushing = false;
  }
};