const chai=require("chai")
const chaiHttp=require('chai-http')
const request = require('supertest');
const assert = require('assert');
//const should = require('should');
const db = require('../models');
const Profile=require("../routes/profile.routes")
const ProfileController=require("../controllers/profile.controller")
const Fuel=require("../routes/fuel.routes")
const FuelController=require("../controllers/fuel.controller")
const app=require("../index").app;
const { STATUS_CODES } = require("http");



const expect = chai.expect;
chai.should();
chai.use(chaiHttp)

//testing profile

describe("Test APIs",()=>{
    describe("Test GET route /api/profile",()=>{
        it("it should return all profile",()=>{
           return request('http://localhost:8000/api/profile').get('/getall')
           .then(function(res,err){
               res.should.to.be.a("object")
               expect(res.body.data.length).not.equal(0)
               
               
               res.should.have.status(200);
               
            
           }).catch((err)=>{
               console.log(err)
           })
        })
        
    

    })
    describe("Test POST route /api/profile",()=>{
        it("it should return new profile",()=>{
            let profile={
                slug:4,
                fullname:"testtttt",
                email:"cailon7@reamul.com",
                address1:"dsadsad",
                city:"dasdas",
                state:"TX",
                zipcode:"123456789",
                user:4
              
                
            }
            return request('http://localhost:8000/api/profile')
            .post('/create')
            .send(profile)
            // .expect(200)
            .then((res)=>{
                res.should.have.status(200);
                expect(res.text).equal("OK")
                //console.log(res.text)
                
               
                
            }).catch((err)=>{
                console.log(err)
            });
        })

    })

    describe("Test POST route /api/profile",()=>{
        it("it should return error in creating profile",()=>{
            let profile={
                slug:3,
                fullname:"testtttt",
                email:"cailon7@reamul.com",
                address1:"dsadsad",
                city:"dasdas",
                state:"TX",
                zipcode:"123456789",
                user:3
                
            }
            return request('http://localhost:8000/api/profile')
            .post('/create')
            .send(profile)
            // .expect(200)
            .then((res)=>{
                res.should.have.status(404);
                expect(res.text).equal("information must be unique")
                //console.log(res.text)
                
               
                
            }).catch((err)=>{
                console.log(err)
            });
        })

    })



    describe("Test Get route /api/profile",()=>{
        it("it should return one profile",()=>{
            
            return request('http://localhost:8000/api/profile')
            .get('/find/2')
            
           
            .then((res)=>{
                res.should.have.status(200);
                //console.log(res.body.message)
                res.should.to.be.a("object")
                expect(res.body.message).equal("OK")
            }).catch((err)=>{
                console.log(err)
            });
        })

    })

    describe("Test PUT route /api/profile",()=>{
        it("it should return updated profile",()=>{
            let profile={address1:"qwerty",state:"CA",zipcode:"123456789",city:"dasdasdas"}
            return request('http://localhost:8000/api/profile')
            .put('/update/1')
            .send(profile)
           
            .then((res)=>{
                res.should.have.status(200);
                //console.log(res.body.message)
                console.log("test put")
               
                
            }).catch((err)=>{
                console.log(err)
            });
        })

    })



    describe("Test DELETE route /api/profile",()=>{
        it("it should return ok",()=>{
            //let profile={address1:"qwerty",state:"CA",zipcode:"123456789",city:"dasdasdas"}
            return request('http://localhost:8000/api/profile')
            .delete('/delete/3')
            
           
            .then((res)=>{
                res.should.have.status(200);
                //console.log(res.body.message)
                console.log("test delete")
               
                
            }).catch((err)=>{
                console.log(err)
            });
        })

    })

})


//testing fuel

