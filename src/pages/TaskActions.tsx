import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EllipsisVertical } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assigned_to?: string;
}

interface TaskActionsProps {
  task: Task;
  users?: { id: string; email: string }[]; // Optional list of users to assign
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string, assignedTo?: string) => void;
}

export function TaskActions({ task, users = [], onDelete, onEdit }: TaskActionsProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [assignedTo, setAssignedTo] = useState(task.assigned_to || "");

  const handleSave = async () => {
    await onEdit(task.id, editTitle, editDescription, assignedTo);
    setEditDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* Edit Task */}
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            Edit
          </DropdownMenuItem>
          {/* Delete Task */}
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Task Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete Task
            </DialogTitle>
          </DialogHeader>
          <p>
              Are you sure you want to delete "{task.title}"? This action cannot be undone.
            </p>
            <Button onClick={()=> onDelete(task.id)}>Save</Button>
        </DialogContent>
      </Dialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogTrigger />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Task title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <Textarea
              placeholder="Task description"
              value={editDescription}
              maxLength={500}
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <div className="text-right text-sm text-gray-500">
              {editDescription.length}/500
            </div>

            {/* Assign to user */}
            {users.length > 0 && (
              <Select value={assignedTo} onValueChange={setAssignedTo}>
                <SelectTrigger>
                  <SelectValue placeholder="Assign to" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
