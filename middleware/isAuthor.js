module.exports.isAuthor = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    } 
    if (req.user.role !== 'Author') {
        console.log(req.user.role);
        console.log('You are not an Author!');
        req.session.returnTo = req.originalUrl;
        return res.redirect('/');
    }
    next();
}