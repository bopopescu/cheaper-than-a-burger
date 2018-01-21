// Connect Firebase
var firebase = require('firebase');
var ejs = require('ejs');
var bodyParser = require('body-parser');

var munny = 0.00;

var express                 = require('express');
var app                     = express();

// Init
var port                    = process.env.PORT || 5000;

app.set('view engine', 'ejs') // register the template engine
app.set('views', './views') // specify the views directory
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

        res.render('cover', {
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

app.get('/index', function(req, res) {
  res.render('index', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/bean-burritos', function(req, res) {
  res.render('recipes/bean-burritos', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/chicken-noodle-casserole', function(req, res) {
  res.render('recipes/chicken-noodle-casserole', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/chicken-tomato-cucumber-salad', function(req, res) {
  res.render('recipes/chicken-tomato-cucumber-salad', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/fajita-quesadillas', function(req, res) {
  res.render('recipes/fajita-quesadillas', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/fajita-ranch-chicken-wraps', function(req, res) {
  res.render('recipes/fajita-ranch-chicken-wraps', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/fish-and-peppers', function(req, res) {
  res.render('recipes/fish-and-peppers', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/fish-tacos', function(req, res) {
  res.render('recipes/fish-tacos', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/grilled-pork-and-pineapple', function(req, res) {
  res.render('recipes/grilled-pork-and-pineapple', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/herbed-salmon', function(req, res) {
  res.render('recipes/herbed-salmon', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/jamaican-stir-fry', function(req, res) {
  res.render('recipes/jamaican-stir-fry', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/pork-kebabs', function(req, res) {
  res.render('recipes/pork-kebabs', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/sausage-eggwiches', function(req, res) {
  res.render('recipes/sausage-eggwiches', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/shrimp-bisque', function(req, res) {
  res.render('recipes/shrimp-bisque', {
        data: recipes,
        bank: munny
    });
});

app.get('/recipes/veggie-lasagna', function(req, res) {
    res.render('recipes/veggie-lasagna', {
          data: recipes,
          bank: munny
      });
});

app.get('/savings', function(req, res) {
  res.render('savings', {
          data: recipes,
          bank: munny
      });
});

app.post('/add-money', function(req, res) {
  munny = req.body.bank;
  console.log("BANK: " + req.body.bank);
  res.send({money: munny});
});
