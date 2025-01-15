const User = require("../model/user.model");

module.exports.requireAuth = async (req,res,next)=> {
    try {
        console.log(req);
    console.log(req.headers.authorization); // do dùng lấy token trong API nên phải dùng cách này(truyền 1 cái token bất kì trong postman để test)

    if(req.headers.authorization){
        console.log(req.headers.authorization.split(" "));
        const token= req.headers.authorization.split(" ")[1];

        const user = await User.findOne({
            token:token,
            deleted: false

        });
        if(!user){
            res.json({
                code: 400,
                message: "ko có quyền truy cập !"
        
            });
        }else {
            res.locals.user = user;
            next();
        }

    }else{
        res.json({
            code: 400,
            message: "chả tìm thấy thông tin chi tiếtcủa user xin điền lại token !"
    
        });
    }
    } catch (error) {
        res.json({
            code: 400,
            message: "lỗi authen !"
    
        });
    }

 

}