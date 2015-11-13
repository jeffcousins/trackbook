var Firebase = require('firebase');

var api = {
  getGit: function(username) {
    username = username.toLowerCase().trim();
    var url = 'https://api.github.com/users/' + username;
    
    return fetch(url).then(function(response) {
      return response.json();
    }).catch(function() {
      console.log('error');
    });
  },

  searchForBook: function(searchInput) {
    var apiKey = 'AIzaSyB3rVRD7jDn_AcWE5dytmdp13rUvljJ24I';
    searchInput = searchInput.toLowerCase().trim();
    var url = 'https://www.googleapis.com/books/v1/volumes?q=' + searchInput + 
        '&maxResults=40&key=' + apiKey;

    return fetch(url).then(function(response) {
      console.log(response);
      return response.json();
    }).then(function(json) {
      return json;
    }).catch(function() {
      console.log('error');
    });
  },

  getBooks: function(username) {
    username = username.toLowerCase().trim();
    var url = 'https://trackbook.firebaseio.com/' + username + '.json';
    return fetch(url).then(function(response) {
      return response.json();
    }).catch(function() {
      console.log('Error getting the books you\'ve read from Firebase');
    });
  },

  addBook: function(username, bookID) {
    username = username.toLowerCase().trim();
    var url = 'https://trackbook.firebaseio.com/' + username + '.json';

    return fetch(url, {
      method: 'post',
      body: JSON.stringify(bookID)
    }).then(function(response) {
      return resonse.json()
    }).catch(function() {
      console.log('Error adding book to your Firebase collection');
    });
  },

  accountExists: function(username) {
    var url = 'https://trackbook.firebaseio.com/';
    var usersRef = new Firebase(url);

    usersRef.on('value', function(snapshot) {
      if (snapshot.val()) {
        return true;
      } else {
        return false;
      }
    });
  }

};

module.exports = api;
