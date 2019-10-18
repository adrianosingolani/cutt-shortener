const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const config = require('config');

const auth = require('../middleware/auth');

const Url = require('../models/Url');

// add a new url
router.post('/', auth, (req, res) => {
    const { urlCode, longUrl } = req.body;

    const userId = req.user.id;

    if (!validUrl.isUri(config.get('baseUrl') + '/' + urlCode)) return res.status(400).json({ msg: 'The short URL is invalid' });

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

//update url
router.patch('/', auth, (req, res) => {
    const userId = req.user.id;
    const { urlId, urlCode, longUrl } = req.body.url;

    if (!validUrl.isUri(config.get('baseUrl') + '/' + urlCode)) return res.status(400).json({ msg: 'The short URL is invalid' });

    if (validUrl.isUri(longUrl)) {
        try {
            Url.findOneAndUpdate({ _id: urlId, userId }, { $set: { urlCode, longUrl } }, { new: true })
                .then(url => {
                    res.json(url);
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
            console.log(url);
            res.json(url);
        })
        .catch(error => {
            return res.status(500).json({ msg: 'Something went wrong. Try again' });
        })
})

// get all user's urls
router.get('/', auth, (req, res) => {
    Url.find({ userId: req.user.id })
        .then(urls => {
            res.json(urls);
        })
})

// get specific url by urlCode
router.get('/stats/:urlCode', auth, (req, res) => {
    Url.findOne({ urlCode: req.params.urlCode })
        .then(url => {
            res.json(url);
        });
})

// add click to specific url by urlCode and return new document
router.post('/redirect/', (req, res) => {
    const newClick = {
        date: new Date()
    }

    Url.findOneAndUpdate({ urlCode: req.body.code }, { $push: { clicks: newClick } }, { new: true })
        .then(url => {
            res.json(url);
        });
})

// check if code is available and valid
router.post('/code', (req, res) => {
    const urlCode = req.body.urlCode;

    if (!validUrl.isUri(config.get('baseUrl') + '/' + urlCode)) return res.status(400).json({ msg: 'The short URL is invalid' });

    // check if code exists
    Url.findOne({ urlCode })
        .then(url => {
            if (url) res.status(409).json({ msg: 'The short URL is already in use' });
            else res.json({ urlCode });
        })
})

// get a new URL code
router.get('/code', (req, res) => {
    var urlCode = '';

    const codeLength = 4;
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    const charactersLength = characters.length;

    for (var i = 0; i < codeLength; i++) {
        urlCode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    Url.findOne({ urlCode })
        .then(url => {
            if (!url) {
                return res.json({ urlCode });
            } else {
                return res.status(409).json({ msg: "URL code already exists. Try again" });
            }
        })
})

module.exports = router;