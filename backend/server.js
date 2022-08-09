import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import authRoute from './routes/auth.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cookieSession from 'cookie-session'
import passport from 'passport'
import cors from 'cors'
import User from './models/userModel.js'
import UserPerGoogle from './models/userPerGoogleModel.js'
import { getUsersPerGoogle } from './controllers/userController.js'
import { Strategy as GithubStrategy } from 'passport-github2'
dotenv.config()
connectDB()

const app = express()
// import passportSetup from './passport.js'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.CLIENT_ID_G,
         clientSecret: process.env.CLIENT_SECRET_G,
         callbackURL: '/auth/google/callback'
      },
      function (accessToken, refreshToken, profile, done) {
         UserPerGoogle.create({
            googleId: profile.id,
            name: profile.displayName
         })
         done(null, profile)
      }
   )
)

passport.use(
   new GithubStrategy(
      {
         clientID: process.env.CLIENT_ID_GH,
         clientSecret: process.env.CLIENT_SECRET_GH,
         callbackURL: '/auth/github/callback'
      },
      function (accessToken, refreshToken, profile, done) {
         UserPerGithub.create({
            githubId: profile.id,
            name: profile.displayName
         })
         done(null, profile)
      }
   )
)

passport.serializeUser((user, cb) => {
   cb(null, user)
})
passport.deserializeUser((user, cb) => {
   cb(null, user)
})

if (process.env.NODE_ENV === 'development') {
   app.use(morgan('dev'))
}

// allow us to accept JSON data in the body.
app.use(express.json())

app.use(
   cookieSession({
      name: 'session',
      keys: ['lama'],
      maxAge: 24 * 60 * 60 * 100
   })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(
   cors({
      origin: 'http://localhost:5000',
      methods: 'GET,POST,PUT,DELETE',
      credentials: true
   })
)

app.use('/auth', authRoute)

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
   res.send(process.env.PAYPAL_CLIENT_ID)
)
app.post('/userpergoogle', getUsersPerGoogle)
// app.post('/userpergithub', getUsersPerGithub)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, '/frontend/build')))

   app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
   )
} else {
   app.get('/', (req, res) => {
      res.send('API is running...')
   })
}

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
   PORT,
   console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
         .bold
   )
)
