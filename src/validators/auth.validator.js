import { body } from "express-validator";

export const registerValidator = [
    body('name').notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({min: 4}).withMessage('Name must be at least 5 characters'),

    body('email').notEmpty().withMessage('Email is required')
    .isString().withMessage('Email must be a string')
    .isEmail().withMessage('Email must be a valid email address')
    .normalizeEmail(),

    body('password').notEmpty().withMessage('Password is required')
    .isLength({min: 8}).withMessage('Password must be at least 8 characters')
    
]

export const  loginValidator = [
    body('email').notEmpty().withMessage('Email is required')
    .isString().withMessage('Email must be a string')
    .isEmail().withMessage('Email must be a valid email address')
    .normalizeEmail(),   
]
