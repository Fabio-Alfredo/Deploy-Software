import Pomodoro from "../models/pomodoro.model.js";

export const createPomodoro = async (pomodoro, opts) => {
  const newPomodoro = new Pomodoro(pomodoro);
  return await newPomodoro.save(opts);
};

export const getPomodoros = async () => {
  return await Pomodoro.find();
};

export const getPomodoroById = async (id) => {
  return await Pomodoro.findById(id);
};

export const getPomodoroByUser = async (id) => {
  return await Pomodoro.findOne({ id_user: id }).populate("id_todos");
};

export const updatePomodoro = async (id, pomodoro, opts) => {
  return await Pomodoro.findByIdAndUpdate(id, pomodoro, { new: true, opts });
};
export const deletePomodoro = async (id) => {
  return await Pomodoro.findByIdAndDelete(id);
};

export const addTodo = async (id, todo, opts) => {
  return await Pomodoro.findByIdAndUpdate(
    id,
    { $addToSet: { id_todos: todo } },
    { new: true, opts }
  );
};

export const removeTodo = async (id, todo, opts) => {
  return await Pomodoro.findByIdAndUpdate(
    id,
    { $pull: { id_todos: todo } },
    { new: true, opts }
  );
};

export const patchPomodoroStanteAndTime = async (id, state, time, opts) => {
  return await Pomodoro.findByIdAndUpdate(
    id,
    { state, time },
    { new: true, opts }
  );
};
