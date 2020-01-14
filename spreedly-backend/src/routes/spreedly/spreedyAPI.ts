import config from '../../config.json';

export const spreedlyAPI = require('spreedly-api')(
  config.SPREEDLY_USERNAME,
  config.SPREEDLY_PASSWORD
);

export const testGateWayToken = config.SPREEDLY_GATEWAY_TOKEN;
