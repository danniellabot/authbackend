import request from "supertest";
import bcrypt from "bcryptjs";
import mongoose from 'mongoose'
import app from "../src/server";
import User from '../src/models/User'

beforeEach(async () => {
  await User.deleteMany({})
  const url = `mongodb://127.0.0.1/avengers`;
  await mongoose.connect(url, { useNewUrlParser: true });
  const user = await User.findOne({ email: "testing@gmail.com" })
  console.log(user)
})

afterEach(async () => {
  await app.close()
})


describe("it should allow user to register and return JWT when logging in", () => {

  // beforeAll(async () => {
  
  // })

  
  it.only("should register a new user", async () => {
    const hashed = await bcrypt.hash("foo", 10);
    const userBody = {
      email: "testing@gmail.com",
      name: "John Doe",
      password: hashed,
    };

    const response = await request(app)
      .post("/api/users/register")
      .send(userBody);
    expect(response.status).toBe(200);

    const user = await User.findOne({ email: "testing@gmail.com" })
    // user.password is ######
    // userBody.password is ##### 
    // const cmp = await bcrypt.compare("foo", user.password);
    // console.log(user.password)
    // console.log(userBody.password)
    //const hashed2 = await bcrypt.hash(user.password, 10)
    expect(user.name).toBe('John Doe');
    expect(user.email).toBeTruthy();
    // expect(cmp).toBeTruthy()
  
  });

  it('should return error when info is missing to register', async () => {
  // const response = await request(app)
  // expect(response).toThrowError('Something went wrong')
  })

  it('should login when given correct email and password', async () => {
    // it should find email in db 
   
    
    // it should match password db with body passowrd 

    // it should return jwt token 


  })


  it("It should response the GET method", async () => {
    // const response = await request(app).get("/api/users/sample");
    // expect(response.statusCode).toBe(200);
  });
});
