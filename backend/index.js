const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const request = require('request');
const { json } = require('body-parser');
const Users = require('./models/users.js');
const mongoose = require('mongoose');
const port = 5000;
var database = 'mongodb+srv://JadKhar:MOONjado203@cluster0.ofd59.mongodb.net/InstaOwl?retryWrites=true&w=majority'
mongoose.connect(database);
const data = {
    m:"jad"
}
console.log("hello")
// "mongodb://localhost/InstaOwl"
// var present = {jad:'kahrboutly'}
// const run = async() =>{
//     var user = await Users.exists({u:"Bot4Insta123"})
//     if(user === false){
//         console.log('empty')
//     }else{
//         user = await Users.findOne({u:"Bot4Insta123"})
//         user.followers = present
//         user.save();
//         console.log(user)
//     }
// }
// run()

const app = express();
app.use(bodyParser.json());
var j = request.jar();

app.use(cors({
    origin:'*'
}));

var header = {

    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': '',
    'content-security-policy': "report-uri https://www.instagram.com/security/csp_report/; default-src 'self' https://www.instagram.com; img-src data: blob: https://*.fbcdn.net https://*.instagram.com https://*.cdninstagram.com https://*.facebook.com https://*.fbsbx.com https://*.giphy.com; font-src data: https://*.fbcdn.net https://*.instagram.com https://*.cdninstagram.com; media-src 'self' blob: https://www.instagram.com https://*.cdninstagram.com https://*.fbcdn.net; manifest-src 'self' https://www.instagram.com; script-src 'self' https://instagram.com https://www.instagram.com https://*.www.instagram.com https://*.cdninstagram.com wss://www.instagram.com https://*.facebook.com https://*.fbcdn.net https://*.facebook.net 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' https://*.www.instagram.com https://www.instagram.com 'unsafe-inline'; connect-src 'self' https://instagram.com https://www.instagram.com https://*.www.instagram.com https://graph.instagram.com https://*.graph.instagram.com https://i.instagram.com/graphql_www https://graphql.instagram.com https://*.cdninstagram.com https://api.instagram.com https://i.instagram.com https://*.i.instagram.com wss://www.instagram.com wss://edge-chat.instagram.com https://*.facebook.com https://*.fbcdn.net https://*.facebook.net chrome-extension://boadgeojelhgndaghljhdicfkmllpafd blob:; worker-src 'self' blob: https://www.instagram.com; frame-src 'self' https://instagram.com https://www.instagram.com https://*.instagram.com https://staticxx.facebook.com https://www.facebook.com https://web.facebook.com https://connect.facebook.net https://m.facebook.com; object-src 'none'; upgrade-insecure-requests",
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'content-type': 'application/json; charset=utf-8',
    'upgrade-insecure-requests': '1',
    'x-csrftoken': '',
    'user-agent': 'Mozilla/5.0 (Linux; Android 8.1.0; motorola one Build/OPKS28.63-18-3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.80 Mobile Safari/537.36 Instagram 72.0.0.21.98 Android (27/8.1.0; 320dpi; 720x1362; motorola; motorola one; deen_sprout; qcom; pt_BR; 132081645)'
    
    }


const getCookie = (callback) => {
    var csrfToken;
    const csrf =  request.get({url:'https://www.instagram.com/accounts/login', jar:j,headers:header}, (error,response,body)=> {
        var jar = response.caseless.dict['set-cookie'];
        for(c in jar){
            jar[c] = jar[c].split(';')[0];
            if(jar[c] .includes("csrf")){
                csrfToken = jar[c].split("=")[1];
            }
        }
        header['x-csrftoken']=csrfToken;
        console.log(`This is the CSRF TOKEN ${csrfToken}`)

        callback(null,header);
    });

}
const Login = (username, password, callback) => {
    getCookie((err,res) => {
        const payload = {
            'enc_password': '#PWD_INSTAGRAM_BROWSER:0:'+Date.now()+`:${password}`,
            'username': username,
            'queryParams': '{}',
            'optIntoOneTap': 'false',
        }
        request.get({url:'https://www.instagram.com/accounts/login/ajax/', formData:payload,headers:res,jar:j});
        request.post({url:'https://www.instagram.com/accounts/login/ajax/', formData:payload,headers:res,jar:j}, function (error,response,body) {
            const cookies = j.getCookies('https://www.instagram.com/accounts/login/ajax/');
            var xcsrf = (cookies[2].toJSON().value);

            var cookieStr = '';
            for(c in response.caseless.dict['set-cookie']){
                cookieStr += (response.caseless.dict['set-cookie'][c])+',';
                if(response.caseless.dict['set-cookie'][c+1] == null){
                    cookieStr += (response.caseless.dict['set-cookie'][c]);
                }
            }
            header['cookie'] = cookieStr;
        
            console.log(response.statusCode)
            console.log(response.statusMessage);
            console.log(body)

   
            header['x-csrftoken']=xcsrf;

            res = {
                header:header,
                userId:(JSON.parse(body)).userId
            }
            callback(null,res);
        });
    });
}


