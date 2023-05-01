import { validationResult } from "express-validator";

export const validateEmail = (req, res) => {
    // const email =  
};

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    //verifica que el email tenga errores
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    next();
};