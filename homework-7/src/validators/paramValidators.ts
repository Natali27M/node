import * as Joi from 'joi';

export const paramValidators = {
    id: Joi.object({
        id: Joi
            .number()
            .required(),
    }),
};
