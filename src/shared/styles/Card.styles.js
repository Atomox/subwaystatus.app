import React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';

import { remCalc, emCalc, colorPalette } from './Common.styles';

const cardHeaderHeight = remCalc(1);

// Card
export default StyleSheet.create({
  cardDefault: {
    borderColor: '#8A8A8A',
    borderWidth: 1,
    margin: remCalc(.5),
  	borderBottomLeftRadius: remCalc(.5),
  	borderBottomRightRadius: remCalc(.5)
  },
  cardLineHeader: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: cardHeaderHeight
  },
  cardLineHeaderTxt: {
    flex: 1,
  },
  cardHeaderRight: {
    flexDirection: 'column',
    flex: 1,
    marginTop: cardHeaderHeight,
    marginRight: remCalc(1)
  },
  cardTitle: {
    fontSize: remCalc(1.2) // 1.2rem
  },
  cardSubTitle: {
    fontSize: remCalc(1.4)
  },
  subtitleRow: {
    display: 'flex',
    flexDirection:'row',
  },
  cardTitleH3: {
    color: '#999',
  	textAlign: 'right'
  },
  cardSubtitleStrong: {
  	color: '#9B9B9B',
    textAlign: 'right',
    alignSelf: 'flex-end', // For iOS/ Android
  },
  ribbonEmpty: {
    width: remCalc(3),
  },
  ribbon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: remCalc(3),
    borderTopWidth: remCalc(3),
    borderRightColor: 'transparent',
    borderTopColor: colorPalette.unplanned
  },
  ribbonText: {

  },
  cardSection: {
    padding: remCalc(1)
  },
  unplannedIncidentTitle: {
  	backgroundColor: '#ffe2e2'
  },
  divider: {
    padding: remCalc(.35)
  },
  dividerBadColor: {
    color: colorPalette.unplanned,
  },
  dividerBadBackground: {
  	backgroundColor: colorPalette.unplanned
  },
  dividerCautionBackground: {
  	backgroundColor: colorPalette.planned
  }
});
