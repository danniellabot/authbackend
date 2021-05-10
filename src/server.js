import express from "express";
import mongoose from 'mongoose'
import dotenv  from "dotenv"
import users from './api/users'

dotenv.config()

const app = express();

app.use(express.json())

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		const app = express()
		app.use(express.json()) 
		app.use("/api/users", users)

		app.listen(3001, () => {
			console.log("Server has started!")
		})
	})
