const { prisma } = require("./index");

const getAllPosts = async () => {
  const allPosts = await prisma.Post.findMany({});
  return allPosts;
};

const getPostById = async (id) => {
  try {
    const post = await prisma.Post.findUnique({
      where: {
        id,
      },
    });
    return post;
  } catch (error) {
    console.error("error finding post by id", error);
  }
};

const createPost = async (title, content, authorId) => {
  try {
    const newPost = await prisma.Post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    return newPost;
  } catch (error) {
    console.error("error creating new post", error);
  }
};

const updatePost = async (id, updateData, authorId) => {
  try {
    const updatedPost = await prisma.Post.update({
      where: {
        id,
        authorId,
      },
      data: updateData,
    });
    return updatedPost;
  } catch (error) {
    console.error("error updating post", error);
  }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost };
