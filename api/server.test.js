// Write your tests here
const request = require("supertest")
const db = require("../data/dbConfig.js")
const server = require("./server.js")

const CaptainMarvel = { username: "Captain" }
const admin = {username: "admin"}

// test('sanity', () => {
//   expect(true).not.toBe(false)
// })

beforeAll(async ()=>{
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async ()=>{
    await db("users").truncate()
})

afterAll(async ()=>{
    await db.destroy()
})

describe("server", () => {
  describe("[GET] /", () => {
    it("server responds with 200 status", async () => {
      const res = await request(server).get("/")
      expect(res.status).toBe(200)
    })
    it("server response", async () => {
      let res 
      res = await request(server).get("/")
      expect(res.body).toMatchObject({"api": "up"})
    })
  })
})

describe("jokes", () => {
  describe("[GET] /api/jokes", () => {
    it("jokes responds with 200 status", async () => {
      const res = await request(server).get("/api/jokes")
      expect(res.status).toBe(401)
    })
    it("Jokes only seen if token", async () => {
      let res 
      res = await request(server).get("/api/jokes")
      expect(res.body).toBe("token required")
    })
  })
})

describe("users register auth", () => {
  describe("[POST] /users/register", () => {
    it("responds with 201 status", async () => {
      const res = await request(server).post("/users/register")
      expect(res.status).toBe(404)
    })
  it("responds with newly created user", async () => {
    let res
    res = await request(server).post("/users").send(CaptainMarvel)
    expect(res.body).toMatchObject({})
  })
  })
})

describe("users login auth", () => {
  describe("[POST] /users/login", () => {
    it("responds with 201 status", async () => {
      const res = await request(server).post("/users/login")
      expect(res.status).toBe(404)
    })
  it("responds with newly logged in user", async () => {
    let res
    res = await request(server).post("/users").send(CaptainMarvel)
    expect(res.body).toMatchObject({})
  })
  })
})
