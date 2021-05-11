import mongoose from 'mongoose'
import supertest from 'supertest'
import Users from "../models/User";
import router from './users'

// jest.mock('express', () => ({
//   Router: () => ({get: jest.fn() , post: jest.fn()})
// }))

// beforeEach(() => {
//   let server
//   jest.clearAllMocks()
//   server = router()
// })

const userBody = {
      name : "John Doe",
      email: "John@gmail.com",
      password: "test"
    }

const request = supertest(router)

describe('hitting endpoints', () => {
  it('should register a new user', async done => {
    const response = await request.post('/register')
    expect(response.status).toBe(200)
    //expect(response.body).toBe(userBody)
    done()

  //   const response = await router.post("/register")
  //   //const hashed = await bcrypt.hash('foo', 10)
  //  .send({
  //     name : "John Doe",
  //     email: "John@gmail.com",
  //     password: "test"
  //   })
  //   done()
    
    // router.post("/register", async(req, res) => {
    //   const hashed = await bcrypt.hash('foo', 10)

      // const newUser = new Users({
      //   name : "John Doe",
      //   email: "John@gmail.com",
      //   password: hashed
      // })

    //   await newUser.save()
    //   expect(res.body).toHaveProperty('post')

    // })

   

    // const res = await request(app)
    //   .post('/register')
    //   .send({
    //     userId: 1,
    //     title: 'test is cool',
    //   })
    
  })
})