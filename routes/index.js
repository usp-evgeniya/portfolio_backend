const express = require('express');
const router = express.Router();

const ctrlHome = require('../controllers/homepage');
const ctrlBlog = require('../controllers/blog');
const ctrlAbout = require('../controllers/about');
const ctrlAdmin = require('../controllers/admin');
const ctrlWorks = require('../controllers/works');
const ctrlAuth = require('../controllers/auth');

/* GET home page. */
router.get('/', ctrlHome.getIndex);

router.get('/blog', ctrlBlog.getBlog);

router.get('/works', ctrlWorks.getWorks);
router.post('/contact', ctrlWorks.sendEmail);

router.get('/about', ctrlAbout.getAbout);

router.get('/admin', ctrlAdmin.getAdmin);
router.post('/admin/img_load', ctrlAdmin.imgLoad);

router.get('/index', ctrlAuth.getAuth);
router.post('/login', ctrlAuth.authorization);


module.exports = router;
