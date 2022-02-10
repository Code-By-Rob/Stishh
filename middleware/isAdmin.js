module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    } else if(req.user.role !== 'Admin') {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/');
    }
    next();
}