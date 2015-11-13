var React = require('react-native');

var {
  Text,
  View,
  Image,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2933',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  handle: {
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    alignSelf: 'center'
  },
  topMargin: {
    flex: 1
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

var Badge = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.topMargin} />
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={ {uri: this.props.userInfo.avatar_url }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{ this.props.userInfo.name }</Text>
          <Text style={styles.handle}>{ this.props.userInfo.location }</Text>
        </View>
      </View>
    )
  }
});

module.exports = Badge;
