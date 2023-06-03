module.exports.signin = function(req, res){
    return res.render('signin', {
        title: "SKIT PC | Sign In"
    })
}

module.exports.signup = function(req, res){
    return res.render('signup', {
        title: "SKIT PC | Sign Up"
    })
}