describe("Test APIs",()=>{
    describe("Test GET route /api/fuel",()=>{
        it("it should return all fuel",(done)=>{
           chai.request(app).get('/api/fuel/getall')
           .then(function(response,err){
                response.body.should.to.be.a("array")
                expect(response.status).equal(200)
               expect(response.status).not.equal(404)
               
               done()
            
           })
        })
        
    

    })
    describe("Test POST route /api/fuel",()=>{
        it("it should return a profile with fuel",()=>{
            
            chai.request(app)
            .get('/api/fuel/gethist/1')
            
            // .expect(200)
            .then((res,err)=>{
                expect(res.status).equal(200);
                // expect(res.text).equal("OK")
                //console.log(res)
                
               
                
            })
        })

    })

    describe("Test POST route /api/fuel",()=>{
        it("it should return error in profile with fuel",()=>{
            
            chai.request(app)
            .get('/api/fuel/gethist/1')
            
            // .expect(200)
            .then((res,err)=>{
                expect(res.status).equal(404);
                // expect(res.text).equal("OK")
                //console.log(res)
                
               
                
            })
        })

    })

    describe("Test POST route /api/fuel",()=>{
        it("it should return in creating fuel",()=>{
            let fuel={
                slug:5,
                gallon:"900000",
                date:"03/12/2021",
                profile:5
                
            }
            chai.request("http://localhost:8000/api/fuel")
            .post('/create')
            .send(fuel)
            // .expect(200)
            .then((res,err)=>{
                res.should.have.status(200);
                //expect(res.text).equal("information must be unique")
                //console.log("dasdasda")

            })
        })

        

    })

    describe("Test POST route /api/fuel",()=>{
        it("it should return in creating fuel",()=>{
            let fuel={
                slug:5,
                gallon:null,
                date:null,
                profile:5
                
            }
            chai.request("http://localhost:8000/api/fuel")
            .post('/create')
            .send(fuel)
            // .expect(200)
            .then((res,err)=>{
                res.should.have.status(400);
                //expect(res.text).equal("information must be unique")
                //console.log("dasdasda")

            })
        })

        

    })
    

    describe("Test POST route /api/fuel",()=>{
        it("it should return in creating fuel",()=>{
            let fuel={
                slug:3,
                gallon:"900000",
                date:"03/12/2021",
                profile:3
                
            }
            chai.request("http://localhost:8000/api/fuel")
            .post('/create')
            .send(fuel)
            // .expect(200)
            .then((res,err)=>{
                res.should.have.status(400);
                expect(res.text).equal("information must be unique")
                //console.log("dasdasda")
                
               
                
            })
        })
    })

    describe("Test SERVER",()=>{
        it("it should return hello",()=>{
            return request(app)
            .get('/')
            // .expect(200)
            .then((res,err)=>{
                expect(res.body.message).equal("hello")
               
                
            })
        })
    })

    describe("Test REGISTER",()=>{
        it("it should return error with same user",()=>{
            let user={
                username:"dcmCLCC",
                password:"123456789",
                passwordConfirm:"12345677890"
            }
            return request(app)
            
            .post('/api/users/register')
            .send(user)
            .then((res)=>{
                
                //console.log(res)
                const check=db.user.findOne({
                    where:{
                        username:user.username
                    }
                })
                
                if(check)
                {
                    expect(res.status).equal(200)
                    expect(res.text).equal("OK")
                }
               
                
            }).catch(err=>{
                console.log(err)
            })
        })
    })


    describe("Test REGISTER",()=>{
        it("it should return error with same user",()=>{
            let user={
                username:"test_acc_test",
                password:"123456789",
                passwordConfirm:"12345677890"
            }
            return request(app)
            
            .post('/api/users/register')
            .send(user)
            .then((res)=>{
                
                //console.log(res)
                const check=db.user.findOne({
                    where:{
                        username:user.username
                    }
                })
                
                if(check)
                {
                    expect(res.status).equal(400)
                    expect(res.text).equal("Cannot register")
                }
               
                
            }).catch(err=>{
                console.log(err)
            })
        })
    })
   
    describe("Test REGISTER",()=>{
        it("it should return not match password",()=>{
            let user={
                username:"test_acc_test",
                password:"123456789",
                passwordConfirm:"1234567890"
            }
            return request(app)
            
            .post('/api/users/register')
            .send(user)
            .then((res,err)=>{
                
                    expect(res.status).equal(400)
                    expect(res.text).equal("Cannot register")
                    expect(res.text).equal('username is exsted')
                
            }).catch(err=>{
                console.log(err)
            })
        })
    })

    describe("Test REGISTER",()=>{
        it("it should return not match password",()=>{
            let user={
                username:"testcaiccc",
                password:"123456789",
                passwordConfirm:"123456789"
            }
            return request(app)
            
            .post('/api/users/register')
            .send(user)
            .then((res,err)=>{
                
                    expect(res.status).equal(400)
                    expect(res.text).equal('Passwords do not match')
                    expect(res.text).equal('username is exsted')
                
            }).catch(err=>{
                
            })
        })
    })



    describe("Test REGISTER",()=>{
        it("it should return account's user",()=>{
            let user={
                username:"testcaicc",//change this every test
                password:"123456789",
                passwordConfirm:"123456789"
            }
            return request(app)
            
            .post('/api/users/register')
            .send(user)
            .then((res,err)=>{
                expect(res.status).equal(200)
                //expect(res.status).equal(400)
                
            }).catch(err=>{
                console.log(err)
            })
        })
    })


    describe("Test REGISTER",()=>{
        it("it should return account's user",()=>{
            let user={
                username:"testcaicc",//change this every test
                password:"123456789",
                passwordConfirm:"123456789"
            }
            return request(app)
            
            .post('/api/users/register')
            .send(user)
            .then((res,err)=>{
                //expect(res.status).equal(200)
                expect(res.status).equal(400)
                
            }).catch(err=>{
                console.log(err)
            })
        })
    })


    describe("Test SignIn ",()=>{
        it("it should return signIn",()=>{
            let user={
                username:"test",//change this every test
                password:"123456789",
                
            }
            return request(app)
            
            .post('/api/users/signin')
            .send(user)
            .then((res,err)=>{
                expect(res.status).equal(200)
               
                
            }).catch(err=>{
                console.log(err)
            })
        })
    })

    describe("Test SignIn ",()=>{
        it("it should return error user not found in signIn",()=>{
            let user={
                username:"test_acc_test_test_test",//change this every test
                password:"123456789",
                
            }
            return request(app)
            
            .post('/api/users/signin')
            .send(user)
            .then((res,err)=>{
                const user=db.user.findOne({
                    where:{
                        username:user.username
                    }
                })
                if(!user)
                {
                    expect(res.status).equal(400)
                    expect(res.text).equal("User Not Found")
                }
               console.log(user)
                
            }).catch(err=>{
                console.log("dasdasd")
                console.log(err)
            })
        })
    })


    describe("Test SignIn ",()=>{
        it("it should return error password in signIn",()=>{
            let user={
                username:"test_acc_test_test",
                password:"123456789999",
                
            }
            return request(app)
            
            .post('/api/users/signin')
            .send(user)
            .then((res,err)=>{
                
                    expect(res.status).equal(400)
                
               
                
            }).catch(err=>{
                console.log(err)
            })
        })
    })


    describe("Test Token ",()=>{
        it("it should return error in Token",()=>{
            let user={
                username:"test_acc_test_test_test",//change this every test
                password:"123456789",
                
            }
            return request(app)
            
            .post('/api/users/token')
            .send(user)
            .then((res,err)=>{
                const user=db.user.findOne({
                    where:{
                        username:user.username
                    }
                })
                if(!user)
                {
                    expect(res.status).equal(400)
                }
               
                
            }).catch(err=>{
                console.log(err)
            })
        })
    })
 
    // describe("Test Get all profile ",()=>{
    //     it("it should return error in signIn",()=>{
    //         let user={
    //             username:"test_acc_test_test",//change this every test
    //             password:"123456789999",
                
    //         }
    //         return request(app)
            
    //         .post('/api/users/token')
    //         .send(user)
    //         .then((res,err)=>{
                
    //                 expect(res.status).equal(400)
                
               
                
    //         }).catch(err=>{
    //             console.log(err)
    //         })
    //     })
    // })
})