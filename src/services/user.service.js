import { ServiceError } from "../errors/servise.error.js";
import { errorCodes } from "../utils/errors/error.code.js";
import * as userReposiry from "../repositories/user.repository.js";

export const getUserById = async (userId) => {
  try {
    const user = await userReposiry.findUserById(userId);
    if (!user) throw new Error(errorCodes.USER.USER_NOT_EXIST);

    return user;
  } catch (e) {
    throw new ServiceError(
      "Get user error",
      e.code || errorCodes.USER.USER_FECH_FAIL
    );
  }
};

export const getAllUsers = async () => {
    try{
        const users = await userReposiry.findAllUsers();
        return users;
    }catch(e){
        throw new ServiceError(
            "Get all users error",
            e.code || errorCodes.USER.FAILD_TO_GET_ALL_USERS
        );
    }
};

export const existUserByEmail = async (email) => {
    try{
        const user = await userReposiry.findUserByEmail(email);
        return user;
    }catch(e){
        throw new ServiceError(
            "Find user by email error",
            e.code || errorCodes.USER.USER_FECH_FAIL
        );
    }
}

export const updateUser =async(userId, data)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const opts = {session};
        const user = await userReposiry.updateUser(userId, data, opts);
        if(!user) throw new Error(errorCodes.USER.USER_NOT_FOUND);

        await session.commitTransaction();
        return user;
    }catch(e){
        await session.abortTransaction
        throw new ServiceError(
            "Update user error",
            e.code || errorCodes.USER.FAILD_TO_UPDATE_USER
        );
    }finally{
        await session.endSession();
    }
}

export const deleteUser = async (userId)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const opts = {session};
        const user = await userReposiry.deleteUser(userId, opts);
        if(!user) throw new Error(errorCodes.USER.USER_NOT_FOUND);

        await session.commitTransaction();
        return user;
    }catch(e){
        await session.abortTransaction();
        throw new ServiceError(
            "Delete user error",
            e.code || errorCodes.USER.FAILD_TO_DELETE_USER
        );
    }finally{
        await session.endSession();
    }
}

export const addTodoUser = async (userId, todoId, opts)=>{
    try{
        const user = await userReposiry.addTodo(userId, todoId, opts);
        return user;
    }catch(e){
        throw new ServiceError(
            "Add todo to user error",
            e.code || errorCodes.USER.FAILD_TO_ADD_TODO
        );
    }
}

export const addPomodoroUser = async (userId, pomodoroId, opts)=>{
    try{
        const user = await userReposiry.addPomodoro(userId, pomodoroId, opts);

        return user;
    }catch(e){
        throw new ServiceError(
            "Add pomodoro to user error",
            e.code || errorCodes.USER.FAILD_TO_ADD_POMODORO
        );
    }
}

export const getTokenUser = async (userId)=>{
    try{
        const exisUser = await userReposiry.findUserById(userId);
        if(!exisUser) throw new Error(errorCodes.USER.USER_NOT_FOUND);

        const token = await userReposiry.getToken(exisUser._id);
        return token;
    }catch(e){
        throw new ServiceError(
            "Get token error",
            e.code || errorCodes.USER.FAILD_TO_GET_TOKEN
        );
    }
}