'use strict';

import * as _ from 'lodash';

import React from 'react';
import Boro from '../Boro';
import TrainLine from '../TrainLine';

export function	assembleBoros(boros, short, caps, styles) {
		return (boros && Array.isArray(boros))
			? boros.map( b => (
					<Boro
						key={_.uniqueId('boro-' + b)}
						boro={b}
						short={short}
						caps={caps}
            styles={styles}
            overrideStyle={true}/>
					))
				.reduce((prev, curr) => ((prev === null)
					? [curr]
					: [prev, ', ', curr]),
				null)
			: null;
	}

export function assembleLines(lines, affectedLines) {
	return (lines && lines.length > 0 && Array.isArray(lines))
		? lines
			.map( t => (isNaN(parseInt(t)))
				? t.toUpperCase()
				: parseInt(t) )
			.map( t => (
				<TrainLine
					key={_.uniqueId('train-' + t)}
					line={t}
					disabled={(affectedLines.indexOf(t) === -1)}/>
				))
		: null;
}
