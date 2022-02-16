const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const path = require('path');
const engine = require('ejs-mate');
const mongoose = require('mongoose');
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Article = require('./models/article');
const User = require('./models/user');
const Draft = require('./models/draft');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const authorRoutes = require('./routes/author');
const { isLoggedIn } = require('./middleware/isLoggedIn');
const { isAdmin } = require('./middleware/isAdmin');
const { isAuthor } = require('./middleware/isAuthor');
const ExpressError = require('./middleware/ExpressError');

const { getFileStream } = require('./s3');
const { env } = require('process');

const { PORT = 3000 } = process.env;

const contentParent = {
    name: 'Database',
    icon: 'Archive',
}

app.engine('ejs', engine);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/Admin', isAdmin, adminRoutes);
app.use('/Author', isAuthor, authorRoutes)
app.use(express.static(__dirname+'/HTML'));
app.use(express.static(__dirname+'/CSS'));
app.use(express.static(__dirname+'/JS'));
app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/partials'));
app.use(express.static(__dirname+'/assets'));
app.use(express.static(__dirname+'/admin'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const run = async () => {
    // useFindAndModify: true
    // useCreateIndex: true,
    const connection = await mongoose.connect(process.env.MONGODB_LIVE_KEY, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('CONNECTION OPEN!');
    })
    .catch(err => {
        console.log('CONNECTION ERROR!')
        console.log(err);
    })
    
    AdminBro.registerAdapter(AdminBroMongoose);

    const adminBro = new AdminBro({
        Databases: [connection],
        resources: [
            { resource: User, options: 
                { 
                    parent: contentParent, 
                    listProperties: ['firstname', 'surname', 'articles', 'drafts', 'title'],
                    actions: {
                        myNewaction: {
                            // create a new action
                            actionType: 'record',
                            handler: () => {
                                // function of new action
                                alert('New Action!');
                            },
                            icon: 'View'
                        }
                    }
                } 
            },
            { resource: Article, options: { parent: contentParent, listProperties: ['title', 'authorName', 'topic'] } },
            { resource: Draft, options: { parent: contentParent } },
        ],
        dashboard: {
            component: AdminBro.bundle('./admin/dashboard'),
        },
        rootPath: '/admin',
        locale: {
            translations: {
                labels: {
                    User: 'Authors',
                    Article: 'Articles',
                    Draft: 'Drafts',
                }
            }
        },
        branding: {
            companyName: 'Stishh Media Ltd',
            logo: '/Vector-Icons/Stishh-sm-rounded.svg',
            softwareBrothers: false,

        },
        pages: {
            "Create Author": {
                label: "Create Author",
                handler: async (req, res, context) => {
                    return {
                        text: 'I am fetched from the backend',
                    }
                },
                component: AdminBro.bundle('./admin/create-author'),
            },
            "Create Admin": {
                label: "Create Admin",
                handler: async (req, res, context) => {
                    return {
                        text: 'I am fetched from the backend',
                    }
                },
                component: AdminBro.bundle('./admin/create-admin'),
            }
        }
    });

    const router = AdminBroExpress.buildRouter(adminBro);
    app.use(adminBro.options.rootPath, router);
}
try {
    run();
} catch(err) {
    console.log(err);
}

app.get('/', async (req, res) => {
    const articles = await Article.find({});
    res.render('./HTML/landing-page.ejs', {
        title: 'Stishh Media',
        articles
    })
})

app.get('/images/:key', (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);

    readStream.pipe(res);
})
app.get('/article/:id', async (req, res) => {
    const article = await Article.findById(req.params.id);
    article.views = article.views + 1;
    await article.save();
    console.log(article);
    console.log(article.content);
    res.render('./HTML/article.ejs', {
        title: `Stishh - ${article.title}`,
        article
    })
})
app.get('/News', async (req, res) => {
    const articles = await Article.find({topic: 'News'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - News',
        articles,
        articleTitle: 'News'
    });
});

app.get('/Shopping', async (req, res) => {
    const articles = await Article.find({topic: 'Shopping'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - Shopping',
        articles,
        articleTitle: 'Shopping'
    });
});

app.get('/Travel', async (req, res) => {
    const articles = await Article.find({topic: 'Travel'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - Travel',
        articles,
        articleTitle: 'Travel'
    });
});

app.get('/Gaming', async (req, res) => {
    const articles = await Article.find({topic: 'Gaming'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - Gaming',
        articles,
        articleTitle: 'Gaming'
    });
});

app.get('/Celebs', async (req, res) => {
    const articles = await Article.find({topic: 'Celebrity'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - Celebs',
        articles,
        articleTitle: 'Celebs'
    });
});

app.get('/Internet', async (req, res) => {
    const articles = await Article.find({topic: 'Internet'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - Internet',
        articles,
        articleTitle: 'Internet'
    });
});

app.get('/Animals', async (req, res) => {
    const articles = await Article.find({topic: 'Animals'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - Animals',
        articles,
        articleTitle: 'Animals'
    });
});

app.get('/Movies', async (req, res) => {
    const articles = await Article.find({topic: 'Movies'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - Movies',
        articles,
        articleTitle: 'Movies'
    });
});

app.get('/TV-shows', async (req, res) => {
    const articles = await Article.find({topic: 'TV shows'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - TV shows',
        articles,
        articleTitle: 'TV Shows'
    });
});

app.get('/Arts', async (req, res) => {
    const articles = await Article.find({topic: 'Arts'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - Arts',
        articles,
        articleTitle: 'Arts'
    });
});

app.get('/Music', async (req, res) => {
    const articles = await Article.find({topic: 'Music'});
    console.log(articles);
    res.render('./HTML/article-showcase.ejs', {
        title: 'Stishh - Music',
        articles,
        articleTitle: 'Music'
    });
});

app.get('/Privacy-Policy', (req, res) => {
    res.render('./HTML/privacy-policy.ejs', {
        title: 'Stishh - Privacy Policy'
    })
})

app.get('/Our-Media-Pages', (req, res) => {
    // render the our-media-pages.ejs file.
    res.render('./HTML/our-media-pages.ejs', {
        title: 'Stishh - Socials',
    })
})

app.all('*', (req, res, next) => {
	next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	console.log(err);
	res.status(statusCode).render('./HTML/404-page.ejs', {
		title: 'Oops!'
	});
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});