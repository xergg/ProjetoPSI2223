const { body, validationResult } = require('express-validator');

const User = require('../models/user');
const Item = require('../models/item');

exports.find_all = async (req, res, next) => {
  try {
    const users = await User.find({}).populate('following').populate('followers');
    res.send(users);
  } catch (error) {
    next(httpError(HttpStatusCode.InternalServerError, error));
  }
};

exports.find_by_id = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('following').populate('followers');
    
    if (!user) {
      const error = new Error('Not found user');
        error.status = 404;
        return next(error);
    }
    
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.put_user = async (req, res, next) => {

  const { name, profile_image } = req.body;
  try {
    let user = await User.findById(req.params.id).exec();

    user.name = name;
    user.profile_image = profile_image;

    user = await User.findByIdAndUpdate(req.params.id, user).exec();
    res.json(user);
  } catch (error) {
    next(error);
  }
}

exports.update_cart = [
  body('item').not().isEmpty(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(false)
    }

    const userId = req.params.id;
    try {
      const user = await User.findById(userId, 'cart').exec();
      if (!user) {
        const error = new Error('Error adding item in user cart');
        error.status = 404;
        return next(error);
      }

      const cart = user.cart;
      const { item } = req.body;

      if (item) {
        // Find the index of the existing item in the cart
        const index = cart.findIndex(i => i.item.toString() === item.id);

        if (index == -1) {
          user.cart.push({
            item: item.id,
            quantity: item.quantity
          })

        } else {
          if (item.quantity == 0)
            user.cart.splice(index, 1);
          else
            user.cart[index].quantity = item.quantity;
        }

        // Save the updated user document with the new item added to the cart
        await user?.save();
        return res.json(user)
      }
    } catch (err) {
      const error = new Error('Server error');
      error.status = 400;
      return next(error);
    }
  }
]

exports.get_cart = async (req, res, next) => {

  try {
    const userId = req.params.id;
    const user = await User.findById(userId, 'cart').populate({
      path: 'cart.item',
      model: Item
    }).exec();

    if (!user) {
      const error = new Error('Error getting user cart');
      error.status = 404;
      return next(error);
    }
    res.send(user.cart);
  } catch (error) {
    next(error);
  }

}

exports.finish = async (req, res, next) => {
  const { id } = req.body;

  const randomNum = Math.random();

  const today = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const todayDateString = today.toLocaleDateString('en-US', options);

  if (randomNum > 0.5) {
    const user = await User.findById(id, 'items cart wishlist').exec();

    for (const item of user.cart) {
      if (!user.items.find(i => i.item.toString() == item.item.toString())) {
        user.items.push({
          item: item.item,
          date: today
        });
      }

      if(index = user.wishlist.find(i => i.toString() == item.item.toString())){
        user.wishlist.splice(index,1);
      }
    }

    user.cart.splice(0);
    await user?.save();

    return res.json(true);
  } else {
    return res.json(false);
  }
}

exports.add_to_cart = [
  body('itemId').not().isEmpty().withMessage('Missing item id'),

  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(false)
    }

    const userId = req.params.id;
    try {
      const user = await User.findById(userId, 'cart').exec();
      if (!user) {
        const error = new Error('Error adding item in user cart');
        error.status = 404;
        return next(error);
      }

      const cart = user.cart;
      const { itemId } = req.body;

      // Find the index of the existing item in the cart
      const index = cart.findIndex(i => i.item.toString() === itemId);

      if (index == -1) {
        user.cart.push({
          item: itemId,
          quantity: 1
        })

      } else
        user.cart[index].quantity++;

      // Save the updated user document with the new item added to the cart
      await user?.save();
      return res.json(user)

    } catch (err) {
      const error = new Error('Server error');
      error.status = 400;
      return next(error);
    }
  }
]

