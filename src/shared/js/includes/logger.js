'use strict';

import * as _ from 'lodash';

import * as api from '../../../../config/settings';
import * as helpers from './helpers';

const logLevel = helpers.helpers.getConfigVal('logger.level');

function checkLevel(target) {
  let allowed = {
    'info': ['info', 'warn', 'error'],
    'warn': ['warn', 'error'],
    'error': ['error']
  };

  return (_.get(allowed, logLevel, []).indexOf(target) >= 0)
    ? true
    : false;
}

module.exports = {
  info: (...msg) => {
    if (checkLevel('info')) {
      console.log(...msg);
    }
  },
  warn: (...msg) => {
    if (checkLevel('warn')) {
      console.warn(...msg);
    }
  },
  error: (...msg) => {
    if (checkLevel('error')) {
      console.error(...msg);
    }
  }
};
