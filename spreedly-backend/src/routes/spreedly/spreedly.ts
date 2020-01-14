import { Router } from 'express';
import config from '../../config.json';
import { SpreedlyAPI } from './spreedlyAPI';

const spreedlyAPI = new SpreedlyAPI(config);

const spreedlyRouter = Router();

spreedlyRouter.get('/', (req, res) => {
  return res.status(200).send('Spreedy route OK');
});

spreedlyRouter.post('/preauth', async (req, res) => {
  const { data: token } = req.body;
  try {
    const preauth = await spreedlyAPI.preauth(token, 100, 'USD');
    return res.status(200).send(preauth.data);
  } catch (e) {
    console.error(`Spreedly preauth error : ${e}`);
    return res.status(400).send(e);
  }
});

spreedlyRouter.post('/capture', async (req, res) => {
  const { data: token } = req.body;
  try {
    const capture = await spreedlyAPI.capture(token);
    return res.status(200).send(capture.data);
  } catch (e) {
    console.error(`Spreedly capture error : ${e}`);
    return res.status(400).send(e);
  }
});

spreedlyRouter.post('/refund', async (req, res) => {
  const { data: token } = req.body;
  try {
    const refund = await spreedlyAPI.fullRefund(token);
    return res.status(200).send(refund.data);
  } catch (e) {
    console.error(`Spreedly refund error : ${e}`);
    return res.status(400).send(e);
  }
});

export = spreedlyRouter;
