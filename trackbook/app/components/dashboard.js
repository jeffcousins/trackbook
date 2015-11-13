var React = require('react-native');
var Profile = require('./profile.js');
var SearchBook = require('./searchbook.js');
var SearchResults = require('./searchresults.js');
var Firebase = require('firebase');

var {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
    backgroundColor: '#2F2933'
  },
  profileContainer: {
    justifyContent: 'center',
    flex: 2
  },
  buttonContainer: {
    flex: 1
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      username: this.props.username
    }
  },
  makeBackground: function(button) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    };

    if (button === 0) {
      obj.backgroundColor = '#01A2A6';
    } else if (button === 1) {
      obj.backgroundColor = '#29D9C2';
    } else {
      obj.backgroundColor = '#BDF271';
    }

    return obj;
  },
  goToProfile: function() {
    var context = this;
    this.props.navigator.push({
      component: Profile,
      title: 'My name ' + context.props.userInfo.name.split(' ')[0],
      passProps: {userInfo: context.props.userInfo}
    });
  },
  updateBooks: function() {
    var context = this;
    var usersRef = new Firebase('https://trackbook.firebaseio.com/users/' + this.props.username);
    var books;

    usersRef.child('books').on('value', function(snapshot) {
      books = snapshot.val();
      context.goToBooks(books);
    });
  },
  goToBooks: function(books) {
    var context = this;
    var username = this.props.username;
    var userInfo = this.props.userInfo;

    context.props.navigator.push({
      title: 'My Books',
      component: SearchResults,
      passProps: {results: books, username: username, userInfo: userInfo}
    });
  },
  goToSearchBook: function() {
    var username = this.props.username;
    var userInfo = this.props.userInfo;
    
    this.props.navigator.push({
      component: SearchBook,
      title: 'Search',
      passProps: {userInfo: userInfo, username: username}
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={ {uri: this.props.userInfo.avatar_url} } style={styles.image} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={this.makeBackground(0)}
            onPress={this.goToProfile}
            underlayColor='#554A5C'>
              <Text style={styles.buttonText}>View Profile</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this.makeBackground(1)}
            onPress={this.updateBooks}
            underlayColor='#554A5C'>
              <Text style={styles.buttonText}>View Books</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this.makeBackground(2)}
            onPress={this.goToSearchBook}
            underlayColor='#554A5C'>
              <Text style={styles.buttonText}>Add Book</Text>
          </TouchableHighlight>
        </View>
      </View>)
  }
});

module.exports = Dashboard;
