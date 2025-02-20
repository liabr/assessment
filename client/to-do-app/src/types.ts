export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  dueDate: string;
  createdAt: string;
  category: string;
  title: string;
  description: string;
}
  
  export type FilterStatus = 'all' | 'active' | 'completed';
  export type SortOption = 'dueDate' | 'createdAt';
  