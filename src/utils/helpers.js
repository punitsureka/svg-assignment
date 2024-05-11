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

export const QUERIES = {
  insert_game: `          
          INSERT INTO game (name, url, published_date, author)
          VALUES ($1, $2, $3, $4)
          RETURNING id;
          `,
  select_all_games: `SELECT id, name, url, published_date, author FROM game;`,
  select_game_by_id: `SELECT id, name, url, published_date, author FROM game WHERE id = $1;`
}