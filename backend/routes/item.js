const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/itemsController');

router.get("/:id", itemsController.find_by_id);
router.post("/:id/createRate", itemsController.addRate);
router.post("/:id/addOpinion", itemsController.addOpinion);
router.post("/:id/addComment", itemsController.addComment);


module.exports = router;