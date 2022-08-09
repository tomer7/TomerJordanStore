import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import findOrCreate from 'mongoose-findorcreate'

const userPerGoogleSchema = mongoose.Schema(
   {
      googleId: String,
      name: String
   },
   {
      timestamps: true
   }
)

// userPerGoogleSchema.methods.matchPassword = async function (enteredPassword) {
//    return await bcrypt.compare(enteredPassword, this.password)
// }

// userPerGoogleSchema.pre('save', async function (next) {
//    if (!this.isModified('password')) {
//       next()
//    }

//    const salt = await bcrypt.genSalt(10)
//    this.password = await bcrypt.hash(this.password, salt)
// })

userPerGoogleSchema.plugin(findOrCreate)

const UserPerGoogle = mongoose.model('UserPerGoogle', userPerGoogleSchema)

export default UserPerGoogle
