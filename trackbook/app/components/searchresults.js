var React = require('react-native');
var Separator = require('../helpers/separator.js');
var Firebase = require('firebase');
var _ = require('underscore');

var {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image
} = React;

var styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2F2933',
    padding: 3
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    backgroundColor: '#2F2933'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowTitle: {
    fontFamily: 'American Typewriter',
    color: '#BDF271',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 5
  },
  rowContent: {
    color: '#29D9C2',
    fontSize: 16
  },
  image: {
    height: 128,
    width: 97,
    alignSelf: 'center',
  }
});

var SearchResults = React.createClass({
  handleClick: function(newBook) {
    var bookshelf = new Firebase('https://trackbook.firebaseio.com/users/'+ this.props.username).child('books');
    bookshelf.push(newBook);
    alert('Book has been added!');
  },
  render: function() {
    var results = this.props.results;
    var context = this;
    var defaultImage = 'http://books.google.com/books/content?id=L3lOPgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api';

    var books = _.map(results, function(book, index) {
      return (
        <View key={index}>
          <View style={styles.bookContainer}>
            <Image style={styles.image} source={ {uri: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : defaultImage } } />
            <View style={styles.infoContainer}>
              <Text style={styles.rowTitle} onPress={context.handleClick.bind(context, book)} value={book.volumeInfo.title}>{ book.volumeInfo.title }</Text>
              <Text style={styles.rowContent}>{ book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'author' } </Text>
              <Text style={styles.rowContent}>{ book.volumeInfo.publishedDate } </Text>
            </View>
          </View>
          <Separator />
        </View>
      )
    });

    return (
      <ScrollView style={styles.container}>
        {books}
      </ScrollView>
    )
  }
});

module.exports = SearchResults;
