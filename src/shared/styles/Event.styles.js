import React from 'react';
import { Platform, AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc } from './Common.styles';

// TrainLine
export default StyleSheet.create({
  title: {
    fontSize: remCalc(1.5),
//    color: "red",
    color: "#8A8A8A",

    marginTop: remCalc(1.5),
    ...Platform.select({
      ios: {
        fontSize: remCalc(1.5),
        fontWeight: "300",
      },
      android: {
        fontSize: remCalc(1.5),
      },
      web: {
        fontSize: remCalc(2),
        fontWeight: "200",
      },
    })
  },
  date: {
    marginTop: remCalc(.5),
    textAlign: 'right',
    color: "#888888"
  },
  detailContainer: {
    borderTopWidth: 1,
    borderTopColor: "#DDDDDD",
    paddingTop: remCalc(.8)
  },
  detailMessage: {
    paddingLeft: remCalc(2),
    fontWeight: '300',
    color: "#8A8A8A",

    ...Platform.select({
     ios: {
       fontSize: remCalc(1.2),
       lineHeight: remCalc(1.6),
     },
     android: {

     },
     web: {
       fontSize: remCalc(1.5),
       lineHeight: remCalc(2.25),
     }
   })
  }
});
