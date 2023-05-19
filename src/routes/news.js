const { default: axios } = require('axios');
const express = require('express');
const newsRouter = express.Router();
const NewsApi = require('newsapi');
const newsapi = new NewsApi('c9aea5b9517545bf82f1ea8a7ff84d15');

let articles = [];

function checkEmpty(article) {
    return article.url != null && article.urlToImage != null;
}

newsRouter.get('', async (req, res) => {
    try {
        // const data = await newsapi.v2.topHeadlines({
        //     country: 'in',
        // });
        const data = await newsapi.v2.everything({
            q: 'technology'
        });

        articles = data.articles;
        articles = articles.filter(checkEmpty);


        console.log('NewsAPI Articles received!');
        res.render('news', { articles: articles });
    }
    catch (error) {
        res.render('news', { articles: null });
        console.error(error);
    }
});

newsRouter.get('/:idx', async (req, res) => {
    // url doesn't get pass through,
    const articleId = req.params.idx;
    const articleUrl = articles[articleId].url;
    console.log(articleUrl)

    try {
        res.render('newsSingle', { articleUrl: articleUrl });
    } catch (error) {
        console.error(error);
    }
});

newsRouter.post('', async (req, res) => {
    let searchQuery = req.body.search;

    try {
        const data = await newsapi.v2.everything({
            q: searchQuery
        });

        articles = data.articles;
        articles = articles.filter(checkEmpty);


        console.log('NewsAPI Articles received!');
        res.render('news', { articles: articles });
    }
    catch (error) {
        res.render('news', { articles: null });
        console.error(error);
    }
})

module.exports = newsRouter;