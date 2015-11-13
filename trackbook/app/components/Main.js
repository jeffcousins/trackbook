var React = require('react-native');
var api = require('../utils/api.js');
var Dashboard = require('./dashboard.js');
var Firebase = require('firebase');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#2F2933',
  },
  title: {
    marginBottom: 20,
    fontSize: 45,
    textAlign: 'center',
    color: '#BDF271',
    marginBottom: 50,
    fontFamily: 'American Typewriter'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: '#01A2A6',
    borderRadius: 8,
    color: '#FFFFA6',
    marginTop: 10,
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#29D9C2',
    borderColor: '#01A2A6',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 40,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#2F2933',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 20
  }
});

var Main = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      isLoading: false,
      error: false,
    }
  },
  userChange: function(event) {
    this.setState({
      username: event.nativeEvent.text
    });
  },
  passChange: function(event) {
    this.setState({
      password: event.nativeEvent.text
    });
  },
  handleSubmit: function() {
    var context = this;
    var userExists;
    var username = this.state.username;
    var password = this.state.password;

    var usersRef = new Firebase('https://trackbook.firebaseio.com/users/');
    usersRef.child(username).on('value', function(snapshot) {
      if (snapshot.val()) {
        userExists = true;
      } else {
        userExists = false;
      }
    });

    this.setState({
      isLoading: true,
    });

    api.getGit(username)
      .then(function(response) {
        if (response.message === 'Not Found') {
          context.setState({
            error: 'User not found',
            isLoading: false
          });
        } else {
          if (!userExists) {
            usersRef.child(username).set(response);
            usersRef.child(username).update(
              {username: username, password: password}
            );
          }

          context.props.navigator.push({
            title: response.name || 'Profile',
            component: Dashboard,
            passProps: {userInfo: response, username: username}
          });

          context.setState({
            isLoading: false,
            error: false,
            username: '',
            password: ''
          });
        }
      });
  },
  render: function() {
    var showError;
    if (this.state.error) {
      showError = <View></View>
    } else {
      showError = <Text> {this.state.error} </Text>
    }

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>TrackBook</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          placeholder={'username'}
          placeholderTextColor={'#6B6B46'}
          onChange={this.userChange} />
        <TextInput
          style={styles.searchInput}
          value={this.state.password}
          placeholder={'use fake password'}
          placeholderTextColor={'#6B6B46'}
          onChange={this.passChange} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="#31FFE5">
            <Text style={styles.buttonText}> Submit </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#FFFFA6"
          size="large"></ActivityIndicatorIOS>
        {showError}
      </View>
    )
  }
});

module.exports = Main;
