import { param } from "express-validator";

export const idParamValidator = [
    param('userId').notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('User ID must be a valid mongo id')
]