const Task = require("../model/task.model");

const objectPaginationHelper = require(`../../../helper/pagination.helper`);


// [GET] api/v1/tasks
module.exports.index = async (req, res) => {
    const user= res.locals.user.id;
    const find = {
        $or: [              // 1 trong 2 tường hợp dưới nghĩa là có id của createdBy hoặc có id trong listUser thì show những task liên quan đến người dùng đó
            { createdBy: user } ,
            { listUser: user }
        ],
        deleted: false
    };

    //Filter status
    if (req.query.status) {
        find.status = req.query.status;
    }
    // end Filter status
    // sort
    const sort = {};  // để object sort rỗng tồi thêm tiêu chí sắp xếp theo request.query sau
    //Nếu sort rỗng (tức là không xác định tiêu chí sắp xếp), thì dữ liệu sẽ được trả về theo thứ tự mặc định của cơ sở dữ liệu, hoặc không được sắp xếp theo bất kỳ tiêu chí cụ thể nào.

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    // end sort

    //objectPagination
    const totalTasks = await Task.countDocuments(find); // Product.countDocuments(): hàm đếm số bản ghi 
    const Maxtaskslimit = await Task.countDocuments(find); // Product.countDocuments(): hàm đếm số bản ghi 
    const objectPagination = objectPaginationHelper(totalTasks, req.query, Maxtaskslimit); // tương ứng với (totalProduct,query,limitItems) bên objectPaginationHelper
    console.log(objectPagination);
    //end objectPagination

    //Search
    if (req.query.keyword) {
        const regex = new RegExp(req.query.keyword, "i"); // sẽ tạo ra cú pháp regex = /request.query.keyword/i --- đây chỉ là tìm kiếm cơ bản
        // console.log(`${regex}`);
        find.title = regex;  // mongoose có hỗ trợ cú pháp regex
    }
    //endSearch

    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    console.log(tasks);
    // res.send('Danh sach cong viec');
    res.json(tasks);
};

// [GET] api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {

    const id = req.params.id;
    const tasks = await Task.find({
        _id: id,
        deleted: false
    })


    res.json(tasks);
};

// [PATCH] api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {

    try {
        const id = req.params.id;
        const status = req.body.status;  //cái này trong API sẽ lấy dữ liệu từ body nhập trong POSTMAN thông qua dưới dạng JSON nhưng được thư viện bodyParser biên dịch thành dữ liệu dạng JS
        // console.log(req.body);

        await Task.updateOne({
            _id: id
        }, {
            status: status
        })

        res.json({
            code: 200,
            message: " cập nhật trạng thái thành công !"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: " cập nhật trạng thái không thành công !"
        });
    }
};

// [PATCH] api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {

    try {
        const { ids, key, value } = req.body; // dùng destructoring
        // console.log(ids);
        // console.log(key);
        // console.log(value);
 
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                })
                res.json({
                    code: 200,
                    message: " cập nhật trạng thái thành công !"
                });
                break;
            case "delete":
                await Task.updateMany({
                    _id: { $in: ids }
                }, {
                    deleted: true,
                    deletedAt: new Date()
                });
                res.json({
                    code: 200,
                    message: " xóa mềm thành công !"
                });


                break;

            default:
                res.json({
                    code: 400,
                    message: " cập nhật trạng thái không thành công !"
                });
                break;
        }

    } catch (error) {
        res.json({
            code: 400,
            message: " cập nhật trạng thái không thành công !"
        });
    }
};

// [POST] api/v1/tasks/create
module.exports.create = async (req, res) => {

    try {
        req.body.createdBy=res.locals.user.id;

        const task = new Task(req.body);
        const data = await task.save();

        res.json({
            code: 200,
            message: " tạo thành công !",
            data: data
        });



    } catch (error) {
        res.json({
            code: 400,
            message: " Lỗi !"
        });
    }
};


// [PATCH] api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {

    try {
        const id = req.params.id;

        const data = await Task.updateOne({
            _id: id
        }, req.body);

        const findData = await Task.find({
            _id: id
        });

        res.json({
            code: 200,
            message: " sửa thành công !",
            data: findData
        });



    } catch (error) {
        res.json({
            code: 400,
            message: " Lỗi !"
        });
    }
};

// [DELETE] api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {

    try {
        const id = req.params.id;

        await Task.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: new Date()
        });

        const findData = await Task.find({
            _id: id
        });

        res.json({
            code: 200,
            message: " xóa mềm thành công !",
            data: findData
        });



    } catch (error) {
        res.json({
            code: 400,
            message: " Lỗi !"
        });
    }
};
