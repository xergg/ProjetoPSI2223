const Item = require('../models/item');
const User = require('../models/user');

exports.find_all = async (req, res, next) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    return next(error);
  }
};

exports.find_by_id = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId)
      .populate('rates.user')
      .populate('rates.answers.user');

    if (!item) {
      const error = new Error('Not found item');
      error.status = 404;
      return next(error);
    }

    res.json(item);
  } catch (error) {
    next(error);
  }
};

exports.addRate = [
  async (req, res, next) => {
    try {
      const itemId = req.params.id;
      const { user, rate, opinion } = req.body;

      let item = await Item.findById(itemId);
      if (!item) {
        const error = new Error('Not found item');
        error.status = 404;
        return next(error);
      }

      item.rates.push({
        user,
        rate,
        message: opinion
      });

      await Item.findByIdAndUpdate(itemId, item)
      item = await Item.findById(itemId)
        .populate('rates.user')
        .populate('rates.answers.user')
        .exec();

      return res.json(item);
    } catch (error) {
      next(error);
    }
  }
]


exports.addOpinion = async (req, res, next) => {
  try {
    const { itemId, rateId, user, flag } = req.body;
    let item = await Item.findById(itemId)
      .populate('rates.user')
      .populate('rates.answers.user');;
    const index = item.rates.findIndex(r => r._id == rateId);
    if (index == -1) {
      const error = new Error('Not found the rate');
      error.status = 404;
      return next(error)
    }

    let rate = item.rates[index];
    const opinionIndex = rate.opinions.findIndex(opinion => opinion.user == user)

    if (opinionIndex == -1)
      rate.opinions.push({ user, flag });
    else if (rate.opinions[opinionIndex].flag == flag) {
      rate.opinions.splice(opinionIndex, 1);
      item.rates[index] = rate;
    } else {
      rate.opinions[opinionIndex] = { user, flag };
      item.rates[index] = rate;
    }

    await item.save();
    return res.json({ bool: true, item })
  } catch (error) {
    next(error)
  }
}

exports.addComment = async (req, res, next) => {
  try {
    const { itemId, rateId, user, comment } = req.body;
    let item = await Item.findById(itemId)
      .populate('rates.user');
    
    const index = item.rates.findIndex(r => r._id == rateId);
    if (index == -1) {
      const error = new Error('Not found the rate');
      error.status = 404;
      return next(error)
    }

    let rate = item.rates[index];
    rate.answers.push({ user, message: comment });

    await item.save();
    item = await Item.findById(itemId)
      .populate('rates.user')
      .populate('rates.answers.user');
    return res.json({ bool: true, item })
  } catch (error) {
    next(error)
  }
}