const { Auth } = require("../src/services/auth");
const Jwt = require("../src/services/jwt");

const registerNewUser = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const hasEmail = await Auth.getUserByEmail(data.email);
      if (hasEmail) {
        reject("Email already used!");
      }
      const user = await Auth.register(data);
      const token = await Jwt.create(user.id);
      const response = {
        token,
        user,
      };
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

module.exports = registerNewUser;
