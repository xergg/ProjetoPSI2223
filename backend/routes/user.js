const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get("/:id/wishlist", usersController.get_wishlist);
router.put("/:id/wishlist", usersController.add_to_wishlist);
router.post("/:id/wishlist", usersController.update_wishlist);
router.post("/:id/cart/finish", usersController.finish);
router.get("/:id/cart", usersController.get_cart);
router.post("/:id/cart", usersController.update_cart);
router.put("/:id/cart", usersController.add_to_cart);
router.get("/:id/library", usersController.get_library);
router.get("/:id", usersController.find_by_id);
router.put("/:id", usersController.put_user);
router.get("/:id/following", usersController.getFollowing);
router.post("/:id/following", usersController.addFollowing);
router.put("/:id/following", usersController.removeFollowing)

module.exports = router;
