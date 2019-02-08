import React from 'react';
import { Platform, AppRegistry, StyleSheet } from 'react-native';

export const baseSize = () => {
  // Web + default.
  let basesize = 12;

  // iPad
  if (Platform.OS === 'ios' && Platform.isPad) {
    console.log('I am an iPad.');
    basesize = 10;
  }
  // iPhone or Android Phone.
  else if (Platform.OS !== 'web') {
    console.log('I am a phone.');
    basesize = 14;
  }

  return basesize;
};

export const colorPalette = {
    unplanned: '#FF7272',
    planned: 'orange',
    minor: '#999'
};

const baseFontSize = baseSize();
const baseFont = "Helvetica Neue, Helvetica, Roboto, Arial, sans-serif";

// Calculate a relative size, like REMs, for react-native use.
export const remCalc = (rem) => {
  return Math.ceil(rem * baseFontSize);
}

export const emCalc = (base, em) => {
  return Math.ceil(em * base);
}

// Card
export default StyleSheet.create({
  strong: {
    fontWeight: "bold"
  },
  small: {
    fontSize: remCalc(.9)
  },
  viewRight: {
    alignSelf: "flex-end",
    // justifyContent: "flex-end",
  }
});
