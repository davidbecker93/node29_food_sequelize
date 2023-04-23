const { successCode, errorCode, failCode } = require("../config/reponse.js");
const sequelize = require("../models/index.js");
const initModels = require("../models/init-models.js");
const model = initModels(sequelize);

const getUser = async (req, res) => {
  try {
    let data = await model.user.findAll();
    return successCode(res, "Get user successful", data);
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const getUserById = async (req, res) => {
  try {
    let { id } = req.params;
    let dataOne = await model.user.findOne({
      where: {
        user_id: id,
      },
    });

    if (dataOne) {
      return successCode(res, "Get user successful", dataOne);
    } else {
      return failCode(res, "User not found!"); 
    }
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const createUser = async (req, res) => {
  try {
    let { full_name, email, pass_word } = req.body;
    let checkEmail = await model.user.findOne({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return failCode(res, "Email already exists!");
    } else {
      let newUser = {
        full_name,
        email,
        pass_word,
      };
      let data = await model.user.create(newUser);
      if (data) {
        return successCode(res, "Create user successful", data);
      }
    }
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let { full_name, email, pass_word } = req.body;
    let updatedUser = {
      full_name,
      email,
      pass_word,
    };

    let data = await model.user.update(updatedUser, {
      where: {
        user_id: id,
      },
    });

    if (data[0] === 1) {
      return successCode(res, "Update user successful");
    } else {
      return failCode(res, "User not found!"); 
    }
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;

    let data = await model.user.destroy({
      where: {
        user_id: id,
      },
    });

    if (data === 1) {
      return successCode(res, "Delete user successful");
    } else {
      return failCode(res, "User not found!"); 
    }
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, pass_word } = req.body;

    let dataOne = await model.user.findOne({
      where: {
        email: email,
        pass_word: pass_word,
      },
    });

    if (dataOne) {
      return successCode(res, "Login successful", dataOne);
    } else {
      return failCode(res, "Invalid email or password!"); 
    }
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const getLikeRes = async (req, res) => {
  try {
    const {user_id, res_id} = req.body;
    let likeModel = {
      user_id,
      res_id,
  }
    const data = await model.like_res.findOne({
      where: {
        user_id,
        res_id
      }
    });
    if (!data) {
      await model.like_res.create(likeModel);
      return successCode(res, "Get like Res successful");
    } else {
      await model.like_res.destroy({
        where: {user_id, res_id},
      });
      return successCode(res, "Unlike Res successful");
    }
  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
};

const getLikeByRes = async (req, res) => {
  try {
      const {id} = req.params;

      const data = await model.like_res.findAll({
          where: {res_id: id}
      })
      if (data.length === 0) {
        return failCode(res, "No likes found for this restaurant");
      } else {
        return successCode(res, "Get list Like by Res successful", data);
      }
    } catch (err) {
      console.log(err);
      return errorCode(res);
    }
  };



const getLikeByUser = async (req, res) => {
  try {
      const {id} = req.params;

      const data = await model.like_res.findAll({
          where: {user_id: id}
      })

      if (data.length === 0) {
        return failCode(res, "No likes found for this user"); 
      } else {
        return successCode(res, "Get Like by User successful", data); 
      }
    } catch (err) {
      console.log(err);
      return errorCode(res);
    }
  };


const getRateRes = async (req, res) => {
  try {
      const { user_id, res_id, amount } = req.body;

      const rateModel = {
          user_id,
          res_id,
          amount
      }

      const data = await model.rate_res.findOne({
        where: {
          user_id,
          res_id
        }
      });

      if (!data) {
        await model.rate_res.create(rateModel);
        return successCode(res,"Res has been rated",rateModel)
      } else {
        await model.rate_res.update(rateModel, {
          where: {
            user_id,
            res_id
          }
        });
        return successCode(res,"Res has been updated",rateModel)
      }

  } catch (err) {
    console.log(err);
    return errorCode(res);
  }
}


const getRateByRes = async (req, res) => {
  try {
      const { id } = req.params;

      const data = await model.rate_res.findAll({
          where: { res_id: id }
      });

      if (data.length === 0) {
        return failCode(res, "No rates found for this restaurant");
      } else {
        return successCode(res, "List of rates by restaurant retrieved successfully", data);
      }
    } catch (err) {
      console.log(err);
      return errorCode(res);
    }
  };


const getRateByUser = async (req, res) => {
  try {
      const { id } = req.params;

      const data = await model.rate_res.findAll({
          where: { user_id: id }
      })

      if (data.length === 0) {
        return failCode(res, "No rates found for this user");
      } else {
        return successCode(res, "List of rates by user retrieved successfully", data);
      }
    } catch (err) {
      console.log(err);
      return errorCode(res);
    }
  };


module.exports = {
  getUser,getUserById,getLikeRes,createUser,deleteUser,updateUser,loginUser,getLikeByRes,getLikeByUser,getRateRes,getRateByRes,getRateByUser
}