const getFollowers = (username, password) =>{
    return new Promise((resolve,reject)=>{
        var followersArr = {};
        var x = 0;
        Login(username,password,(err,res)=>{
            request.get({url:`https://i.instagram.com/api/v1/friendships/${res.userId}/followers/?count=100000`,headers:res.header,jar:j},function(error,response,body){
            
                while((JSON.parse(body)).users[x] != null){
                    followersArr[((JSON.parse(body)).users[x].username)] = ((JSON.parse(body)).users[x].profile_pic_url);
                    x++;
                }
                resolve(followersArr)
            });
        });
    })
    
}


const getFollowing = (username,password)=>{
    return new Promise((resolve,reject)=>{
        Login(username,password,(err,res)=>{
            const following = request.get({url:`https://i.instagram.com/api/v1/friendships/${res.userId}/following/?count=100000`,headers:res.header,jar:j},function(error,response,body){
                var x = 0;
                var followingArr = [];
        
                while((JSON.parse(body)).users[x] != null){
                    followingArr[x] = (JSON.parse(body)).users[x].username;
                    x++;
                }
                resolve(followingArr)
            });   
        });
    })
}

const lostFollowers = async(username,presentFollowers,presentFollowersDict) =>{
    const userExists = await Users.exists({u:username});
    var lostF = {};
    if(userExists === true){
        var user = await Users.findOne({u:username});
        const oldFollowers = user.followers;
        for(const f in oldFollowers){
            if(presentFollowers.includes(f) === false){
                console.log(f)
                lostF[f]=oldFollowers[f];
            }
        }
        console.log(lostF)
        user.followers = presentFollowersDict;
        user.save();
        console.log(user)
        return(lostF);
    }

}

const db = async (username,data) =>{
    const present = await Users.exists({u:username});
    if(present === false){
        const user = await Users.create({u:username,followers:data})
    }else{
    console.log("User Exists")
    }
}



const getFakeFriends = async(username,password) =>{
    return new Promise((resolve,reject) => {
        Login(username,password,(err,res)=>{
            const getFollowers = () =>{
                return new Promise((resolve,reject)=>{
                    var followersArr = [];
                    var followersDict = {};
                    var x = 0;
                    request.get({url:`https://i.instagram.com/api/v1/friendships/${res.userId}/followers/?count=100000`,headers:res.header,jar:j},function(error,response,body){
                        while((JSON.parse(body)).users[x] != null){
                            followersArr[x] = (JSON.parse(body)).users[x].username;
                            followersDict[((JSON.parse(body)).users[x].username)] = ((JSON.parse(body)).users[x].profile_pic_url);
                            x++;
                        }
                        // db(username,followersDict);
                        
                        resolve({array:followersArr,dict:followersDict});
                    }); 
                });
            }
            getFollowers().then(data=>{
                const getdata = async() =>{
                    const userExists = await db(username,data.dict);
                    const lf =  await lostFollowers(username,data.array,data.dict);
                    console.log(data.dict)
                    request.get({url:`https://i.instagram.com/api/v1/friendships/${res.userId}/following/?count=100000`,headers:res.header,jar:j},function(error,response,body){
                        var x = 0;
                        var fakeFriends = {};
                        while((JSON.parse(body)).users[x] != null){
                            if(data.array.includes((JSON.parse(body)).users[x].username) == false){
                                fakeFriends[((JSON.parse(body)).users[x].username)] = ((JSON.parse(body)).users[x].profile_pic_url);
                            }
                            x++;
                        }
                        console.log({notFollowingBack:fakeFriends, lost_followers:lf});
    
                        resolve({notFollowingBack:fakeFriends, lost_followers:lf,statusCode:"ok"});
                    }); 
                }
                getdata();

            });
        });
    
    });
}



app.get('/fakefriends',(req,res)=>{
    res.send("hello world")
})


app.post('/api/fakefriends',(req,res)=>{
        getFakeFriends(req.body.username,req.body.password).then((response)=>{
            res.json(response);
        });   
        console.log(req.body)
})




app.listen(process.env.PORT || port);