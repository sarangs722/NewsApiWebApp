const express = require("express");
const app = express();
const port = 5000;

// Listen on port
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

// Static files
app.use(express.static('/public'));

// assigning paths
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/images'));
app.use('/js', express.static(__dirname + '/public/js'));

// Templating Engine (ejs)
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// Routes
const newsRouter = require('./src/routes/news');

app.use('/', newsRouter);
app.use('/article', newsRouter);









// let articles;

// function getNewsArticles() {
//     newsapi.v2.topHeadlines({
//         country: 'in',
//     }).then(res => {
//         articles = res.articles;
//         console.log('NewsAPI Articles received!');
//     });
// };

// app.get("/", (req, res) => {
//     getNewsArticles();
//     console.log((articles));
// });



