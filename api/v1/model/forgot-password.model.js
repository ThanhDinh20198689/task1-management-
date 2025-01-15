const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            default: Date.now,
            expires: 1 // // OTP sẽ tự động xóa sau 1 giây kể từ 'expireAt'
        }
    },
    {
        timestamps: true,
    }
);

const ForgotPassword = mongoose.model(
    "ForgotPassword", 
    forgotPasswordSchema,
    "forgot-password"
);

module.exports = ForgotPassword;