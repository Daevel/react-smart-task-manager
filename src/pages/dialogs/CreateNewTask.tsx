import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { addTask } from "@/store/tasksSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { useAuth } from "@/context/AuthContext";

export function CreateNewTask() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const [createTaskDialogOpen, setCreateTaskDialogOpen] = useState(false);

  const taskSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),
  });

  type TaskFormValues = z.infer<typeof taskSchema>;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    if (!user) return;

    await dispatch(
      addTask({
        title: data.title,
        description: data.description,
        created_by: user.id,
        assigned_to: user.id,
      })
    );

    setCreateTaskDialogOpen(false);
    form.reset();
  };

  return (
    <Dialog open={createTaskDialogOpen} onOpenChange={setCreateTaskDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">+ New Task</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Task description"
                      {...field}
                      maxLength={500}
                    />
                  </FormControl>
                  <div className="text-right text-xs text-muted-foreground">
                    {field.value?.length || 0}/500
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
