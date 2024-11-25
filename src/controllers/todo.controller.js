import createHttpError from "http-errors";
import * as TodoService from "../services/todo.service.js";
import { addTodoUser } from "../services/user.service.js";
import { errorCodes } from "../utils/errors/error.code.js";

export const createTodo = async (req, res, next) => {
  try {
    const todo = req.body;
    todo.id_user = req.user.id;

    const newTodo = await TodoService.createTodo(todo);

    res.status(201).send(newTodo);
  } catch (e) {
    next(createHttpError(500, "Error al crear el todo"));
  }
};

export const getTodoById = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const todo = await TodoService.getTodoById(todoId);
    res.status(200).send(todo);
  } catch (e) {
    switch (e.code) {
      case errorCodes.TODO.TODO_NOT_FOUND:
        next(createHttpError(404, "Todo not found"));
        break;
      case errorCodes.TODO.TODO_FECH_FAIL:
        next(createHttpError(500, "Get todo error"));
        break;
      default:
        next(e);
    }
  }
};

export const getTodosByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todos = await TodoService.getTodosByUserId(userId);
    res.status(200).send(todos);
  } catch (e) {
    next(createHttpError(500, "Error al obtener las to do's"));
  }
};

export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await TodoService.getAllTodos();
    res.status(200).send(todos);
  } catch (e) {
    next(createHttpError(500, "Get all todos error"));
  }
};

export const patchTodoController = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    const data = req.body;
    const todo = await TodoService.patchTodo(todoId, data);
    res.status(200).send(todo);
  } catch (e) {
    switch (e.code) {
      case errorCodes.TODO.TODO_NOT_FOUND:
        next(createHttpError(404, "To do no encontrado"));
        break;
      case errorCodes.TODO.FAILD_TO_UPDATE_TODO:
        next(createHttpError(500, "Error al actualizar el to do"));
        break;
      case errorCodes.TODO.INVALID_TODO_STATE:
        next(createHttpError(400, "Estado de to do inválido"));
        break;
      default:
        next(e);
    }
  }
};

export const deleteTodoController = async (req, res, next) => {
  try {
    const todoId = req.params.id;
    await TodoService.deleteTodo(todoId);

    res.status(200).send({ message: "To do eliminado" });
  } catch (e) {
    switch (e.code) {
      case errorCodes.TODO.TODO_NOT_FOUND:
        next(createHttpError(404, "Todo not found"));
        break;
      default:
        next(e);
    }
  }
};

export const getTodoByStateController = async (req, res, next) => {
  try {
    const state = req.params.state;
    const todos = await TodoService.getTodoByState(state);
    res.status(200).send(todos);
  } catch (e) {
    next(createHttpError(500, "Get todo by state error"));
  }
};
