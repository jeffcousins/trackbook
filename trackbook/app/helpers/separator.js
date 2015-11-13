var React = require('react-native');

var {
  View,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#01A2A6',
    flex: 1,
  }
});

var Separator = React.createClass({
  render: function() {
    return (
      <View style={styles.separator} />
    )
  }
});

module.exports = Separator;
