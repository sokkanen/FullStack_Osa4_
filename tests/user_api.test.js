const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

/*beforeAll( async () => {
    jest.setTimeout(30000);
    await oneBlog.save()
})*/

describe('tests with broken new user', () => {

test('adding a user with no username returns status 400', async () => {
        const faultyUser = {
            "name": "Jamppa Tuominen",
            "password": "salainen1"
        }
        await api
        .post('/api/users')
        .send(faultyUser)
        .expect(400)
        .expect('{"error":"no password or username"}')
    })

test('adding a user with no password returns status 400', async () => {
    const faultyUser = {
        "username":"jampukka",
        "name": "Jamppa Tuominen"
    }
    await api
    .post('/api/users')
    .send(faultyUser)
    .expect(400)
    .expect('{"error":"no password or username"}')
    })

test('adding a user with password too short returns status 400', async () => {
    const faultyUser = {
        "username":"jampukka",
        "name": "Jamppa Tuominen",
        "password": "12"
    }
    await api
    .post('/api/users')
    .send(faultyUser)
    .expect(400)
    .expect('{"error":"password or username too short (min 3 characters)"}')
    })

test('adding a user with username too short returns status 400', async () => {
    const faultyUser = {
        "username":"ja",
        "name": "Jamppa Tuominen",
        "password": "salainen1"
    }
    await api
    .post('/api/users')
    .send(faultyUser)
    .expect(400)
    .expect('{"error":"password or username too short (min 3 characters)"}')
    })
})


afterAll(() => {
    mongoose.connection.close()
})