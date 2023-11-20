import  request from "supertest";
import { app } from "../index";

/// testing
////User registration: test1 - creating user that doesnt exist,
/// User registration: test2 - try to create a user that already exists
/// Test user: {firstName: 'test', email: 'test@gmail.com', password: 'test'}

describe("POST /register", () => {
  it("return status code 201 on registration",async () =>{
    const res = await request(app)
    .post("/register")
    .send({firstName: 'test', email: 'test@gmail.com', password: 'test'})
    expect(res.status).toBe(201)
  })
})

describe("POST /register", () => {
  it("return status code 409 if user already exists when registring new user",async () =>{
    const res = await request(app)
    .post("/register")
    .send({firstName: 'test', email: 'test@gmail.com', password: 'test'})
    expect(res.status).toBe(409)
  })
})


/// user login and logout
///// {firstName: 'test', email: 'test@gmail.com', password: 'test'}

describe("POST /login", () => {
  it("return status code 200 if login is successful", async () => {
    const res = await request(app)
      .post("/login")
      .send({firstName: 'test', email: 'test@gmail.com', password: 'test'});
    expect(res.status).toBe(200);
  });
});

describe("POST /login", () => {
  it("return status code 401 if login is unsuccessful as user credentials incorrect", async () => {
    const res = await request(app)
      .post("/login")
      .send({firstName: 'tesfsdst', email: 'testsdfsdf@gmail.com', password: 'tesdfsdfdst'});
    expect(res.status).toBe(401);
  });
});

describe('POST /logout', () => {
  it('should logout successfully', async () => {

    const loginRes = await request(app)
      .post('/login')
      .send({firstName: 'test', email: 'test@gmail.com', password: 'test'});

    // Then, use the session cookie to make a request to /logout
    const res = await request(app)
      .post('/logout')
      .set('Cookie', loginRes.headers['set-cookie'])
      .send();

    expect(res.status).toBe(200);
    // Add any other assertions you need to make about the response
  });
});

////add a task for a user {firstName: 'test', email: 'test@gmail.com', password: 'test'}

describe('POST /addTask', () => {
  it('should add test tasks successfully', async () => {

    const loginRes = await request(app)
      .post('/login')
      .send({firstName: 'test', email: 'test@gmail.com', password: 'test'});

    // Then, use the session cookie to make a request to /logout
    const res = await request(app)
      .post('/addTask')  
      .set('Cookie', loginRes.headers['set-cookie'])          
      .send({ index: 0, text: 'task1', done: false });

    expect(res.status).toBe(200);
    // Add any other assertions you need to make about the response
  });
});

///check for the task 

describe('POST /checktask', () => {
  it('should add test tasks successfully', async () => {

    const loginRes = await request(app)
      .post('/login')
      .send({firstName: 'test', email: 'test@gmail.com', password: 'test'});

    // Then, use the session cookie to make a request to /logout
    const res = await request(app)
      .post('/check')  
      .set('Cookie', loginRes.headers['set-cookie'])          
      .send({
        index: 0,
        text: 'task1',
        done: false,
        _id: '655b3493b13fe09392379279'
      });

    expect(res.status).toBe(200);
    // Add any other assertions you need to make about the response
  });
});

describe('POST /isChecked', () => {
  it('should check if task has been checked', async () => {

    const loginRes = await request(app)
      .post('/login')
      .send({firstName: 'test', email: 'test@gmail.com', password: 'test'});

    // Then, use the session cookie to make a request to /logout
    const res = await request(app)
      .post('/isChecked')  
      .set('Cookie', loginRes.headers['set-cookie'])          
      .send({
        index: 0,
        text: 'task1',
        done: true,
        _id: '655b3493b13fe09392379279'
      });


    expect(res.body).toBe(true)
    expect(res.status).toBe(201);
    // Add any other assertions you need to make about the response
  });
});


describe('GET /points', () => {
  it('should check if points is 2', async () => {

    const loginRes = await request(app)
      .post('/login')
      .send({firstName: 'test', email: 'test@gmail.com', password: 'test'});

    // Then, use the session cookie to make a request to /logout
    const res = await request(app)
    
      .get('/points')  
      .set('Cookie', loginRes.headers['set-cookie'])          
    
    const result = res.body
    console.log(result[0])  

    expect(result[0]).toBe(2)
    expect(res.status).toBe(200);
    // Add any other assertions you need to make about the response
  });
});


describe('GET /points', () => {
  it('should get the profile of the', async () => {

    const loginRes = await request(app)
      .post('/login')
      .send({firstName: 'test', email: 'test@gmail.com', password: 'test'});

    // Then, use the session cookie to make a request to /logout
    const res = await request(app)
    
      .get('/me')  
      .set('Cookie', loginRes.headers['set-cookie'])          
    
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{
      "_id": "655b3493b13fe09392379279",
      "done": true,
      "index": 0,
      "text": "task1",    
    }]);
    // Add any other assertions you need to make about the response
  });
});


describe('Delete task /remove', () => {
  it('delete the task when completed and return a 200', async () => {

    const loginRes = await request(app)
      .post('/login')
      .send({firstName: 'test', email: 'test@gmail.com', password: 'test'});

    // Then, use the session cookie to make a request to /logout
    const res = await request(app)
    
      .post('/remove')  
      .set('Cookie', loginRes.headers['set-cookie'])  
      .send({
        _id: "655b3493b13fe09392379279",
        done: true,
        index: 0,
        text: "task1",    
      })        
    
    expect(res.status).toBe(200);
    // Add any other assertions you need to make about the response
  });
});











