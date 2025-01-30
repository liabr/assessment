import React from 'react';
import { Box, Typography, Button, Checkbox } from '@mui/material';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, updatedTodo: Partial<Todo>) => void;
  selectedCategory: string;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDeleteTodo, selectedCategory }) => {
  function onUpdateTodo(id: string, arg1: { title: string; description: string; category: string; dueDate: string; completed: boolean; }): void {
    throw new Error('Function not implemented.');
  }

  return (
    <Box sx={{ width: '150%' }} bgcolor={"primary"}>
      {todos
        .filter(todo => !selectedCategory || todo.category === selectedCategory)
        .map(todo => (
          <Box key={todo.id} sx={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <Typography variant="h6">{todo.title}</Typography>
            <Typography>{todo.description}</Typography>
            <Typography><strong>Category:</strong> {todo.category}</Typography>
            <Typography><strong>Due Date:</strong> {todo.dueDate}</Typography>
            <Checkbox
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
              inputProps={{ 'aria-label': 'Mark Todo as completed' }}
            />
            <Button onClick={() => onDeleteTodo(todo.id)}>Delete</Button>
            <Button onClick={() => onUpdateTodo(todo.id, { title: todo.title, description: todo.description, category: todo.category, dueDate: todo.dueDate, completed: todo.completed })}>Update</Button>
          </Box>
        ))}
    </Box>
  );
};

export default TodoList;
