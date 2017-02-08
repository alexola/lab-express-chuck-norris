const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();


app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.get('/random', (req, res) => {

    client.getRandomJoke().then(function(response) {
        let data = {};
        console.log(response.value);
        data.random = response.value;
        res.render('random', data);
    }).catch(function(err) {
        res.send(err);
    });
});

app.get('/categories', (req, res) => {

    client.getJokeCategories().then(function(categories) {
        console.log(categories);
        let cat = {};
        cat.catList = categories;
        console.log(cat);
        res.render('categories', cat);
    }).catch(function(err) {
        res.send(err);
    });
});


app.get('/categories/:category', (req, res) => {

    client.getRandomJoke(req.params.category).then(function(response) {
        let data = {};
        console.log(response.value);
        data.random = response.value;
        res.render('joke-by-category', data);
    }).catch(function(err) {
        res.send(err);
    });

});


app.listen(3000, () => {
    console.log('My first app listening on port 3000!')
});
