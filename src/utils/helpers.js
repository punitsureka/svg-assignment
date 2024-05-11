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
  select_all_games: `SELECT id, name, url, published_date, author FROM game WHERE is_deleted = false;`,
  select_game_by_id: `SELECT id, name, url, published_date, author FROM game WHERE id = $1 and is_deleted = false;`,
  update_game_by_id: `
          UPDATE game SET name = $2, url = $3, published_date = $4, author = $5, updated_at = CURRENT_TIMESTAMP 
          WHERE id = $1 and is_deleted = false;
          `,
  delete_game_by_id: `UPDATE game SET is_deleted = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1 and is_deleted = false;`,
}