/* eslint-disable no-async-promise-executor */
const jwt = require("jsonwebtoken");

const secretAdm = "h23=d7saha2783kf=_";

class Jwt {
  static create(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await jwt.sign({ userId }, secretAdm, {
          expiresIn: 86400,
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  }

  static verify(token) {
    return new Promise(async (resolve, reject) => {
      jwt.verify(token, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            auth: true,
            decoded,
          });
        }
      });
    });
  }
}

module.exports = Jwt;
