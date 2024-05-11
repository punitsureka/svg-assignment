import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { init } from '../utils/helpers.js';
import { create_room, fetch_single_game } from '../utils/validators.js';
import { fetchAllGameDetail, fetchSingleGameDetail, handleCreateGameRequest } from '../modules/game.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { data, errors } = init({ body: req.body, schema: create_room });
    if (errors.length) return res.status(StatusCodes.BAD_REQUEST).json(errors);
    const result = await handleCreateGameRequest(data);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: { ...req.body, game_id: null },
      error_message: `${err?.message}`,
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await fetchAllGameDetail();
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: [],
      error_message: `${err?.message}`,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { data, errors } = init({ body: req.params, schema: fetch_single_game });
    if (errors.length) return res.status(StatusCodes.BAD_REQUEST).json(errors);
    const result = await fetchSingleGameDetail(data);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: {
        ...req.params,
        name: null,
        url: null,
        published_date: null,
        author: null,
      },
      error_message: `${err?.message}`,
    });
  }
});


export default router;
