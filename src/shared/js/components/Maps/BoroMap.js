import * as _ from 'lodash';

import React from 'react';
import { View, Text } from 'react-native';
import Svg,{
    G,
    TSpan,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask
} from 'react-native-svg';

import PathManhattan from './PathManhattan';
import PathQueens from './PathQueens';
import PathBronx from './PathBronx';
import PathBrooklyn from './PathBrooklyn';
import PathStatenIsland from './PathStatenIsland';

import mStyles from '../../../styles/Map.styles';

const BoroMap = function(props) {

  function getStyle(boro) {
    let key = _.get(props, boro, 0);
    if (key > 5) { key = 5; }
    if (key < 0) { key = 0; }

    return {
      fill: mStyles['severity' + key].fill
    };
  }

  let manhattan = {
    style: getStyle('manhattan'),
    position: {
      x: 19,
      y: 114
    }
  };
  let queens = {
    style: getStyle('queens'),
    position: {
      x: 101,
      y: 156
    }
  };
  let bronx = {
    style: getStyle('bronx'),
    position: {
      x: 10,
      y: 0
    }
  };
  let brooklyn = {
    style: getStyle('brooklyn'),
    position: {
      x: 81,
      y: 381
    }
  };
  let statenIsland = {
    style: getStyle('statenIsland'),
    position: {
      x: -140,
      y: 650
    }
  };
  let viewOffset = 140;

  return (
    <View>
      { /* Viewport should start 30 units from the left, since SI's object justs out past the left edge. */ }
      <Svg height="400" width="350" viewBox="30 0 350 768" border="1">

        <G id="symbol_manhattan"
          fill={ manhattan.style.fill }
          x={ manhattan.position.x}
          y={ manhattan.position.y}>
          { PathManhattan }
        </G>
        <G id="symbol_queens"
          fill={ queens.style.fill }
          x={ queens.position.x }
          y={ queens.position.y}>
          { PathQueens }
        </G>
        <G id="symbol_bronx"
          fill={ bronx.style.fill }
          x={ bronx.position.x }
          y={ bronx.position.y }>
          { PathBronx }
        </G>

        <G id="symbol_brooklyn"
          fill={ brooklyn.style.fill }
          x={ brooklyn.position.x }
          y={ brooklyn.position.y }>
          { PathBrooklyn }
        </G>

        <Defs>
          <ClipPath id="siClip">
            { /* Clip SI 30 units from the left of the object. */}
            <Rect x="30" y="0" width="300" height="200" />
          </ClipPath>
        </Defs>

        <G id="symbol_staten_island"

          clipPath="url(#siClip)"
          fill={ statenIsland.style.fill }
          x={ statenIsland.position.x }
          y={ statenIsland.position.y }>

          { PathStatenIsland }
        </G>

      </Svg>
    </View>
  );
};

export default BoroMap;
