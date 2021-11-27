import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Constants} from 'expo';

export default class App extends Component {
  render() {
    const gradientHeight = 500;
    const gradientBackground = 'purple';
    const data = Array.from({length: gradientHeight});
    return (
      <View style={{flex: 1}}>
        {data.map((_, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              backgroundColor: gradientBackground,
              height: 1,
              bottom: gradientHeight - i,
              right: 0,
              left: 0,
              zIndex: 2,
              opacity: (1 / gradientHeight) * (i + 1),
            }}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
