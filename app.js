// Connect Firebase
var firebase = require('firebase');
var ejs = require('ejs');

var munny = 0;

var express                 = require('express');
var app                     = express();

// Init
var port                    = process.env.PORT || 5000;

app.set('view engine', 'ejs') // register the template engine
app.set('views', './views') // specify the views directory
app.use(express.static(__dirname + '/views'));

// Start Server
app.listen(port, function () {
  console.log('CHEAPER THAN A BURGER ### Port: 5000 // ')
})

var config = {
    apiKey: "AIzaSyAdiZqTSjDgktbTNrhKHTM9r28Zu4TGm-E",
    authDomain: "cheaper-than-a-burger.firebaseapp.com",
    databaseURL: "https://cheaper-than-a-burger.firebaseio.com",
    projectId: "cheaper-than-a-burger",
    storageBucket: "cheaper-than-a-burger.appspot.com",
    messagingSenderId: "471661590671"
};

firebase.initializeApp(config);

var recipes = [];

class Recipe {
  constructor(name, price, ingredients, directions) {
    this.name = name;
    this.price = price;
    this.ingredients = ingredients;
    this.directions = directions;
  }
}

app.get('/', function(req, res) {
  firebase.auth().signInAnonymously().then(function(firebaseUser) {

      firebase.database().ref('/').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var child = childSnapshot.val();
          ingredients = [];
          Array.prototype.forEach.call(child._ingredients, child => {
            ingredients.push(ingredient);
          });
          var recipe = new Recipe(child._name, child._price, ingredients, child._directions);
          recipes.push(recipe);
        })

        res.render('index', {
          data: recipes,
          bank: munny
        });

      }, function(error) {
        console.error(error);
      });

    })
    .catch(function(error) {
       console.error(error);
    });
});
