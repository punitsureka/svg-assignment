import Joi from 'joi';

export const insert_body_validator = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
  author: Joi.string().required(),
  published_date: Joi.date().iso().required().raw(),
});

export const param_validator = Joi.object({
  id: Joi.number().required(),
});
