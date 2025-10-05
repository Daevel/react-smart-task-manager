import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import {
  fetchTasks,
  editTask,
  removeTask,
  changeTaskStatus,
} from "@/store/tasksSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ThemeToggle } from "@/components/theme-toggle";
import { TaskActions } from "./dialogs/TaskActions";
import { CreateNewTask } from "./dialogs/CreateNewTask";
import { useAuth } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useAuth();

  const {
    list: tasks,
    loading,
    error,
  } = useSelector((state: RootState) => state.tasks);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalTasks = tasks.length;
  const totalPages = Math.ceil(totalTasks / rowsPerPage);

  // Reset page if rows per page changes or data shrinks
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Compute the current page’s slice
  const paginatedTasks = tasks.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    if (user?.id) dispatch(fetchTasks(user.id));
  }, [user, dispatch]);

  const handleEditTask = async (
    id: string,
    title: string,
    description: string,
    assignedTo?: string
  ) => {
    await dispatch(
      editTask({ id, payload: { title, description, assigned_to: assignedTo } })
    );
  };

  const handleDelete = async (taskId: string) => {
    await dispatch(removeTask(taskId));
  };

  const handleStatusChange = async (taskId: string, status: string) => {
    await dispatch(changeTaskStatus({ id: taskId, status }));
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Welcome,{" "}
          <span className="text-primary">{user?.email ?? "Guest"}</span>
        </h1>

        {/* Actions */}
        <div className="
        sm:flex
        sm:flex-col 
        sm:items-start
        lg:flex
        lg:gap-2
        lg:items-center 
        lg:flex-row 
        "
        >
          <ThemeToggle />
          <CreateNewTask />
        </div>
      </div>

      {/* Error */}
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error loading tasks</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Table */}
      <Card className="overflow-x-auto">
        <div className="min-w-[600px]">
          <Table>
            <TableCaption>A list of all your tasks.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-64" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-16" />
                    </TableCell>
                  </TableRow>
                ))
              ) : tasks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No tasks assigned yet.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {task.description}
                    </TableCell>
                    <TableCell>
                      <Select
                        defaultValue={task.status}
                        onValueChange={(value) =>
                          handleStatusChange(task.id, value)
                        }
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">Todo</SelectItem>
                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TaskActions
                        task={task}
                        onDelete={handleDelete}
                        onEdit={handleEditTask}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-border mt-2">
          {/* Rows per page selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Page navigation */}
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage >= totalPages || totalPages === 0}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
