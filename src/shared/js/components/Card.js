import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import _concat from 'lodash/concat';
import _uniqueId from 'lodash/uniqueId';

import cStyle from '../../styles/Card.styles';
import commonStyle from '../../styles/Common.styles';

let CardProps = {
  ribbon: null,
  header: null,
  lineHeader: null,
  headerStyles: [],
  headerWarningStyle: []
};

export default class Card extends Component <CardProps> {

  	getRibbon() {
  		return (this.props.ribbon)
  			? <View style={cStyle.ribbon}/>
  			: <View style={cStyle.ribbonEmpty}/>;
  	}

    getLineHeader() {
      return (typeof this.props.lineHeader === 'string')
        ? (
          <Text h3="true" style={cardLineHeaderTxt}>{ this.props.lineHeader }</Text>
        )
        : this.props.lineHeader;
    }

  	render() {
  		let key = (this.props.id) ? this.props.id : _.uniqueId('card');
  		let mainClass = "card";
      let headerStyles = _concat([cStyle.divider], this.props.headerStyles);
      let warningStyles = (Array.isArray(this.props.headerWarningStyle)) ? this.props.headerWarningStyle : [];

  		if (this.props.cardClass) {
  			mainClass += " " + this.props.cardClass;
  		}

  		return(
  			<View style={ [cStyle.cardDefault] } key={key}>
  			  <View style={ headerStyles } />
  				<View style={ cStyle.subtitleRow }>
            { this.getRibbon() }
            <View style={ [cStyle.cardLineHeader, cStyle.cardLineHeaderTxt] }>
              { this.getLineHeader() }
            </View>
            <View style={ cStyle.cardHeaderRight }>
              <View>
    						<Text style={[cStyle.cardSubtitleStrong, cStyle.cardSubTitle, ]}>
                  { this.props.headerSubtitle }
                </Text>
    					</View>
    					<View className="title small-12 medium-7">
                { (Array.isArray(this.props.header))
                  ? this.props.header.map( h => {
                    return (
                      <Text h3="true"
                        key={_uniqueId()}
                        style={[cStyle.cardTitleH3, cStyle.cardTitle, commonStyle.viewRight, ...warningStyles]}>
                        { h }
                      </Text>)
                  })
                  : (<Text h3="true" style={[cStyle.cardTitleH3, cStyle.cardTitle, ...warningStyles]}>
                      {this.props.header}
                    </Text>)
                }
    					</View>
            </View>
  				</View>
  			  <View style={ cStyle.cardSection } className="card-section small-12 medium-6">
  			    {this.props.children}
  			  </View>
  			</View>
  		);
  	}
};
