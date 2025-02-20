import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Box, Button, Typography, FormControl, InputLabel, Select, MenuItem, ThemeProvider, createTheme } from '@mui/material';
import { RootState } from './redux/store';
import { createTodo, updateTodo, deleteTodo, toggleTodoComplete } from './redux/toDoSlice';
import { Todo, FilterStatus, SortOption } from './types';
import TodoList from './component/ToDoList';
import TodoForm from './component/TodoForm';
import axios from 'axios'; // Import axios for making HTTP requests


const App: React.FC = () => {
  const dispatch = useDispatch();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<string[]>(['Work', 'Personal', 'Shopping']);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [sortOption, setSortOption] = useState<SortOption>('dueDate');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const handleCreateTodo = useCallback(async (newTodo: Omit<Todo, 'id' | 'createdAt'>) => {
    try {
      newTodo.text = newTodo.title;
      const response = await axios.post('http://localhost:5000/todos', newTodo); // Call the API

      if (response.status === 201) {
        setTodos((prevTodos) => [...prevTodos, response.data]); 
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  }, []);


  const handleUpdateTodo = useCallback(async (id: string, updatedTodo: Partial<Todo>) => {
    try {
      const response = await axios.put('http://localhost:5000/todos', updatedTodo); 
      if (response.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? { ...todo, ...response.data } : todo))
        ); 
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }, []);

  // Delete Todo
  const handleDeleteTodo = useCallback(async (id: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/${id}`); // Delete the todo by ID
      if (response.status === 200) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Remove the deleted todo from state
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }, []);

  const handleToggleComplete = useCallback((id: string) => {
    dispatch(toggleTodoComplete(id));
  }, [dispatch]);

  const handleAddCategory = (category: string) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  const getFilteredAndSortedTodos = () => {
    return todos
      .filter((todo) => {
        if (filterStatus === 'active') return !todo.completed;
        if (filterStatus === 'completed') return todo.completed;
        return true;
      })
      .filter((todo) => {
        if (selectedCategory) return todo.category === selectedCategory;
        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'dueDate') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ backgroundColor: '#f4f4f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Typography variant="h4">Todo App</Typography>
          <Button variant="contained" onClick={() => setSelectedCategory('')}>
            All Todos
          </Button>
          <Button variant="contained" onClick={toggleTheme}>
            Switch to {themeMode === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ flexGrow: 1 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px' }}>
              <Typography variant="h6">Categories</Typography>
              <Button variant="contained" onClick={() => handleAddCategory('New Category')}>Add Category</Button>
              <ul>
                {categories.map((category) => (
                  <li key={category}>
                    <Button onClick={() => setSelectedCategory(category)}>{category}</Button>
                  </li>
                ))}
              </ul>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <TodoForm categories={categories} onSubmit={handleCreateTodo} />
            <TodoList
              todos={getFilteredAndSortedTodos()}
              onToggleComplete={handleToggleComplete}
              onDeleteTodo={handleDeleteTodo}
              onUpdateTodo={handleUpdateTodo}
              selectedCategory={selectedCategory}
            />
          </Grid>
        </Grid>

        <Box sx={{ marginTop: '20px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px' }}>
          <FormControl fullWidth>
            <InputLabel>Filter</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              label="Filter"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ marginTop: '10px' }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              label="Sort By"
            >
              <MenuItem value="dueDate">Due Date</MenuItem>
              <MenuItem value="createdAt">Creation Date</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
