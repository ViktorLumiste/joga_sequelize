const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

const models = require('../models')

const getAllArticles = (req,res) =>{
    models.Article.findAll()
        .then(articles =>{
            console.log(articles)
            return res.status(200).json({article});
        })
        .catch(error=>{
            return res.status(500).send(error.message);
        })
}

const getArticleBySlug = (req,res) =>{
    models.Article.findOne({
        where: {
            slug:req.params.slug
      },
        include: [
            {
            model: models.Author,
        },
        {
            model: models.Tags,
            through:{
                model: models.ArticleTag
                }
            }
        ],
    })
    .then(article =>{
        console.log(article)
        return res.status(200).json({article});
    })
        .catch(error=>{
            return res.status(500).send(error.message);
        })
}

const getArticleByAuthor = (req,res) =>{
    models.Article.findAll({
        where: {
            author_id:req.params.author_id
        },
    })
        .then(article =>{
            console.log(article)
            return res.status(200).json({article});
        })
        .catch(error=>{
            return res.status(500).send(error.message);
        })
}

module.exports = {
    getAllArticles,
    getArticleBySlug,
    getArticleByAuthor
}