'use strict';

const _ = require('lodash');

import * as api from '../../../../config/settings';

let helpers = ( () => {

  const env = getEnv();

  /**
   * Thanks Stack Overflow!
   */
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getConfigVal(path) {
    let val = _.get(api, env + '.' + path);
    if (!val) {
      val = _.get(api, 'default' + '.' + path);
    }
    return val;
  }

  function getEnv () {
    return (process)
      ? _.get(process, "env.NODE_ENV", 'dev')
      : 'dev';
  }

  function underscoreToCaps(str) {
    return (typeof str === 'string')
      ? str
        .split('_')
        .map( s => capitalizeFirstLetter(s) )
        .join(' ')
      : str;
  }

  return({
    getConfigVal: getConfigVal,
    getEnv: getEnv,
    underscoreToCaps: underscoreToCaps,
    capitalizeFirstLetter: capitalizeFirstLetter
  });
})()


module.exports = {
  helpers
};
