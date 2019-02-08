'use strict';

import log from './includes/logger';

/**
 *
 * @TODO
 *
 *   Cleanup and test this file.
 *
 *
 */

// Config
const api = require('../../../config/settings');
const _ = require('lodash');

 const endpoint = 'subway/status';
// const endpoint = 'subway/status/archive/74'; // 43 (lcl/exp) // 15 (route change) 27 (d/f crazy route change) 74, 117

export default class MtaDelaysApi {
  constructor() {

  }

  getEnv = () => {
    return (process)
      ? _.get(process, "env.NODE_ENV", 'dev')
      : 'dev';
  }

  getEnvUrl = () => {

    let env = this.getEnv();

    let e = _.get(api, env);
    let url = _.get(e, 'protocol')
      + _.get(e, 'host')
      + ':'
      + _.get(e, 'port')
      + _.get(e, 'endpoint_prefix')
      + '/' + endpoint;

    return url;
  }

  getStatus = () => {

    let env = this.getEnv();
    let url = this.getEnvUrl();

    log.info(' ---- The environment is: [', env, '] ------');
    log.info(' ---- The environment API: [', url, '] ------');

    return fetch(url)
      .then(res => (_.get(res, 'status', 500) == 200)
        ? res : Promise.reject('Fetch had a non-200 response.'))
      .then(res => res.json() )
      .catch(err => Promise.reject(err));
  }
}
