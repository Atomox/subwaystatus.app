import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc, colorPalette } from './Common.styles';

// Grid
export default StyleSheet.create({
  row: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  col: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "column",
  },
  rowCell: {
    paddingLeft: remCalc(.5),
    paddingRight: remCalc(.5)
  },
  row2: {
    width: remCalc(3)
  },
  row3: {
    width: remCalc(4.5)
  },
  row4: {
    width: remCalc(6)
  }
});
