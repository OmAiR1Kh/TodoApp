export interface Todo {
  id: string;
  description: string;
  title: string;
  isCompleted: boolean;
  completedDate: Date;
  createdDate: Date;
  estimatedTime: number;
  status: number;
  category: string;
  importance: number;
}
