import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import config from './config.json';
import routes from './routes/index';

const PORT = config.PORT;
const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use('/', routes);

app.get('/', (req, res) => {
  return res.status(200).send(`Spreedy-API is up`);
});

app.listen(PORT, () => {
  console.log(`App running on port : ${PORT}`);
});
