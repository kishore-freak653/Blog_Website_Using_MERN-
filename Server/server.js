// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/Blog.js"
// import cookieParser from "cookie-parser";
// const app = express();
// const PORT = 8000;


// //DataBase Connection
// connectDB();
// app.get('/',(req,res)=>{
//   res.send("API is Running...")
// })

// // Middleware for parsing cookies
// app.use(cookieParser()); // Add this line to parse cookies

// //CORS 
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["POST", "GET", "PUT", "DELETE"],
//     credentials: true, // Allow credentials (cookies, authorization headers)
//   })
// );

// //Json parse MiddleWare 
// app.use(express.json());

// app.use(express.static("public/upload"));

// //api routes
// app.use("/api/auth",authRoutes);



// //Server Connection
// app.listen(PORT,(err)=>{
//   if(err){
//     console.log("Error Connecting Server");
//   }
//   else{
//     console.log("Server Connected at PORT :",+PORT)
//   }
// })