import Joi from 'joi';

export const create_room = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
  author: Joi.string().required(),
  published_date: Joi.date().iso().required().raw(),
});
