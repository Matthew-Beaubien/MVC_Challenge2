const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const posts = await Post.bulkCreate(postData, {
      individualHooks: true,
      returning: true,
    });

    await Promise.all(commentData.map(async (comment) => {
      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      await Comment.create({
        ...comment,
        post_id: randomPost.id,
      });
    }));

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
