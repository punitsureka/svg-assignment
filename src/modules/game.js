import client from '../libs/pg-connector.js';
import _ from 'lodash';
import { QUERIES } from '../utils/helpers.js';

export async function handleCreateGameRequest(game) {
  try {
    const game_details = await client.query(
      {
        name: 'insert_game',
        text: QUERIES.insert_game,
        values: [game.name, game.url, game.published_date, game.author ],
      }
      )
    console.log(game_details);
    return {
      success: true,
      data: {
        game_id: _.get(game_details, 'rows[0].id'),
        ...game,
      },
      error_message: null,
    };
  } finally {
    await client.end();
  }
}

export async function fetchAllGameDetail(){
  try {
    const game_details = await client.query(
      {
        name: 'select_all_games',
        text: QUERIES.select_all_games,
      }
      );
    return {
      success: true,
      data: game_details.rows,
      error_message: null,
    };
  } finally {
    await client.end();
  }
}

export async function fetchSingleGameDetail({ id }){
  try {
    const game_details = await client.query(
      {
        name: 'select_game_by_id',
        text: QUERIES.select_game_by_id,
        values: [id],
      }
      );
    if(game_details.rowCount === 0) throw new Error('Game not found');
    return {
      success: true,
      data: game_details.rows[0],
      error_message: null,
    };
  } finally {
    await client.end();
  }
}