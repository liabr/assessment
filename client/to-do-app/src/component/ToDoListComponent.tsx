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

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDeleteTodo, onUpdateTodo, selectedCategory }) => {
  return (
    <Box>
      {todos
        .filter(todo => !selectedCategory || todo.category === selectedCategory)
        .map(todo => (
            <Box key={todo.id} sx={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <Typography variant="h6">Title: {todo.title}</Typography>
            <Typography>Description: {todo.description}</Typography>
            <Typography><strong>Category:</strong> {todo.category}</Typography>
            <Typography><strong>Due Date:</strong> {todo.dueDate}</Typography>
            <Checkbox
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
              aria-label='Completed'
            />
            <Button onClick={() => onDeleteTodo(todo.id)}>Delete</Button>
            <Button onClick={() => onUpdateTodo(todo.id, { title: 'Updated Title', description: 'Updated Description' })}>Update</Button>
            </Box>
        ))}
    </Box>
  );
};

export default TodoList;
