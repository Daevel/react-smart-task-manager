import { supabase } from "./supabaseClient";

// Fetch tasks for a specific user
export async function getTasksByUser(userId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("assigned_to", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Create a new task
export async function createTask(task: {
  title: string;
  description?: string;
  assigned_to?: string;
  team_id?: string;
  created_by: string;
}) {
  const { data, error } = await supabase.from("tasks").insert([task]).select();

  if (error) throw error;
  return data[0];
}

export async function updateTaskStatus(taskId: string, status: string) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId)
    .select();

  if (error) throw error;
  return data[0];
}

export async function updateTask(
  id: string,
  payload: { title: string; description: string; assigned_to?: string }
) {
  const { data, error } = await supabase
    .from("tasks")
    .update(payload)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data[0];
}



// Delete task
export async function deleteTask(taskId: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) throw error;
}
