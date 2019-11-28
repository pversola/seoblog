const User = require('../models/user');

exports.read = (req, res) => {
    req.profile.hash_password = undefined;
    return res.json(req.profile);
};
