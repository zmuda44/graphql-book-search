const { Class } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    users: async () => {
      // Get and return all documents from the classes collection
      return await User.find({});
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create({ username, email, password });

      const token = signToken(user);

      return { token, user };
    }
  //   loginUser: async (parent, { email, password }) => {
  //     const user = await User.findOne({ email});

  //     if (!user) {
  //       throw new AuthenticationError('Incorrect credentials');
  //     }

  //     const correctPw = await user.isCorrectPassword(password);

  //     if (!correctPw) {
  //       throw new AuthenticationError('Incorrect credentials');
  //     }

  //     const token = signToken(user);

  //     return { token, user };
  //   }
  }
};

module.exports = resolvers;


//code taken from other sources
// const resolvers = {
//   Query: {
//     thoughts: async () => {
//       return Thought.find();
//     },

//     thought: async (parent, { thoughtId }) => {
//       return Thought.findOne({ _id: thoughtId });
//     },
//   },

// Mutation: {
//     addThought: async (parent, { thoughtText, thoughtAuthor }) => {
//       return Thought.create({ thoughtText, thoughtAuthor });
//     },
//     addComment: async (parent, { thoughtId, commentText }) => {
//       return Thought.findOneAndUpdate(
//         { _id: thoughtId },
//         {
//           $addToSet: { comments: { commentText } },
//         },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//     },
//     removeThought: async (parent, { thoughtId }) => {
//       return Thought.findOneAndDelete({ _id: thoughtId });
//     },
//     removeComment: async (parent, { thoughtId, commentId }) => {
//       return Thought.findOneAndUpdate(
//         { _id: thoughtId },
//         { $pull: { comments: { _id: commentId } } },
//         { new: true }
//       );
//     },
//   },
// };