module.exports = {
  isUser: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "You have to be logged");
    res.redirect("/err");
  },
};
