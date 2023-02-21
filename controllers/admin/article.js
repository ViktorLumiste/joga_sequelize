const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')
const models = require('../../models')

const createArticle = (req,res) =>{
    let name = req.body.name
    let slug = req.body.slug
    let image = req.body.image
    let body = req.body.body

    const newArticle = models.Article.create({
        name:name,
        slug:slug,
        image:image,
        body:body,
        published: new Date().toISOString().slice(0,19).replace('T', ' ')
    })
        .then(articles =>{
            console.log(articles)
            return res.status(200).json({message: "New article is added"});
        })
        .catch(error=>{
            return res.status(500).send(error.message);
        })
}

const updateArticle = (req,res) =>{
    if(req.method == "GET"){
        pass
    }else if(req.method == "POST"){
        let name = req.body.name
        let slug = req.body.slug
        let image = req.body.image
        let body = req.body.body

        models.Article.update({
            name:name,
            slug:slug,
            image:image,
            body:body,
            updatedAt: new Date().toISOString().slice(0,19).replace('T', ' ')
            },{
            where:{id : req.params.id}
        })
            .then(articles =>{
                console.log(articles)
                return res.status(200).json({message: "New article is added"});
            })
            .catch(error=>{
                return res.status(500).send(error.message);
            })
    }
}

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
    getArticleByAuthor,
    createArticle,
    updateArticle
}