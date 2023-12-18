import React, { createContext, useContext } from 'react';
import { createTodoStore, ITodoStore } from '../stores/store';
import { useLocalObservable } from 'mobx-react';
import { observer } from 'mobx-react-lite';

interface ITodoProvider {
  children?: React.ReactNode;
}

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <TodoProvider>.');
};

const initialContext: ITodoStore = {
  todoList: [],
  addTodo: stub,
  complete: stub,
  incomplete: stub,
  delete: stub,
  edit: stub,
  updateTodoList: stub,
};

const TodoContext = createContext<ITodoStore>(initialContext);

export const TodoProvider = observer(({ children }: ITodoProvider) => {
  const todoStore = useLocalObservable(createTodoStore);

  return <TodoContext.Provider value={todoStore}>{children}</TodoContext.Provider>;
});

export const useTodoStore = () => useContext(TodoContext);
