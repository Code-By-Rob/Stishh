const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Article = require('../models/article');
const Draft = require('../models/draft');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const { uploadFile } = require('../s3');

router.get('/my-articles', async (req, res) => {
    const { _id } = req.user;
    const me = await User.findById(_id).populate('articles');
    console.log(me.articles);
    res.render('./HTML/my-articles.ejs', {
        title: 'Stishh - My Articles',
        articles: me.articles
    })
})
router.get('/article-post', (req, res) => {
    res.render('./HTML/article-post.ejs', {
        title: 'Stishh - Post an Article'
    })
})
router.post('/create-article', upload.fields([{name: 'ImageHero', maxCount: 1}, {name: 'Images'}], ), async (req, res) => {
    let count = 0;
    const file = req.files['ImageHero'][0];
    const result = await uploadFile(file);
    console.log(result);
    console.log(JSON.parse(req.body.Content));
    let newArticle = new Article({
        title: req.body.Title,
        description: req.body.Description,
        topic: req.body.Topic,
        headerImage: result.Key,
        date: req.body.Date,
        views: 0,
        minsToRead: `${req.body.ReadTime} mins to read.`,
        authorName: `${req.user.firstname} ${req.user.surname}`,
    });
    const articleContent = JSON.parse(req.body.Content);
    for (let i = 0; i < articleContent.length; i++) {
        try {
            if (articleContent[i].image !== undefined) {
                console.log('got here');
                const imageResult = await uploadFile(req.files['Images'][count]);
                count++;
                const imageObject = {'image': imageResult.Key};
                newArticle.content.push(imageObject);
            } else {
                newArticle.content.push(articleContent[i]);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const articleTags = JSON.parse(req.body.Tags);
    for (let j = 0; j < articleTags.length; j++) {
        newArticle.tags.push(articleTags[j]);
    }
    const { _id } = req.user;
	const me = await User.findById(_id);
    await me.articles.push(newArticle);
    await newArticle.save();
    await me.save();
})
router.post('/drafts-delete', async (req, res) => {
    const { _id } = req.body;
    const me = User.findById(req.user._id);
    me.updateOne({ '_id': req.user._id }, { $pull: { 'drafts': _id }})
    await Draft.deleteOne({'_id': _id});
    res.send({message: "success"});
})
router.get('/drafts/edit/:id', async (req, res) => {
    const draft = await Draft.findById(req.params.id);
    res.render('./HTML/draft-edit.ejs', {
        title: 'Stishh - Draft Edit',
        draft,
    });
})
router.get('/drafts', async (req, res) => {
    const { _id } = req.user;
    const me = await User.findById(_id).populate('drafts');
    res.render('./HTML/drafts.ejs', {
        title: 'Stishh - Drafts',
        drafts: me.drafts,
    });
});
router.get('/draft/:id', async (req, res) => {
    const draft = await Draft.findById(req.params.id);
    console.log(draft);
    res.render('./HTML/draft-preview.ejs', {
        title: 'Stish - Draft Preview',
        draft,
    })
});
router.post('/create-draft', upload.fields([{name: 'ImageHero', maxCount: 1}, {name: 'Images'}], ), async (req, res) => {
    let count = 0;
    const file = req.files['ImageHero'][0];
    const result = await uploadFile(file);
    console.log(result);
    console.log(JSON.parse(req.body.Content));
    let newDraft = new Draft({
        title: req.body.Title,
        description: req.body.Description,
        topic: req.body.Topic,
        headerImage: result.Key,
        date: req.body.Date,
        views: 0,
        minsToRead: `${req.body.ReadTime} mins to read.`,
        authorName: `${req.user.firstname} ${req.user.surname}`,
        authorProfilePic: req.user.profilePicture,
        authorLinks: req.user.links,
        authorTitle: req.user.title,
    });
    const articleContent = JSON.parse(req.body.Content);
    for (let i = 0; i < articleContent.length; i++) {
        try {
            if (articleContent[i].image !== undefined) {
                console.log('got here');
                const imageResult = await uploadFile(req.files['Images'][count]);
                count++;
                const imageObject = {'image': imageResult.Key};
                newDraft.content.push(imageObject);
            } else {
                newDraft.content.push(articleContent[i]);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const articleTags = JSON.parse(req.body.Tags);
    for (let j = 0; j < articleTags.length; j++) {
        newDraft.tags.push(articleTags[j]);
    }
    const { _id } = req.user;
	const me = await User.findById(_id);
    await me.drafts.push(newDraft);
    await newDraft.save();
    await me.save();
    res.send({
        draftId: newDraft._id,
    })
});
router.post('/save-draft', upload.fields([{name: 'ImageHero', maxCount: 1}, {name: 'Images'}]), async (req, res) => {
    // let count = 0;
    const { _id } = req.body;
    // const draft = Draft.findById(_id);
    const file = req.files['ImageHero'][0];
    const result = await uploadFile(file);

    const draftTags = JSON.parse(req.body.Tags);
    // using the update function
    let object = {
        'title': req.body.Title, 
        'description': req.body.Description, 
        'topic': req.body.Topic, 
        'headerImage': result.Key,
        'content': JSON.parse(req.body.Content),
        'tags': draftTags,
    }
    await Draft.findByIdAndUpdate(_id, object, (err, res) => {
        console.log(err);
        console.log(res);
    }).catch(err => {
        console.log(err);
    }) 

    res.send({message: "success"});
})
router.post('/Profile/Edit', upload.single('avatar'), async (req, res) => {
    const { _id } = req.user;
    const file = req.file;
    let result = null;
    const me = await User.findById(_id).populate('articles');
    if (file) {
        result = await uploadFile(file);
    } else {
        result = me.profilePicture;
    }
    console.log(req.body['links']);
    const links = req.body['links'];
    console.log(links);
    const newLinks = [];
    for (let i = 0; i < links.length; i++) {
        newLinks.push(JSON.parse(links[i]));
    }
    console.log();
    const articleUpdateObject = {
        authorTitle: req.body['user-title'],
        authorLinks: newLinks,
        authorProfilePic: result.Key,
    }
    const authorUpdateObject = {
        title: req.body['user-title'],
        links: newLinks,
        profilePicture: result.Key,
    }
    me.articles.forEach(async article => {
        await Article.findByIdAndUpdate(article._id, articleUpdateObject, (err, res) => {
            console.log(err);
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    })
    await User.findByIdAndUpdate(_id, authorUpdateObject, (err, res) => {
        console.log(err);
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
})
router.get('/Profile', async (req, res) => {
    const { _id } = req.user;
    const me = await User.findById(_id);
    const myDrafts = await me.populate('drafts');
    const myArticles = await me.populate('articles');
    const drafts = myDrafts.drafts;
    const articles = myArticles.articles;
    res.render('./HTML/profile', {
        title: 'Stishh - Profile',
        drafts,
        articles,
    });
});

router.get('/New-Login', async (req, res) => {
    res.render('./HTML/new-login-picture.ejs', {
        title: 'Stishh - Author Photo'
    })
})

router.post('/New-Login', upload.single('avatar'), async (req, res) => {
    const { _id } = req.user;
    const file = req.file;
    let result = null;
    if (file) {
        result = await uploadFile(file);
    } else {
        console.log(err);
    }
    let authorUpdateObject = {
        profilePicture: result.Key,
    }
    await User.findByIdAndUpdate(_id, authorUpdateObject, (err, res) => {
        console.log(err);
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
    res.redirect('/Author/Profile');
})

module.exports = router;