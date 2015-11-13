var React = require('react-native');
var Badge = require('./badge.js');

var {
  Text,
  View,
  StyleSheet,
} = React;

var styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#2F2933'
  },
  infoContainer: {
    flexDirection: 'column',
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 5
  },
  rowTitle: {
    color: '#01A2A6',
    fontSize: 24,
    fontWeight: 'bold'
  },
  rowContent: {
    color: 'black',
    fontSize: 22
  }
});

var Profile = React.createClass({
  getRowTitle: function(user, item) {
    if (item === 'public_repos') {
      item.replace('_', ' ');
    }
    
    return item[0].toUpperCase() + item.slice(1) || item;
  },
  render: function() {
    var userInfo = this.props.userInfo;
    var topicArr = ['company', 'location', 'followers', 'following', 'email', 'login'];
    var context = this;

    var list = topicArr.map(function(item, index) {
      if (!userInfo[item]) {
        return <View key={index} />
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}>{ context.getRowTitle(userInfo, item) }</Text>
              <Text style={styles.rowContent}>{ userInfo[item] } </Text>
            </View>
          </View>
        )
      }
    });

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Badge userInfo={this.props.userInfo} />
        </View>
        <View style={styles.infoContainer}>
        {list}
        </View>
      </View>
    )
  }
});

module.exports = Profile;
