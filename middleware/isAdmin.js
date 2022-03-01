module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    } else if(req.user.role !== 'Admin') {
        console.log(req.user.role);
        console.log('You are not an Admin!');
        req.session.returnTo = req.originalUrl;
        return res.redirect('/');
    }
    next();
}