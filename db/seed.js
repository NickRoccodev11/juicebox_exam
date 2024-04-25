const { prisma } = require("./index");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const main = async () => {
  console.log("seeding process started");
  try {
    console.log("creating 3 entries for User table");

    const generateHashedPassword = () => {
      const plainTextPassword = faker.internet.password();
      const hashedPassword = bcrypt.hashSync(plainTextPassword, 12);
      return hashedPassword;
    };

    await Promise.all(
      [...Array(3)].map(() =>
        prisma.User.create({
          data: {
            username: faker.internet.userName(),
            password: generateHashedPassword(),
          },
        })
      )
    );
    console.log("users created, starting post creation");
    await prisma.Post.create({
      data: {
        title: "My first Post",
        content:
          "Not much to say, just wanted to introduce myself. Hello World!",
        authorId: 1,
      },
    });
    await prisma.Post.create({
      data: {
        title: "Thoughts on cats",
        content:
          "how many cats makes you a cat lady? how come there's no 'cat man'? ",
        authorId: 2,
      }
    });
    await prisma.Post.create({
      data: {
        title: "Preparing for a dinner date",
        content:
          "I must remember to put on music to cover the sound of silverware scraping the plates",
        authorId: 3,
      },
    });
    console.log("posts created")
  } catch (error) {
    console.error(error);
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
