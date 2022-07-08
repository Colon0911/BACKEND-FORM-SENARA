import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const { model, Schema } = mongoose

const userSchema = new Schema({
    identificationType: {
        type: String,
        required: true,
        trim: true,
    },
    identification: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    token: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    province: {
        type: String,
        required: false,
        trim: true
    },
    canton: {
        type: String,
        required: false,
        trim: true
    },
    district: {
        type: String,
        required: false,
        trim: true
    },
    exactAddress: {
        type: String,
        required: false,
        trim: true
    }
}, {
    versionKey: false,
})

// Hash password
userSchema.pre("save", async function (next) {
    const user = this
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
})

userSchema.pre("findOneAndUpdate", async function () {
    this._update.password = await bcrypt.hash(this._update.password, 10)
})

// Compare Passwords
userSchema.methods.comparePassword = async function (pass) {
    const user = this
    return await bcrypt.compare(pass, user.password)
}

export default model("User", userSchema)