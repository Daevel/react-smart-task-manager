import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasksByUser, createTask, updateTask, deleteTask, updateTaskStatus } from "@/api/tasks";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assigned_to?: string;
  created_by?: string;
}

interface TasksState {
  list: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  list: [],
  loading: false,
  error: null,
};

// 🔁 Thunks
export const fetchTasks = createAsyncThunk("tasks/fetch", async (userId: string) => {
  const data = await getTasksByUser(userId);
  return data;
});

export const addTask = createAsyncThunk("tasks/add", async (task: Omit<Task, "id">) => {
  const data = await createTask(task);
  return data;
});

export const editTask = createAsyncThunk(
  "tasks/edit",
  async ({ id, payload }: { id: string; payload: Partial<Task> }) => {
    const data = await updateTask(id, payload);
    return data;
  }
);

export const removeTask = createAsyncThunk("tasks/delete", async (id: string) => {
  await deleteTask(id);
  return id;
});

export const changeTaskStatus = createAsyncThunk(
  "tasks/status",
  async ({ id, status }: { id: string; status: string }) => {
    const data = await updateTaskStatus(id, status);
    return data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error loading tasks";
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        if (index >= 0) state.list[index] = action.payload;
      })

      .addCase(removeTask.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      })

      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        if (index >= 0) state.list[index] = action.payload;
      });
  },
});

export default tasksSlice.reducer;