exports.get_library = async (req, res, next) => {

  try {
    const userId = req.params.id;
    const user = await User.findById(userId, 'items').populate({
      path: 'items.item',
      model: Item
    }).exec();

    if (!user) {
      const error = new Error('Error getting user library');
      error.status = 404;
      return next(error);
    }
    
    const formatItems = user.items.map(item => {
      if (item.item) {
        const date = new Date(item.date);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${hours}:${minutes}`;      
        return {
          item: item.item,
          date: formattedDate
        };
      } else {
        return // or an object with some default values
      }
    }).filter(Boolean);

    res.send(formatItems);
  } catch (error) {
    next(error);
  }
}

exports.get_wishlist = async (req, res, next) => {

  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('wishlist').exec();

    if (!user) {
      const error = new Error('Error getting user wishlist');
      error.status = 404;
      return next(error);
    }
    res.send(user.wishlist);
  } catch (error) {
    next(error);
  }

}

exports.update_wishlist = [
  body('itemId').not().isEmpty(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(false)
    }
    const userId = req.params.id;

    try {
      const user = await User.findById(userId, 'wishlist ').exec();
      if (!user) {
        const error = new Error('Error removing from wishlist');
        error.status = 404;
        return next(error);
      }

      const wishlist = user.wishlist;
      const { itemId } = req.body;


      if (itemId) {
      
        const itemIndex = wishlist.findIndex(w => w.toString() === itemId);

        if(itemIndex!=-1){

          wishlist.splice(itemIndex, 1);

        }

        await user.save();
        return res.json(user)
      }
    } catch (err) {
      const error = new Error('Server error');
      error.status = 400;
      return next(error);
    }
  }
]

exports.add_to_wishlist = [
  body('itemId').not().isEmpty().withMessage('Missing item id'),
  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(false)
    }


    const userId = req.params.id;
    try {
      const user = await User.findById(userId, 'wishlist items').exec();
      if (!user) {
        const error = new Error('Error adding item in user wishlist');
        error.status = 404;
        return next(error);
      }

      const wishlist = user.wishlist;
      const boughtItems = user.items;
      const { itemId } = req.body;

      const index = wishlist.findIndex(i => i.toString() === itemId);
      const itemIndex = boughtItems.findIndex(i => i.item._id.toString() === itemId );

      if (index == -1 && itemIndex == -1) {

        user.wishlist.push(itemId)
        await user.save();
        return res.json(true)

      } else {
        res.json(false);
      }

    } catch (err) {
      const error = new Error('Server error');
      error.status = 400;
      return next(error);
    }
  }
]

exports.getFollowing = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('following').exec();
    
    if (!user) {
      const error = new Error('Error finding user in following list');
      error.status = 404;
      return next(error);
    }

    const followList = user.following.map((followedUser) => {
      return followedUser.toString();
    });

    return res.status(200).json(followList);
  } catch (err) {
    next(err);
  }
}


exports.addFollowing = async (req, res, next) => {

    
    try{
      
      const userId = req.params.id;

      
      const user = await User.findById(userId).populate('following').exec();
      
      

      const { followId } = req.body;
      

      const user2 = await User.findById(followId).populate('followers').exec();

      if (!user || !user2) {
        const error = new Error('Error finding user in following list');
        error.status = 404;
        return next(error);
      }
      
      const index = user.following.findIndex(i => i.toString() === followId);

      if (index == -1 && userId != followId) {

        user.following.push(followId)
        user2.followers.push(userId)
        await user.save();
        await user2.save();
        return res.json(true)

      } else {
        res.json(false);
      }

      
      
    }catch (err){
      const error = new Error('Server error');
        error.status = 400;
        return next(error);

  }

}


exports.removeFollowing = async (req, res, next) => {

  
  try{

    const userId = req.params.id;
    const user = await User.findById(userId).populate('following').exec();
    const { followId } = req.body;
    const user2 = await User.findById(followId).populate('followers').exec();

    if (!user || !user2) {
      const error = new Error('Error finding user in following list');
      error.status = 404;
      return next(error);
    }

    const followList = user.following;
    const followList2 = user2.followers;
    const index = followList.findIndex(i => i.toString() === followId);
    const index2 = followList2.findIndex(i => i.toString() === userId);
    user.following.splice(index, 1);
    user2.followers.splice(index2,1);
    await user.save();
    await user2.save();

  }catch (err){
    const error = new Error('Server error');
      error.status = 400;
      return next(error);

}

}