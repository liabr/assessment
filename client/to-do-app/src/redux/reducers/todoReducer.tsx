const initialState = {
  todos: [],
};

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

interface AddTodoAction {
  type: 'ADD_TODO';
  payload: Todo;
}

type TodoAction = AddTodoAction; // Add other action types as needed

const todoReducer = (state: TodoState = initialState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    // ...other cases
    default:
      return state;
  }
};

export default todoReducer;