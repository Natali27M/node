import { Joi, Segments } from 'celebrate';

import { commonValidator } from '../common/commonValidator';

export const authValidator = {
    login: {
        [Segments.BODY]: Joi.object({
            email: commonValidator.emailValidator,
            password: Joi.string().required().min(8),
        }),
    },
};
