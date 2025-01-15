module.exports.generateRandomString = (length) => {                     // hàm này có tác dụng tạo ra chuỗi string(token) ngẫu nhiên
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    let result = "";
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  };

module.exports.generateRandomNumber = (length) => {                     // hàm này có tác dụng tạo ra chuỗi string(token) ngẫu nhiên
  const characters =
    "0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};