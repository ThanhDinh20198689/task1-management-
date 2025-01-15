const express = require("express");// nhung module của framework Express vào chương trình
const router = express.Router();//tạo ra 1 nhánh con của đối tượng ứng dụng Express chính "app"



const controller = require(`../controllers/user.controller.js`)

const authmiddleware= require('../middleware/auth.middleware.js');

router.post('/register', controller.register);

router.post('/login', controller.login);

router.post('/password/forgot', controller.forgotPassword);

router.post('/password/otp', controller.otpPassword);

router.post('/password/reset', controller.resetPassword);

router.get('/detail',authmiddleware.requireAuth, controller.detail);

router.get('/list',authmiddleware.requireAuth, controller.list); // API để trả ra danh sách các user để gọi ý cho ông muốn thêm người tham gia vào task





module.exports = router;  // router sẽ sử dụng những phương thức vừa đc gắn vào