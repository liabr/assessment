import React, { useState } from "react";
import {
  Container,
  Grid,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Todo, FilterStatus, SortOption } from "./types";
import TodoList from "./component/ToDoList";
import TodoForm from "./component/TodoForm";
import { v4 as uuidv4 } from "uuid";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<string[]>([
    "Work",
    "Personal",
    "Shopping",
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [sortOption, setSortOption] = useState<SortOption>("dueDate");

  const handleCreateTodo = (newTodo: Omit<Todo, "id" | "createdAt">) => {
    setTodos([
      ...todos,
      { ...newTodo, id: uuidv4(), createdAt: new Date().toISOString() },
    ]);
  };

  const handleUpdateTodo = (id: string, updatedTodo: Partial<Todo>) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleAddCategory = (category: string) => {
    setCategories([...categories, category]);
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filterStatus === "all") return true;
      if (filterStatus === "active") return !todo.completed;
      if (filterStatus === "completed") return todo.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortOption === "dueDate")
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "12px",
          }}
        >
          <Typography variant="h4">Todo Category </Typography>
          <Button variant="contained" onClick={() => setSelectedCategory("")}>
            All
          </Button>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <Box color={"white"} bgcolor={""} p={2}>
              <Typography variant="h6">Categories</Typography>
              <Button
                variant="contained"
                onClick={() => handleAddCategory("New Category")}
              >
                Add Category
              </Button>
              <ul>
                {categories.map((category) => (
                  <li key={category}>
                    <Button onClick={() => setSelectedCategory(category)}>
                      {category}
                    </Button>
                  </li>
                ))}
              </ul>
            </Box>
          </Grid>

          <Grid item xs={60} md={8} fullWidth fullHeight>
            <TodoForm categories={categories} onSubmit={handleCreateTodo} />
            <TodoList
              todos={filteredTodos}
              onToggleComplete={handleToggleComplete}
              onDeleteTodo={handleDeleteTodo}
              onUpdateTodo={handleUpdateTodo}
              selectedCategory={selectedCategory}
            />
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "20px" }}  bgcolor={"white"}>
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

          <FormControl fullWidth sx={{ marginTop: "10px" }}>
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
  );
};

export default App;
