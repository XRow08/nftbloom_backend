const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

class Auth {
  static async register(data) {
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    return prisma.user.create({
      data,
      select: {
        email: true,
        name: true,
        id: true,
      },
    });
  }

  static login(body) {
    return new Promise((resolve, reject) => {
      prisma.user
        .findFirst({ where: { email: body.email } })
        .then((response) => {
          bcrypt
            .compare(body.password, response.password)
            .then((passwordResponse) => {
              if (passwordResponse === true) {
                resolve(response);
              } else {
                reject(new Error());
              }
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static loginAdm(body) {
    return new Promise((resolve, reject) => {
      prisma.admin
        .findUnique({ where: { email: body.email } })
        .then((response) => {
          bcrypt
            .compare(body.password, response.password)
            .then((passwordResponse) => {
              if (passwordResponse === true) {
                resolve(response);
              } else {
                reject(new Error());
              }
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static updateUser(id, data) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        email: true,
        subscriptionId: true,
        name: true,
      },
    });
  }

  static getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      try {
        const user = prisma.user.findFirst({
          where: {
            email,
          },
        });
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  }

  static getUserInfo(id, adminId) {
    return prisma.user.findFirst({
      where: {
        id: Number(id),
        adminId,
      },
      include: {
        FieldInput: {
          include: {
            Field: true,
          },
        },
      },
    });
  }
}

module.exports = { Auth };
