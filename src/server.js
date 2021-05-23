import express from "express";
import router from "./api/router";

const createServer = () => {
  const app = express()
	app.use(express.json())
	app.use("/api", router)
	return app
}

export default createServer

// dotenv.config();

// const app = express();

// app.use(express.json());

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', process.env.MONGO_URI)
// })

// db.on('error', err => {
//   console.error('connection error:', err)
// })


// app.use("/api/users", router);

// if(process.env.NODE_ENV !== 'test'){
//   app.listen(6001, () => {
//     console.log("Server has started 6001!");
//   });
// }


// mongoose
// 	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 	.then(() => {
// 		// app.use(express.json())
// 		app.use("/api/users", router)

// 		app.listen(3001, () => {
// 			console.log("Server has started!")
// 		})
// 	})

//export default app