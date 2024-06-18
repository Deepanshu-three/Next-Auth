import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please provide the username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide the email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide the password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyTokenExpiry: Date,
    verifyToken: String

})

const User = mongoose.model.users || mongoose.model("user", userSchema)

export default User