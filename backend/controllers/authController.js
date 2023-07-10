const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.login = async (req, res, next) => {
    if (!req.body.name || !req.body.password) {
        const error = new Error('Invalid username or password');
        error.status = 401;
        return next(error);
    }

    const { name, password } = req.body

    try {
        const response = await User.findOne({ "name": name }, 'password').exec();
        var id;
        if (response != null && await bcrypt.compare(password, response.password)) {
            id = response._id;
            req.session.user = {id, name};
            req.session.authorized = true;
            return res.json({id, name});
        }
        
        const error = new Error('Invalid username or password');
        error.status = 401;
        return next(error);

    } catch (err) {
        if (err) return next(err);
    }

}

exports.islogin = async (req, res, next) => {
    req.session.user ? res.json({bool: true, token: req.session.user.id}) : res.json(false);
}

exports.signup = [
    body('name').trim().isLength({ min: 3 }).withMessage('Username must be minimum 3 characters long').isAlphanumeric().withMessage('Username must be alphanumeric'),
    body('password').trim().isLength({ min: 8 }).withMessage('Password must be minimum 8 characters long').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
        .withMessage('The password must contain at least one uppercase letter, one lowercase letter and one number'),

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json(errors)
            return;
        }

        const { name, password } = req.body

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User(
                {
                    name,
                    password: hashedPassword
                }
            );

            const response = await user.save();
            res.json(response);

        } catch (err) {
            if (err) return next(err);
        }

    }
]

exports.logout = async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return res.json(false);
        return res.json(true);
    });
}