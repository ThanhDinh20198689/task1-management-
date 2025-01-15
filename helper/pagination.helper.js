module.exports=  (totalProduct,query,limitItems)=>{

    const objectPagination={       // tạo object chứa các giá trị để phẩn trang-- nếu không có query thì nó sẽ mặc định currentPage=1
        currentPage:1,
        limitItems:limitItems,
        // totalPage: ??- tý thêm ở ngoài sau
        // skip: ??- dưới này cũng thế
   };
   
   
  
   
   
   objectPagination.totalPage= Math.ceil(totalProduct/objectPagination.limitItems);// Math.ceil() để làm tròn lên -- thêm key totalPage vào objectPagination
//    console.log(  objectPagination.totalPage);
   
   //Pagination
   if(query.page){
       objectPagination.currentPage= parseInt(query.page);// chia trang,  parseInt(): chuyển string  thành interger
   }
   if(query.limit){ // nếu query cho chuyền limit thì thay đổi limitItems không thì vẫn theo mặc định chuyền vào
       objectPagination.limitItems= parseInt(query.limit);// chia trang,  parseInt(): chuyển string  thành interger
        //   console.log(  objectPagination.limitItems);

   }
   objectPagination.skip=(objectPagination.currentPage-1)*objectPagination.limitItems;  // skip ở đây sẽ skip bao nhiêu phần tử trước đó  -- thêm key skip vào objectPagination
   //end Pagination
   return objectPagination;
}