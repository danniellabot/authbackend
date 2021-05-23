import request from 'supertest'
import router2 from './app2'
import app2 from './server2'

describe('POST /users', ()=> {
    describe('given a username and password', () => {
        // should save the username and password 
        
        
        // should respond with a json object with the userid
        test('should return the userId', async () => {
            const response = await request(router2).post('/users').send({
                username: "username",
                password: "password"
            })
            expect(response.body.userId).toBeDefined()
        })
       
       
       
        // should respond with 200 status code
        test('should give 200', async () => {
            const response = await request(app2).post('/2/users').send({
                username: "username",
                password: "password"
            })
            expect(response.statusCode).toBe(200)
        })
        // should specify json in the content type header
        test('should specify json in content type header', async () => {
            const response = await request(app2).post('/users').send({
                username: "username",
                password: "password"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

    describe('when the username or password is incorrect', ()=>{
        // should respond with error message 
    })
}) 