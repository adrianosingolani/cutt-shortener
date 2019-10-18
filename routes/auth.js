const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

const User = require('../models/User');

router.post('/', (req, res) => {    
    const { email, password } = req.body;    

    //  validation for required inputs
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // check if user exists
    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Email not found'})

            // validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid password '})

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: '24h' },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token, 
                                user: {
                                    id: user.id,
                                    email: user.email
                                }
                            })
                        }
                    );
                })
        })
});

router.get('/', auth, (req, res) => {    
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
})

module.exports = router;