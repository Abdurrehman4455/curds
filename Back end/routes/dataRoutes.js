const express = require('express');
const router = express.Router();
const dataController = require('../routes/methods');

router.post('/add', dataController.addData);
router.get('/data', dataController.getData);
router.delete('/data/:id', dataController.deleteData);
router.put('/data/:id', dataController.updateData);
router.get('/search', dataController.searchData);

module.exports = router;
























