import { getAllUsers, getUserById } from "../services/user.service.js";
import { errorCodes } from "../utils/errors/error.code.js";
import createHttpError from "http-errors";

export const getAllUsersController = async (req, res, next) => {
    try{
        const users = await getAllUsers();
        res.status(200).send(users);
    }catch(e){
        switch(e){
            case errorCodes.USER.FAILD_TO_GET_ALL_USERS:
                next(createHttpError(500, "Get all users error"));
                break;
            default:
                next(e);
        }
    }
}

export const getUserByIdController = async (req, res, next) => {
    try{
        const userId = req.user.id;
        const user = await getUserById(userId);

        res.status(200).send(user);
    }catch(e){
        switch(e){
            case errorCodes.USER.USER_FECH_FAIL:
                next(createHttpError(500, "Error al obtener el usuario"));
                break;
            case errorCodes.USER.USER_NOT_EXIST:
                next(createHttpError(404, "Usuario no encontrado"));    
                break;
            default:
                next(e);
        }
    }
}

export const getMeController = async (req, res, next) => {
    try{
        const user = req.user;
        res.status(200).send(user);
    }catch(e){
        next(createHttpError(500, "Error al obtener el usuario"));
    }
}