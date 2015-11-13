/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var Main = require('./app/components/Main.js');
var React = require('react-native');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} = React;

var trackbook = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        barTintColor={'#FFFFA6'}
        shadowHidden={true}
        initialRoute={{
          title: 'Sign In',
          component: Main
        }} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDD',
  }
});

AppRegistry.registerComponent('trackbook', () => trackbook);
