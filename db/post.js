const { prisma } = require("./index");

const getAllPosts = async () => {
  const allPosts = await prisma.Post.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
      Like: true,
    },
  });
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
        Like: {},
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        Like: true,
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

const deletePost = async (id, authorId) => {
  try {
    const deletedPost = await prisma.Post.delete({
      where: {
        id,
        authorId,
      },
    });
    return deletedPost;
  } catch (error) {
    console.error("error deleting post", error);
  }
};

const getPostsByUser = async (authorId) => {
  try {
    const userPosts = await prisma.Post.findMany({
      where: {
        authorId,
      },
      include: {
        Like: true,
      },
    });
    return userPosts;
  } catch (error) {
    console.error("error finding user's posts", error);
  }
};

const toggleLike = async (userId, postId) => {
  try {
    const existingLike = await prisma.Like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (!existingLike) {
      const newLike = await prisma.Like.create({
        data: {
          userId,
          postId,
        },
      });
      newLike.liked = true;
      return newLike;
    } else if (existingLike) {
      const deletedLike = await prisma.Like.delete({
        where: {
          id: existingLike.id,
        },
      });
      deletedLike.liked = false;
      return deletedLike;
    }
  } catch (error) {
    console.error("error creating like", error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByUser,
  toggleLike,
};
