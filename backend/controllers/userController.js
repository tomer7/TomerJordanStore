import AsyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import UserPerGoogle from '../models/userPerGoogleModel.js'
import dotenv from 'dotenv'
dotenv.config()

// @desc     Auth user & get token.
// @route     POST  /api/users/login
// @access     Public
const authUser = AsyncHandler(async (req, res) => {
   const { email, password } = req.body
   const user = await User.findOne({ email: email })
   if (user && (await user.matchPassword(password))) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id, user.email)
      })
   } else {
      res.status(401)
      throw new Error('Invalid email or password')
   }
})

// @desc     Google - Auth user & get token
// @route     POST  Google
// @access     Public
// const authUserFromGoogle = AsyncHandler(async (req, res) => {
//    const googleId = req.body.googleId

//    const user = await User.findOne({ googleId: googleId })
//    if (user) {
//       res.json({
//          _id: user._id,
//          name: user.name,
//          googleId: user.googleId,
//          token: generateToken(user._id)
//       })
//    } else {
//       res.status(401)
//       throw new Error('Invalid email or password')
//    }
// })

// @desc     Register a new user.
// @route     POST  /api/users
// @access     Public
const registerUser = AsyncHandler(async (req, res) => {
   const { name, email, password } = req.body

   const userExists = await User.findOne({ email: email })

   if (userExists) {
      res.status(400)
      throw new Error('User Already Exists')
   }

   const user = await User.create({
      name,
      email,
      password
   })

   if (user) {
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         token: generateToken(user._id, user.email)
      })
   } else {
      res.status(400)
      throw new Error('Invalid user data')
   }
})

// @desc     Get user profile
// @route     GET  /api/users/profile
// @access     Private
const getUserProfile = AsyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)
   //const user = req.user

   if (user) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin
      })
   } else {
      res.status(404)
      throw new Error('User Not Found')
   }
})

// @desc     Update user profile
// @route     PUT  /api/users/profile
// @access     Private
const updateUserProfile = AsyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id)
   //const user = req.user

   if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      if (req.body.password) {
         user.password = req.body.password || user.password
      }

      const updatedUser = await user.save()

      res.json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin,
         token: generateToken(updatedUser._id)
      })
   } else {
      res.status(404)
      throw new Error('User Not Found')
   }
})

// @desc     Get all users
// @route     GET  /api/users
// @access     Private/Admin
const getUsers = AsyncHandler(async (req, res) => {
   const users = await User.find({})
   res.json(users)
})

// @desc     Post the user google for now
// @route     POST  /userpergoogle
// @access     Public
const getUsersPerGoogle = AsyncHandler(async (req, res) => {
   const users = await UserPerGoogle.find({})
   let user
   for (let i = 0; i < users.length; i++) {
      user = users[i]
   }

   const userExists = await User.findOne({ googleId: user.googleId })

   if (!userExists) {
      const userNew = await User.create({
         name: user.name,
         email: 'haha@walla.com',
         password: 'hyt6544323',
         isAdmin: false,
         googleId: user.googleId
      })
      //User.save()
      if (userNew) {
         res.status(201).json({
            _id: userNew._id,
            name: userNew.name,
            email: userNew.email,
            isAdmin: userNew.isAdmin,
            token: generateToken(userNew._id, userNew.email)
         })
      } else {
         res.status(400)
         throw new Error('Invalid user data')
      }
   } else {
      res.status(201).json({
         _id: userExists._id,
         name: userExists.name,
         email: userExists.email,
         isAdmin: userExists.isAdmin,
         token: generateToken(userExists._id, userExists.email)
      })
   }
})

// @desc     Post the user github for now
// @route     POST  /userpergithub
// @access     Public
// const getUsersPerGithub = AsyncHandler(async (req, res) => {
//    const users = await UserPerGithub.find({})
//    let user
//    for (let i = 0; i < users.length; i++) {
//       user = users[i]
//    }

//    const userExists = await User.findOne({ githubId: user.githubId })

//    if (!userExists) {
//       const userNew = await User.create({
//          name: user.name,
//          email: 'haha222@walla.com',
//          password: 'hyt6544323',
//          isAdmin: false,
//          googleId: user.githubId
//       })
//       if (userNew) {
//          res.status(201).json({
//             _id: userNew._id,
//             name: userNew.name,
//             email: userNew.email,
//             isAdmin: userNew.isAdmin,
//             token: generateToken(userNew._id, userNew.email)
//          })
//       } else {
//          res.status(400)
//          throw new Error('Invalid user data')
//       }
//    } else {
//       res.status(201).json({
//          _id: userExists._id,
//          name: userExists.name,
//          email: userExists.email,
//          isAdmin: userExists.isAdmin,
//          token: generateToken(userExists._id, userExists.email)
//       })
//    }
// })

// @desc     Delete user
// @route     DELETE  /api/users/:id
// @access     Private/Admin
const deleteUser = AsyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)
   if (user) {
      await user.remove()
      res.json('User Removed!')
   } else {
      res.status(404)
      throw new Error('User Not Found')
   }
})

// @desc     Get user by id
// @route     GET  /api/users/:id
// @access     Private/Admin
const getUserById = AsyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id).select('-password')
   if (user) {
      res.json(user)
   } else {
      res.status(404)
      throw new Error('User Not Found')
   }
})

// @desc     Update user - By Admin
// @route     PUT  /api/users/:id
// @access     Private/Admin
const updateUser = AsyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id)

   if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      // if (req.body.password) {
      //    user.password = req.body.password || user.password
      // }
      user.isAdmin = req.body.isAdmin

      const updatedUser = await user.save()

      res.json({
         _id: updatedUser._id,
         name: updatedUser.name,
         email: updatedUser.email,
         isAdmin: updatedUser.isAdmin
      })
   } else {
      res.status(404)
      throw new Error('User Not Found')
   }
})

export {
   authUser,
   registerUser,
   getUserProfile,
   updateUserProfile,
   getUsers,
   getUsersPerGoogle,
   deleteUser,
   getUserById,
   updateUser
}
