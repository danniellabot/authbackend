const mongoose = require("mongoose")
const createServer = require("./server")
const Users = require("./models/User") // new

beforeEach((done) => {
	mongoose.connect(
		"mongodb://localhost:27017/testdb",
		{ useNewUrlParser: true },
		() => done()
	)
})

afterEach((done) => {
	mongoose.connection.db.dropDatabase(() => {
		mongoose.connection.close(() => done())
	})
})

const app = createServer()

test("GET /posts", async () => {
	const post = await Post.create({
		title: "Post 1",
		content: "Lorem ipsum",
	})

	await supertest(app)
		.get("/api/posts")
		.expect(200)
		.then((response) => {
			// Check the response type and length
			expect(Array.isArray(response.body)).toBeTruthy()
			expect(response.body.length).toEqual(1)

			// Check the response data
			expect(response.body[0]._id).toBe(post.id)
			expect(response.body[0].title).toBe(post.title)
			expect(response.body[0].content).toBe(post.content)
		})
})