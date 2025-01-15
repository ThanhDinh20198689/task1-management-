const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeFinish: Date,
    createdBy: String, // người tạo ra task
    listUser: Array,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema, "tasks");/*Giải thích từng tham số:

                                                                modelName (bắt buộc):
                                                                  Đây là tên của mô hình (model) mà bạn muốn tạo. Tên này sẽ được sử dụng để tham chiếu đến mô hình trong mã của bạn. Mongoose sẽ tự động chuyển tên này thành tên collection trong cơ sở dữ liệu bằng cách viết thường và số nhiều (nếu không cung cấp collectionName). Ví dụ:

                                                                  Nếu bạn đặt tên là "Task", Mongoose sẽ tạo và sử dụng collection có tên là "tasks".
                                                                
                                                                schema (bắt buộc):
                                                                  Đây là schema mà bạn đã định nghĩa trước đó. Schema mô tả cấu trúc của các tài liệu trong collection, bao gồm các trường và kiểu dữ liệu của chúng. Ví dụ:

                                                              
                                                                collectionName (tuỳ chọn):
                                                                  Đây là tên của collection mà mô hình sẽ liên kết trong MongoDB. Nếu không cung cấp tham số này, Mongoose sẽ tự động sử dụng tên mô hình (số nhiều, viết thường) làm tên collection. Ví dụ:

                                                                  Nếu bạn dùng mô hình "Task", Mongoose sẽ tự động sử dụng collection có tên là "tasks".
                                                                  Nếu bạn cung cấp tên collection, ví dụ "tasks", Mongoose sẽ sử dụng tên này.*/

module.exports = Task;