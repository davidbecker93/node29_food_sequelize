const { successCode, errorCode, failCode } = require("../config/reponse.js");
const sequelize = require("../models/index.js");
const initModels = require("../models/init-models.js");
const model = initModels(sequelize);

const checkUserAndFood = async (user_id, food_id) => {
  // Check if user exists
  const userExists = await model.user.findOne({
    where: {
      user_id,
    },
  });

  // Check if food exists
  const foodExists = await model.food.findOne({
    where: {
      food_id,
    },
  });

  return { userExists, foodExists };
};

const orderFoodfromUser = async (req, res) => {
  const { user_id, food_id, amount, code, arrSubId } = req.body;
  const orderCol = {
    food_id,
    user_id,
  };

  try {
    const { userExists, foodExists } = await checkUserAndFood(user_id, food_id);

    // If both user and food exist, add data to the database
    if (userExists && foodExists) {
      const orderModel = {
        ...orderCol,
        ...(amount && { amount }),
        ...(code && { code }),
        ...(arrSubId && { arr_sub_id: arrSubId }),
      };

      // Check if order exists
      const orderExists = await model.order.findOne({ where: orderCol });

      // If order exists, update it, otherwise create it
      if (orderExists) {
        await model.order.update(
          {
            ...orderModel,
            ...(amount && { amount: orderExists.amount + amount }),
          },
          { where: orderCol }
        );
      } else {
        await model.order.create(orderModel);
      }
      return successCode(res, "Order food successfully");
    } else {
      return failCode(res, "User or food not found!");
    }
  } catch (error) {
    console.log(error);
    return errorCode(res);
  }
};

module.exports = {orderFoodfromUser}
