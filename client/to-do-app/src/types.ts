export interface Todo {
    id: string;
    title: string;
    description: string;
    category: string;
    dueDate: string;
    completed: boolean;
    createdAt: string;
  }
  
  export type FilterStatus = 'all' | 'active' | 'completed';
  export type SortOption = 'dueDate' | 'createdAt';
  