import express from "express";
import mongoose from 'mongoose';

import createServer from "./server";

// Connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = createServer();
   
    app.listen(3000, () => {
      console.log("Server has started!");
    });
  });
