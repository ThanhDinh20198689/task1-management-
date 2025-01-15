const TaskRouter= require(`./task.router`);
const UserRouter= require(`./user.router`);
const AuthMiddleware= require('../middleware/auth.middleware');
module.exports= (app)=>{         //đây là cú phát common js có tác dụng giống với "export const RouteOfClient=()=>{} "

    const version = "/api/v1";
    
   app.use(version + "/tasks",AuthMiddleware.requireAuth,TaskRouter);

   app.use(version + "/users",UserRouter);


    
}