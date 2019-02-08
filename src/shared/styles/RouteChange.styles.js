import React from 'react';
import { Platform, AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc } from './Common.styles';

// TrainLine
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: "wrap",
//    backgroundColor: "#EEE",
    ...Platform.select({
      ios: {
        marginBottom: remCalc(.15)
      },
      android: {
        marginBottom: remCalc(.15)
      },
      web: {
        marginBottom: remCalc(.5)
      }
    })
  },
  flex1: {
    flex: 1
  },
  lineMessageContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexWrap: "wrap",
    flexDirection: 'row'
  },
  lineSegment: {
    borderLeftColor: "blue",
    borderLeftWidth: 2
  },
  lineMessage: {
//    flex: 1,
//    flexWrap: "wrap",
//    alignItems: "center",
//    backgroundColor: "#999999"
  },
  text: {
    lineHeight: remCalc(2),
//    backgroundColor: "red",
    alignItems: "center"
  },
  pre: {
    width: remCalc(2),
    color: "#8A8A8A",
    fontWeight: "200",
  }
});
