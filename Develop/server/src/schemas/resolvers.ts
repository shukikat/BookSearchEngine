
// import user model
import User from '../models/User.js';
// import sign token function from auth
import { signToken, AuthenticationError } from '../utils/auth.js';


interface User {
  _id: string;
  username: string; 
  email: string;
  savedBooks:Array<any>;
  bookCount: number;
}
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  };

}

interface LoginUserArgs {
  email: string; 
  password: string; 
}

interface UserArgs{
  username: string; 
}

interface SaveBookArgs {
  bookId: string; 
  authors: string[]; 
  title: string; 
  image: string; 
  link: string; 
}

interface RemoveBookArgs {
  bookId: string;
}

interface Context {
  user: User;
}


const resolvers ={
  Query: {
     users: async(): Promise<User[]>=> {

      return await User.find();
     }, 

     user: async (_parent: any, {username}: UserArgs): Promise<User | null >=> {
      return await User.findOne({username}); 
     }, 

     me: async (_parent:any, _args: any, context: Context): Promise<User|null> => {
      if (context.user) {
        return await User.findOne({_id: context.user._id});
      }

      throw new AuthenticationError('Not Authenticated');
     },

  },

  Mutation: {

    addUser: async (_parent: any, { input }: AddUserArgs): Promise<{token: string; user: User}>=>{
      const user=await User.create({...input});
      const token=signToken(user.username, user.email, user._id);
      return { token, user};
    }, 

    login: async (_parent: any, { email, password }: LoginUserArgs): Promise<{ token: string; user: User }> => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Cannot find this user');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Wrong password');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },

    saveBook: async (_parent: any, { input }: {input:SaveBookArgs}, context: Context): Promise<User | null> => {
      if (context.user) {
        const updatedUser= await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet:  {
            savedBooks: input,
          },

          $inc: {bookCount: 1}, 
        }, 
          {
            new: true,
            runValidators: true,
          }
        );

        return updatedUser; 
      }
      throw new AuthenticationError('Not authenticated');
    },

    removeBook: async (_parent: any, { bookId }: RemoveBookArgs, context: Context): Promise<User | null> => {
      if (context.user) {
        const updatedUser= await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId} },
        
            $inc: { bookCount: -1}, 
        },

          { new: true }
        );
        
        return updatedUser; 
      }
      throw new AuthenticationError ('Not authenticated');
    },



  }, 
};

export default resolvers; 

//KEEPING BELOW LINES AS REFERENCE!

// // get a single user by either their id or their username
// export const getSingleUser = async (req: Request, res: Response) => {
//   const foundUser = await User.findOne({
//     $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }],
//   });

//   if (!foundUser) {
//     return res.status(400).json({ message: 'Cannot find a user with this id!' });
//   }

//   return res.json(foundUser);
// };

// // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
// export const createUser = async (req: Request, res: Response) => {
//   const user = await User.create(req.body);

//   if (!user) {
//     return res.status(400).json({ message: 'Something is wrong!' });
//   }
//   const token = signToken(user.username, user.password, user._id);
//   return res.json({ token, user });
// };

// // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// // {body} is destructured req.body
// export const login = async (req: Request, res: Response) => {
//   const user = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
//   if (!user) {
//     return res.status(400).json({ message: "Can't find this user" });
//   }

//   const correctPw = await user.isCorrectPassword(req.body.password);

//   if (!correctPw) {
//     return res.status(400).json({ message: 'Wrong password!' });
//   }
//   const token = signToken(user.username, user.password, user._id);
//   return res.json({ token, user });
// };

// // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
// // user comes from `req.user` created in the auth middleware function
// export const saveBook = async (req: Request, res: Response) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.user._id },
//       { $addToSet: { savedBooks: req.body } },
//       { new: true, runValidators: true }
//     );
//     return res.json(updatedUser);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err);
//   }
// };

// // remove a book from `savedBooks`
// export const deleteBook = async (req: Request, res: Response) => {
//   const updatedUser = await User.findOneAndUpdate(
//     { _id: req.user._id },
//     { $pull: { savedBooks: { bookId: req.params.bookId } } },
//     { new: true }
//   );
//   if (!updatedUser) {
//     return res.status(404).json({ message: "Couldn't find user with this id!" });
//   }
//   return res.json(updatedUser);
// };
