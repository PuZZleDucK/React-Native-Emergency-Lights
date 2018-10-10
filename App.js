/**
 * React Native Flashing Lights App
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, ToastAndroid} from 'react-native';

const blinkRates = [2000, 1000, 500, 300, 100, 50];
const colorSequences = [{name: 'construction', left: ['#FFAA00', '#000000'], right: ['#000000', '#FFAA00']},
                        {name: 'police', left: ['#FF0000', '#0000FF'], right: ['#0000FF', '#FF0000']},
                        {name: 'ambulance', left: ['#FF0000', '#FFFFFF'], right: ['#FFFFFF', '#FF0000']},
                        {name: 'fire', left: ['#FF0000', '#000000'], right: ['#000000', '#FF0000']}];

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {color: 0, colorSequence: 0, rate: 0, resetInterval: true, interval: 0}
  }
  render() {
    if(this.state.resetInterval){
      clearInterval(this.state.interval);
      let intervalId = setInterval(() => {
        this.setState(previousState => {
          return { color: (previousState.color + 1) % 2, resetInterval: false, interval: intervalId}
        });
      }, blinkRates[this.state.rate]);
    }

    if(this.state.color == 0) {
      return (<View style={styles.container}>
        <Text
          onPress={() => {
            this.setState(previousState => {
              const nextSequence = (previousState.colorSequence + 1) % colorSequences.length
              ToastAndroid.show('Colors changed to: ' + colorSequences[nextSequence]['name'], ToastAndroid.SHORT);
              return { colorSequence: nextSequence}
            });
          }}
          style={{backgroundColor: colorSequences[this.state.colorSequence]['left'][this.state.color],
                  height: 1000,
                  width: 1000}}

        />

        <Text> Tap up to change speed and down to change colors </Text>

        <Text
          onPress={() => {
            this.setState(previousState => {
              return { rate: (previousState.rate + 1) % blinkRates.length, resetInterval: true}
            });
          }}
          style={{backgroundColor: colorSequences[this.state.colorSequence]['right'][this.state.color],
                  height: 1000,
                  width: 1000}}
        />
      </View>);
    } else {
      return (<View style={styles.container}>
        <Text
          onPress={() => {
            ToastAndroid.show('Colors changed to: ' + colorSequences[0]['name'], ToastAndroid.SHORT);
            this.setState(previousState => {
              return { colorSequence: (previousState.colorSequence + 1) % colorSequences.length}
            });
          }}
          style={{backgroundColor: colorSequences[this.state.colorSequence]['left'][this.state.color],
                  height: 1000,
                  width: 1000}}
        />

        <Text> Tap up to change speed and down to change colors </Text>

        <Text
          onPress={() => {
            this.setState(previousState => {
              return { rate: (previousState.rate + 1) % blinkRates.length, resetInterval: true}
            });
          }}
          style={{backgroundColor: colorSequences[this.state.colorSequence]['right'][this.state.color],
                  height: 1000,
                  width: 1000}}
        />
      </View>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
});
