import { Todo } from "../../types";

export const addTodo = (todo: Todo) => ({
  type: 'ADD_TODO',
  payload: todo,
});