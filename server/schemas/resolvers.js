const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Create the functions that fulfill the queries defined in `typeDefs.js`
const resolvers = {
  Query: {
    users: async () => {
      // Get and return all documents from the classes collection
      return await User.find({});
    },
      // me: async (parent, args, context) => {
  //   if (context.user) {
  //     return User.findOne({ _id: context.user._id }).populate('thoughts');
  //   }
  //   throw AuthenticationError;
  // },
  },

  Mutation: {
    addUser: async (parent, args) => {

      const { username, email, password } = args;
      const user = await User.create({ username, email, password });

      if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
      }

      const token = signToken(user);

      console.log(token)

      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
  
      const user = await User.findOne({ email});

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, { userId, bookId, authors, title, description, image },) => {
    // saveBook: async (parent, { args }) => {


        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { savedBooks: {bookId: bookId, title: title, description: description, image: image } }  },
          { new: true, runValidators: true }
        );

        const token = signToken(updatedUser);

        return { token, updatedUser }

    },


  //   async deleteBook({ user, params }, res) {
  //     const updatedUser = await User.findOneAndUpdate(
  //       { _id: user._id },
  //       { $pull: { savedBooks: { bookId: params.bookId } } },
  //       { new: true }
  //     );
  //     if (!updatedUser) {
  //       return res.status(404).json({ message: "Couldn't find user with this id!" });
  //     }
  //     return res.json(updatedUser);
  //   },
  // };




    // saveBook: async (parent, { thoughtText }, context) => {
    //   if (context.user) {
    //     const thought = await Thought.create({
    //       thoughtText,
    //       thoughtAuthor: context.user.username,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { thoughts: thought._id } }
    //     );

    //     return thought;
    //   }
    //   throw AuthenticationError;
    //   ('You need to be logged in!');
    // }
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