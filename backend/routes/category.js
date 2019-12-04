const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require('../controllers/category');

// validators
const { runValidation } = require('../validators');
const { categoryCreateValidator } = require('../validators/category')
const { 
    requireSignin,
    adminMiddleware,
    authMiddleware
} = require('../controllers/auth');

router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/categories', list);
router.get('/categories/:slug', read);
router.delete('/categories/:slug', requireSignin, adminMiddleware, remove);

module.exports = router;