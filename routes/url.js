const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const config = require('config');
const mongoose = require('mongoose');

const auth = require('../middleware/auth');

const Url = require('../models/Url');
const User = require('../models/User');
const Click = require('../models/Click');

const reservedCodes = [
    'signup',
    'login',
    'logout',
    'dashboard',
    'stats'
]

// add a new url
router.post('/', auth, (req, res) => {
    const { urlCode, longUrl } = req.body;

    const userId = req.user.id;

    if (
        !validUrl.isUri(config.get('baseUrl') + '/' + urlCode) || 
        reservedCodes.includes(urlCode)
    ) {
        return res.status(400).json({ msg: 'The short URL is invalid' });
    }

    if (validUrl.isUri(longUrl)) {
        try {
            url = new Url({
                userId,
                urlCode,
                longUrl
            })

            url.save()
                .then(url => {
                    const newUrl = {
                        ...url._doc,
                        clicks: []
                    }                    
                    res.json(newUrl)
                })
                .catch(error => {
                    if (error.name === 'MongoError' && error.code === 11000) {
                        return res.status(409).json({ msg: 'The short URL is already in use' });
                    } else {
                        return res.status(500).json({ msg: 'Something went wrong. Try again' });
                    }
                })
        } catch (error) {
            res.status(500).json({ msg: 'Something went wrong. Try again' });
        }
    } else {
        res.status(400).json({ msg: 'Long URL is invalid' });
    }
});

// add a new guest user url
router.post('/guest', (req, res) => {    
    const { urlCode, longUrl } = req.body;

    User.findOne({ email: 'guest@cutt.xyz' })
    .then(user => {
        if (!user) return res.status(400).json({ msg: 'Something went wrong. Please, log in and try again'});

        const userId = user.id;

        if (
            !validUrl.isUri(config.get('baseUrl') + '/' + urlCode) || 
            reservedCodes.includes(urlCode)
        ) {
            return res.status(400).json({ msg: 'The short URL is invalid. Please, refresh page and try again' });
        }

        if (validUrl.isUri(longUrl)) {
            try {
                url = new Url({
                    userId,
                    urlCode,
                    longUrl
                })
    
                url.save()
                    .then(url => {
                        res.json(url)
                    })
                    .catch(error => {                        
                        if (error.name === 'MongoError' && error.code === 11000) {
                            return res.status(409).json({ msg: 'The short URL is already in use. Please, refresh page and try again' });
                        } else {
                            return res.status(500).json({ msg: 'Something went wrong. Try again' });
                        }
                    })
            } catch (error) {
                res.status(500).json({ msg: 'Something went wrong. Try again' });
            }
        } else {
            res.status(400).json({ msg: 'Long URL is invalid' });
        }
    })
    .catch(error => {
        return res.status(500).json({ msg: 'Something went wrong. Try again' });
    })
});

//update url
router.patch('/', auth, (req, res) => {
    const userId = req.user.id;
    const { urlId, urlCode, longUrl, clicks } = req.body.url;

    if (
        !validUrl.isUri(config.get('baseUrl') + '/' + urlCode) || 
        reservedCodes.includes(urlCode)
    ) {
        return res.status(400).json({ msg: 'The short URL is invalid' });
    }

    if (validUrl.isUri(longUrl)) {
        try {
            Url.findOneAndUpdate({ _id: urlId, userId }, { $set: { urlCode, longUrl } }, { new: true })
                .then(url => {
                    console.log(clicks);
                    
                    const updatedUrl = {
                        ...url._doc,
                        clicks
                    }   

                    res.json(updatedUrl);
                })
                .catch(error => {
                    if (error.name === 'MongoError' && error.code === 11000) {
                        return res.status(409).json({ msg: 'The short URL is already in use' });
                    } else {
                        return res.status(500).json({ msg: 'Something went wrong. Try again' });
                    }
                })
        } catch (error) {
            res.status(500).json({ msg: 'Something went wrong. Try again' });
        }
    } else {
        res.status(400).json({ msg: 'Long URL is invalid' });
    }
})

//delete url
router.delete('/:urlId', auth, (req, res) => {
    const userId = req.user.id;
    const _id = req.params.urlId;

    Url.findOneAndDelete({ _id, userId })
        .then(url => {
            res.json(url);
        })
        .catch(error => {
            return res.status(500).json({ msg: 'Something went wrong. Try again' });
        })
})

// get all user's urls
router.get('/', auth, (req, res) => {
    Url.aggregate([
        { $match: { 
            userId: mongoose.Types.ObjectId(req.user.id) 
        } },
        { $lookup: {
            from: 'clicks',
            localField: '_id',
            foreignField: 'urlId',
            as: 'clicks'
        }}
    ])
        .then(urls => {
            res.json(urls);
        })
})

// add click to specific url by urlCode and return new document
router.post('/redirect/', (req, res) => {
    Url.findOne({ urlCode: req.body.code })
        .then(url => {

            const click = new Click({
                urlId: url._id,
                userId: url.userId,
                date: new Date()
            })

            click.save();

            res.json(url);
        });
})

// get a new URL code
router.get('/code', (req, res) => {
    let urlCode = '';

    const codeLength = 4;
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    const charactersLength = characters.length;

    for (let i = 0; i < codeLength; i++) {
        urlCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    Url.findOne({ urlCode })
        .then(url => {
            if (!url && !reservedCodes.includes(urlCode)) {
                return res.json({ urlCode });
            } else {
                return res.status(409).json({ msg: "Please, refresh page and try again" });
            }
        })
})

module.exports = router;