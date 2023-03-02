const express = require("express")
const app = express()

const path = require('path')
const hbs = require('express-handlebars')
app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))
const bodyParser = require('body-parser')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}));

const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

sequelize
    .authenticate()
    .then(() =>{
        console.log('Connected to the database');
    })
    .catch(err=> {
        console.error('Unable to connect to the database:', err)
    });

const articleRouter = require('./routes/article');
app.use('/', articleRouter);
app.use('/article', articleRouter);
app.use('/articles', articleRouter);


const authorRouter = require('./routes/author')
app.use('/author', authorRouter);

const adminRouter = require('./routes/admin')
app.use('/admin/article', adminRouter)


app.listen(3000, () =>{
    console.log("Server is running on http://localhost:3000")
})