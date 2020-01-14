import { Router } from 'express';
import config from '../../config.json';
// const axios = require('axios').default;
import axios from 'axios';

const spreedlyRouter = Router();

import { spreedlyAPI, testGateWayToken } from './spreedyAPI';

spreedlyRouter.get('/', (req, res) => {
  return res.status(200).send('Spreedy route OK');
});

spreedlyRouter.post('/preauth', async (req, res) => {
  const { data: token } = req.body;
  try {
    const preauth = await spreedlyAPI.authorize.create(testGateWayToken, {
      transaction: {
        payment_method_token: token,
        amount: 100,
        currency_code: 'USD'
      }
    });
    return res.status(200).send(preauth);
  } catch (e) {
    console.error(`Spreedly preauth error : ${JSON.stringify(e)}`);
    return res.status(400).send(e);
  }
});

spreedlyRouter.post('/capture', async (req, res) => {
  const { data: token } = req.body;
  try {
    const capture = await spreedlyAPI.capture.fullAmount(token);
    return res.status(200).send(capture);
  } catch (e) {
    console.error(`Spreedly capture error : ${JSON.stringify(e)}`);
    return res.status(400).send(e);
  }
});

spreedlyRouter.post('/refund', async (req, res) => {
  const { data: token } = req.body;
  const refundUrl = `https://core.spreedly.com/v1/transactions/${token}/credit.json`;
  try {
    const response = await axios.post(
      refundUrl,
      {},
      {
        auth: {
          username: config.SPREEDLY_USERNAME,
          password: config.SPREEDLY_PASSWORD
        }
      }
    );
    return res.status(200).send(response.data);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e.message);
  }
});

export = spreedlyRouter;
