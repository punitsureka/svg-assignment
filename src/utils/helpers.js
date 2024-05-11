import _ from 'lodash';

export function init({ body, schema }) {
  const { value: data } = schema.validate(body, {
    abortEarly: false,
  });
  const { error } = schema.validate(body, { abortEarly: false });
  const errors = _.map(error?.details || [], (item) => ({
    error_message: item.message,
    data: _.get(body, item.path[0]),
    key: item.path[0],
    success: false,
  }));
  return { data, errors };
}
