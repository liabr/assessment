import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { Todo } from '../types';

interface TodoFormProps {
  categories: string[];
  onSubmit: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ categories, onSubmit }) => {
  const [todo, setTodo] = useState<Omit<Todo, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    category: '',
    dueDate: '',
    completed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    setTodo({
      ...todo,
      [e.target.name as string]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (todo.title && todo.category && todo.dueDate) {
      onSubmit(todo);
      setTodo({
        title: '',
        description: '',
        category: '',
        dueDate: '',
        completed: false,
      });
    }
  };

  return (
    <Box bgcolor={"white"}>
      <TextField color='secondary'
        label="Title"
        name="title"
        value={todo.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField color='secondary'
        label="Description"
        name="description"
        value={todo.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="dense" color='secondary'>
        <InputLabel>Category</InputLabel>
        <Select name="category" value={todo.category} onChange={handleChange}>
          {categories.map((category, idx) => (
            <MenuItem key={idx} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        color='secondary'
        label="Due Date"
        type="date"
        name="dueDate"
        value={todo.dueDate}
        onChange={handleChange}
        fullWidth
        margin="normal"              
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Todo
      </Button>
    </Box>
  );
};

export default TodoForm;
