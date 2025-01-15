const express = require("express");// nhung module của framework Express vào chương trình
const router = express.Router();//tạo ra 1 nhánh con của đối tượng ứng dụng Express chính "app"

const Task = require(`../model/task.model.js`);

const controller = require(`../controllers/task.controller.js`)

router.get('/', controller.index);

router.get('/detail/:id', controller.detail);

router.patch('/change-status/:id', controller.changeStatus);

router.patch('/change-multi', controller.changeMulti);

router.post('/create', controller.create);

router.patch('/edit/:id', controller.edit);

router.delete('/delete/:id', controller.delete);





module.exports = router;  // router sẽ sử dụng những phương thức vừa đc gắn vào 