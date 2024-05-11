import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { init } from '../utils/helpers.js';
import { create_room } from '../utils/validators.js';
import { handleCreateGameRequest } from '@/src/modules/game.js';

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
      data: { ...req.body, game_id: null },
      error_message: `${err?.message}`,
      success: false,
    });
  }
});

export default router;
