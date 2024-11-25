import Todo from "../models/todo.model.js";

export const createTodo = async (todo, opts) => {
  const newTodo = new Todo(todo);
  return await newTodo.save(opts);
};

export const getTodos = async () => {
  return await Todo.find();
};

export const getTodoById = async (id) => {
  return await Todo.findById(id);
};

export const getTodoByUserId = async (userId) => {
  return await Todo.find({ id_user: userId });
};

export const updateTodo = async (id, todo, opts) => {
  return await Todo.findByIdAndUpdate(id, todo, { new: true, opts });
};

export const deleteTodo = async (id, opts) => {
  return await Todo.findByIdAndDelete(id, {new: true, opts});
};

export const patchStateTodo = async (id, state) => {
  return await Todo.findByIdAndUpdate(id, { state }, { new: true });
};

export const findTodoByState = async (state) => {
  return await Todo.find({ state });
}

export const addPomodoro = async (id, pomodoro, opts) => {
  console.log(id, pomodoro);
  return await Todo.findByIdAndUpdate(id, { id_pomodoro: pomodoro }, { new: true, opts });
}

export const removePomodoro = async (id, opts) => {
  return await Todo.findByIdAndUpdate(id, { id_pomodoro: null }, { new: true, opts });
}