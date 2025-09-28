// src/hooks/useTasks.ts
import { useEffect, useState } from "react";
import { getTasksByUser } from "@/api/tasks";
import { getUser } from "@/api/auth";

export function useTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const user = await getUser();
        if (!user) {
          setError("No user logged in");
          return;
        }

        const data = await getTasksByUser(user.id);
        setTasks(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return { tasks, loading, error };
}