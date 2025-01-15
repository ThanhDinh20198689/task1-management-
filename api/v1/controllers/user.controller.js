const md5 = require('md5');
const User = require('../model/user.model');

const generateHelper = require(`../../../helper/generate.helper`);
const ForgotPassword = require('../model/forgot-password.model');
const sendMailHelper = require('../../../helper/send-mail.helper');


// [POST] api/v1/user/register
module.exports.register = async (req, res) => {



    const emailExist = await User.findOne({ // check xem có email đó chưa rồi mới tạo
        email: req.body.email,
    })

    if (emailExist) {
        res.json({
            code: 400,
            message: "Email đã tồn tại !"
        });
    } else {
        req.body.password = md5(req.body.password); // thư viện md5 để mã hóa mật khẩu
        req.body.token = generateHelper.generateRandomString(5);

        const user = new User(req.body);
        const data = await user.save();
        // console.log(data);


        res.json({
            code: 200,
            message: "tạo tài khoản thành công !",
            token: data.token,
            data: data
        });
    }


};
// [POST] api/v1/user/login
module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        res.json({
            code: 400,
            message: "Email không tồn tại !",

        });
        return;
    }

    if (md5(password) != user.password) {
        res.json({
            code: 400,
            message: "Sai mật khẩu !",

        });
        return;
    }

    const token = user.token;



    res.json({
        code: 200,
        message: "tạo tài khoản thành công !",
        token: token
    });
}

// [POST] api/v1/user/password/forgot
module.exports.forgotPassword = async (req, res) => {


    try {
        const email = req.body.email;

        const emailExist = await User.findOne({
            email: email,
            deleted: false
        });

        if (!emailExist) {
            res.json({
                code: 400,
                message: "email không tồn tại !",
            });
            return;
        };

        const otp = generateHelper.generateRandomNumber(6);

    //việc 1: lưu vào database để khi nào đến bước xác thực otp thì nó xác thực với otp trong database
        const objectForgotPassword = {
            email: email,
            otp: otp,
            expireAt: Date.now() + 5 * 60 * 1000 // tại vì cho hết hạn sau 5 phút phải đổi hết sang mili giây
        };
        const forgotPassword = new ForgotPassword(objectForgotPassword); // lưu vào database
        await forgotPassword.save();

    //việc 2: gửi mã otp vào email của user
        const subject = "Mã OTP lấy lại mật khẩu ";
        const content = `Mã OTP lấy lại mật khẩu là:"${otp}".vui long không chia sẻ mã ra ngoài`;

        sendMailHelper.sendMail(email, subject, content);

        res.json({
            code: 200,
            message: "gửi OTP thành công !",
            otp: otp
        });
    } catch (error) {

        res.json({
            code: 400,
            message: "gửi OTP ko thành công !",

        });
    }
};

// [POST] api/v1/user/password/otp
module.exports.otpPassword = async (req, res) => {


    try {
        const email = req.body.email;
        const otp = req.body.otp;

        const result = await ForgotPassword.findOne({
            email: email,
            otp: otp
        });

        if (!result) {
            res.json({
                code: 400,
                message: "OTP không khớp !",

            });
            return;
        }

        const user = await User.findOne({  // nếu đúng otp thì gửi tokenUser của user đó lên cookie (coi như đăng nhập luôn) để cho việc đổi mật khẩu ở các bước sau

            email: email
        });



        res.json({
            code: 200,
            message: "Xác thực thành công !",
            token: user.token
        });
    } catch (error) {

        res.json({
            code: 400,
            message: "Xác thực ko thành công !",

        });
    }
};
// [POST] api/v1/user/password/reset
module.exports.resetPassword = async (req, res) => {


    try {

        const token = req.body.token;
        const password = req.body.password;

        const user = await User.findOne({       // check xem có user theo token không 
            token: token,
            deleted: false
        })

        if (!user) {    // nếu không thì
            res.json({
                code: 400,
                message: "người dùng không tồn tại !",

            });
        }

        await User.updateOne({
            token: token,

        }, {
            password: md5(password)
        })

        res.json({
            code: 200,
            message: "reset password thành công !",

        });
    } catch (error) {

        res.json({
            code: 400,
            message: "reset password ko thành công !",

        });
    }
};

module.exports.detail= async(req,res)=>{

    // const id= req.params.id;
    // console.log(id);

    // const user= await User.findOne({
    //     _id: id,
    //     deleted: false
    // }).select("-password -token");

    console.log(res.locals.user);
    res.json({
        code: 200,
        message: "chả thông tin chi tiết  thành công !",
        infor:  res.locals.user

    });
}

module.exports.list= async(req,res)=>{

    
    //console.log(res.locals.user);
    const user = await User.find({
        deleted:false
    }).select("id fullName email")
    res.json({
        code: 200,
        message: "chả thông tin tất cả user  thành công !",
        user:  user

    });
}