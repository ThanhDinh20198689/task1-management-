const express = require('express'); // Import thư viện express
require('dotenv').config()
const database = require(`./config/database.js`);
const bodyParser = require('body-parser')// nhúng thư viện chuyển đổi dữ liệu từ form của html để js đọc hiểu được nghĩa là bên backend có thể truy cấp req.body
const cors = require('cors')

const routerApiVer1= require(`./api/v1/routers/index.router.js`)

database.connect();
const app = express(); // Tạo một ứng dụng express
const port = process.env.PORT; // Đặt cổng để server lắng nghe

//nào mà muốn fontend truy cập API của bạn thì thêm đoạn code dưới này vào
// var corsOptions = {
//   origin: 'http://example.com',  // thay tên miền của bên fontend vào dây
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
// app.use(cors(corsOptions));

app.use(cors()) // cho phép server của mình chấp nhận và xử lý các yêu cầu từ một domain khác. Điều này cần thiết khi bạn phát triển các ứng dụng web mà front-end và back-end chạy trên các domain hoặc cổng khác nhau.

// parse application/json
app.use(bodyParser.json())  //cái này sẽ lấy được req.body từ chuỗi JSON thuộc thư viện bodyParser

//API routers
routerApiVer1(app);

// Bắt đầu server và lắng nghe trên cổng đã định nghĩa
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});