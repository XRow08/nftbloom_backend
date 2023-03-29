const { Auth } = require("../src/services/auth");
const Jwt = require("../src/services/jwt");

const Login = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(data);
      const user = await Auth.login(data);
      console.log(user);
      const token = await Jwt.create(user.id);
      const body = {
        token,
        user,
      };

      resolve(body);
    } catch (err) {
      reject(err);
    }
  });

module.exports = Login;
