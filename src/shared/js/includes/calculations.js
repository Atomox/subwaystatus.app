'use strict';

import * as _ from 'lodash';

import log from '../includes/logger';
import { mtaSubway as mta } from './mta.subway';

/**
 * Given a boro incident count object, determine the final severity level.
 * We use this for styling the summary to reflect boro severity status.
 *
 * @param {object} boro_data
 *   A generated object for each boro, with the highest severity,
 *   and the count of incidents at each level of severity.
 *
 * @return {object}
 *    An object with keys for each boro, and a single number representing
 *    the severity of delays in that boro.
 */
export function determineSeverity(boro_data) {

	let results = {};

	Object.keys(boro_data).map( d => {
		let level = boro_data[d].highest;
			results[d] = (boro_data[d].severity[level] > 2)
				? ((level * 2) - 1)
				: (level * 2);
	});

	return results;
}

export function prepareEventSummary(events) {

  let lines = {};
  let line_boros = {};
  let lines_affected = [];
  let boro_count = {
    Mn: {
      highest: 5,
      severity: [],
      lines_affected: []
    },
    Qs: {
      highest: 5,
      severity: [],
      lines_affected: []
    },
    Bk: {
      highest: 5,
      severity: [],
      lines_affected: []
    },
    Bx: {
      highest: 5,
      severity: [],
      lines_affected: []
    },
    SI: {
      highest: 5,
      severity: [],
      lines_affected: []
    },
  };

  Object.keys(events).map(key => {
      let e = events[key];

      if (!e.detail.type_detail || !e.detail.type_detail[0]) {
        return;
      }
      else if (!e.line) {
        return;
      }
      else if (!e.detail.boros) {
        log.warn('<!> Event has no boro.');
      }

      // Determine Message
      let msg = {
        lines: [],
        keyword: [],
        boro: [],
      };
      let line_grp = {};

      // Detail of event.
      msg.keyword.push(e.detail.type);

      // Determine affected lines, add them, and add affected boros for each line.
      e.line.map( l => {
        let key = mta.getLineGroup(l.line);
        let my_line = mta.getlineById(l.line);

        if (!line_grp[key]) {
          line_grp[key] = msg;
        }

        // Push a line to the message list, but only once.
        if (line_grp[key].lines.indexOf(my_line) !== -1) { return; }
        line_grp[key].lines.push(my_line);
        if (lines_affected.indexOf(my_line) === -1) {
          lines_affected.push(my_line);
        }

        if (!line_boros[key]) {
          line_boros[key] = [];
        }

        // Boros, if available.
        if (!e.detail.boros[l.line]) { return; }
        e.detail.boros[l.line].map( b => line_grp[key].boro.push(b));
        line_grp[key].boro = _.uniq(line_grp[key].boro);
        line_boros[key] = _.union(line_grp[key].boro, line_boros[key]);

        // Tally Boro Event Severity.
        let severity = (e.detail.type && e.detail.type.weight)
          ? e.detail.type.weight : 2;

        line_boros[key].map(b => {
          boro_count[b].highest = (severity <= boro_count[b].highest)
            ? severity : boro_count[b].highest;
          if (!boro_count[b].severity[severity]) {
            boro_count[b].severity[severity] = 0;
          }
          boro_count[b].severity[severity] ++;

          boro_count[b].lines_affected.push(l.line);
          boro_count[b].lines_affected = _.uniq(boro_count[b].lines_affected);
        });
      });

      Object.keys(line_grp).map( i => {
        if (!lines[i]) { lines[i] = []; }
        lines[i].push(line_grp[i]);
      });
  });

  return {
    lines: lines,
    line_boros: line_boros,
    lines_affected: lines_affected,
    boro_count: boro_count
  }
}
