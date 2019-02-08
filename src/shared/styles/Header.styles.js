import React from 'react';
import { Platform, AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc } from './Common.styles';


export default StyleSheet.create({
  logoContainer: {

  },
  logoH1: {
    fontSize: remCalc(2.5),
    fontWeight: "400",
    color: "#777"
  },
  logoH1Thin: {
    fontSize: remCalc(2.5),
    color: "#999",
    fontWeight: "300"
  },
  logoH2: {
    fontSize: remCalc(1.5),
    color: "#999",
    marginTop: remCalc(-0.25),
    fontWeight: "300"
  },
  dateContainer: {
    marginBottom: remCalc(3),
    marginRight: remCalc(1),
    ...Platform.select({
      ios: {
        marginBottom: remCalc(1)
      },
      android: {
        marginBottom: remCalc(1)
      },
      web: {
        marginBottom: remCalc(3)
      },
    })
  },
  dateBase: {
    textAlign: "right"
  },
  date: {
    fontSize: remCalc(3),
//    color: "red",
//    color: "#8A8A8A",

    ...Platform.select({
      ios: {
        fontSize: remCalc(1.1),
        fontWeight: "500",
      },
      android: {
        fontSize: remCalc(1.1),
      },
      web: {
        fontSize: remCalc(1.1),
        fontWeight: "500",
      },
    })
  },
  time: {
    fontSize: remCalc(2.2),
    lineHeight: remCalc(2.2),
//    color: "red",
//    color: "#8A8A8A",

    ...Platform.select({
      ios: {
        fontSize: remCalc(2.2),
        fontWeight: "500",
      },
      android: {
        fontSize: remCalc(2.2),
        fontWeight: "500",
      },
      web: {
        fontSize: remCalc(2.2),
        fontWeight: "500",
      },
    })
  },
  releaseName: {
    fontSize: remCalc(1),
    lineHeight: remCalc(1),
    marginBottom: remCalc(1),
    color: "#c8c8c8",

    ...Platform.select({
      ios: {
        fontSize: remCalc(1),
        color: "#b8b8b8"
      },
      android: {
        fontSize: remCalc(1)
      },
      web: {
        fontSize: remCalc(1)
      },
    })
  }
});
