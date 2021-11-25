const express = require('express');
const ejs = require('ejs');
const _ = require('lodash');
const { first } = require('lodash');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat labore esse molestias provident quod laborum, debitis ipsam, ipsa voluptatibus quas perspiciatis adipisci corporis fuga excepturi nihil magnam ullam! Sequi, numquam.";
const aboutContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat labore esse molestias provident quod laborum, debitis ipsam, ipsa voluptatibus quas perspiciatis adipisci corporis fuga excepturi nihil magnam ullam! Sequi, numquam.';
const contactContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat labore esse molestias provident quod laborum, debitis ipsam, ipsa voluptatibus quas perspiciatis adipisci corporis fuga excepturi nihil magnam ullam! Sequi, numquam.';

var posts = [];
const initial = {
    title: 'Welcome',
    content: 'Welcome to the most sorted and most easy to use blog app on the internet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat labore esse molestias provident quod laborum, debitis ipsam, ipsa voluptatibus quas perspiciatis adipisci corporis fuga excepturi nihil magnam ullam! Sequi, numquam.'
}
// posts.push(initial);

app.get('/', (req, res) => {
    res.render(__dirname+'/views/home.ejs', {paragraph: homeStartingContent, posts: posts});
});

app.get('/contact', (req, res) => {
    res.render(__dirname+'/views/contact.ejs', {paragraph: contactContent});
});

app.get('/about', (req, res) => {
    res.render(__dirname+'/views/about.ejs', {paragraph: aboutContent});
});

app.get('/compose', (req, res) => {
    res.render(__dirname+'/views/compose.ejs',);
});

app.get('/posts/:term', (req, res) => {
    posts.forEach( (post) => {
        const storedTitle = _.lowerCase(post.title);
        if(storedTitle === _.lowerCase(req.params.term)){
            console.log("Match Found !!!");
            console.log(storedTitle);
            res.render(__dirname+'/views/post.ejs', {title: post.title, content: post.content});
        }
    });
        console.log("Not Found !!!");
        res.render(__dirname+'/views/post.ejs', {title: 'Post removed😢', content: 'Please read another post !!!'})
});

app.post('/compose', (req, res) => {
    var newPost = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    posts.push(newPost);
    res.send('<h1 style="display: inline; background-color: greenyellow; color: white;">Posted Successfully !</h1> <br><br>'+'<a style="display: inline; text-decoration: none; background-color: skyblue; color: white;" href="/">Go to Home</a>');
});

app.listen(port, () => console.log(`Blog app listening on port ${port}!`));