const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/', (req, res) => {
    const { email, password, password_confirm } = req.body;

    if (!email || !password || !password_confirm) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    if (password !== password_confirm) {
        return res.status(400).json({ msg: 'Passwords don\'t match' });
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Email already registered'})

            const newUser = new User({
                email,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {                
                bcrypt.hash(newUser.password, salt, (err, hash) => {                    
                    if (err) throw err;
                    newUser.password = hash;

                    newUser.save()
                        .then(user => {                            
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
            })
        })
});


module.exports = router;