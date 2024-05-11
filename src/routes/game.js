import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { init } from '../utils/helpers.js';
import { insert_body_validator, param_validator } from '../utils/validators.js';
import {
  deleteGameDetails,
  fetchAllGameDetail,
  fetchSingleGameDetail,
  handleCreateGameRequest,
  updateGameDetails,
} from '../modules/game.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { data, errors } = init({ body: req.body, schema: insert_body_validator });
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
    const { data, errors } = init({ body: req.params, schema: param_validator });
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

router.put('/:id', async (req, res) => {
  try {
    const { data: game_identifier, errors: param_errors } = init({ body: req.params, schema: param_validator });
    const { data: update_details, errors: body_errors } = init({ body: req.body, schema: insert_body_validator });
    if(param_errors?.length || body_errors?.length) return res.status(StatusCodes.BAD_REQUEST).json(param_errors || body_errors);
    const result = await updateGameDetails({ update_details, game_identifier });
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: { game_id: req.params.id, ...req.body},
      error_message: `${err?.message}`,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { data, errors } = init({ body: req.params, schema: param_validator });
    if (errors.length) return res.status(StatusCodes.BAD_REQUEST).json(errors);
    const result = await deleteGameDetails(data);
    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      data: { game_id: req.params.id },
      error_message: `${err?.message}`,
    });
  }
});


export default router;
