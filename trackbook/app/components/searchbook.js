var React = require('react-native');
var api = require('../utils/api.js');
var Firebase = require('firebase');
var SearchResults = require('./searchresults.js');

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
    fontSize: 21,
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
    marginBottom: 40
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#29D9C2',
    borderColor: '#01A2A6',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
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

var SearchBook = React.createClass({
  getInitialState: function() {
    return {
      searchQuery: '',
      isLoading: false,
      error: false,
      books: []
    }
  },
  queryChange: function(event) {
    this.setState({
      searchQuery: event.nativeEvent.text
    });
  },
  handleSubmit: function() {
    var context = this;
    var username = this.props.username;
    var userInfo = this.props.userInfo;

    this.setState({
      isLoading: true,
    });

    api.searchForBook(context.state.searchQuery)
      .then(function(response) {
        if (!response.totalItems) {
          context.setState({
            error: 'Book not found',
            isLoading: false
          });
        } else {
          context.props.navigator.push({
            title: 'Showing: ' + context.state.searchQuery,
            component: SearchResults,
            passProps: {results: response.items, userInfo: userInfo, username: username}
          });

          context.setState({
            isLoading: false,
            error: false,
            searchQuery: '',
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
        <Text style={styles.title}>Explore the library for a book.</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          placeholder={'By title, author, or ISBN'}
          placeholderTextColor={'#6B6B46'}
          onChange={this.queryChange} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="#31FFE5">
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#FFFFA6" size="large">
        </ActivityIndicatorIOS>
        {showError}
      </View>
    )
  }
});

module.exports = SearchBook;
