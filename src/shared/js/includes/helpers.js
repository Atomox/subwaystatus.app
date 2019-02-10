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
    /**
     * __DEV__ should always be set to true in react native, unless building to prod.
     * @see
     * https://github.com/react-community/create-react-native-app/issues/57#issuecomment-416190454
     */
    return (__DEV__)
      ? 'dev'
      : 'production';
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
