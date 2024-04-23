const { prisma } = require("./index");

const registerUser = async (username, password) => {
  try {
    const newUser = await prisma.User.create({
      data: {
        username,
        password,
      },
    });
    return newUser;
  } catch (error) {
    console.error("error registering new user", error);
  }
};

const loginUser = async (username) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
      username
      },
    });
    return user;
  } catch (error) {
    console.error("error logging in", error);
  }
};

module.exports = { registerUser, loginUser };
