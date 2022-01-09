import './Home.css'
import React from 'react'
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {fakeFriendData} from '../Actions';
import LoadingPage from './LoadingPage';
import Notification from './Notification';
import Nav from './Nav';
import {v4} from 'uuid'

function Home() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState('');
    const [pressed,setPressed] = useState(false);
    const [success,setSuccess] = useState(false);
    const [failedLogin,setFailedLogin] = useState(false);
    const [error,setError] = useState(false);
    const [lostFollowersCount,setLostFollowersCount] = useState(0)
    const [notFollowingBackCount,setNotFollowingBackCount] = useState(0)
    const [list,setList] = useState([]);
    const [notificationDone,setNotificationDone] = useState(null)

    const id = v4();

    
    const loginInfo = {
        username,
        password
    }

    var notificationProperties = {
        type:'',
        id:"",
        message:'',
        time:''
      }

    
    const dispath = useDispatch();
    const state = useSelector(state=>state.state);


    function getUsername(e){setUsername(e.target.value)};
    function getPassword(e){setPassword(e.target.value)};




    useEffect(() => {
        setPressed(false)
        if(state !== undefined){
            setNotFollowingBackCount(Object.keys(state.notFollowingBack).length);
            if(state.lost_followers !==null){setLostFollowersCount(Object.keys(state.lost_followers).length)}
        }

    }, [state])
    
    const setNotification = (action) =>{
        switch(action){
        case ('SUCCESS'):
            notificationProperties.type = 'SUCCESS'
            notificationProperties.id = id
            notificationProperties.message = 'Successful Login'
            notificationProperties.time = Date.now()
            return notificationProperties;
      
        case ('ERROR'):
            notificationProperties.type = 'ERROR'
            notificationProperties.id = id
            notificationProperties.message = 'Please Sign In'
            notificationProperties.time = Date.now()
      
            return notificationProperties;
        case ('FAILED'):
            notificationProperties.type = 'FAILED'
            notificationProperties.id = id
            notificationProperties.message = 'Login Failed'
            notificationProperties.time = Date.now()
          
            return notificationProperties;
          default:
            return;
        }
      }
      function getSuccess(){
        setList(prev => [...prev,(setNotification('SUCCESS'))])
        return true
      }
      function getError(){
        setList(prev => [...prev,(setNotification('ERROR'))])
        return true
      }
      function getFailed(){
        setList(prev => [...prev,(setNotification('FAILED'))])
        return true
      }

     

    async function Login(e){

        setPressed(true)

        loginInfo.username = username.toLocaleLowerCase();
        loginInfo.password = password;

        try{
            const response = await fetch('https://instaowl.herokuapp.com/api/fakefriends',{
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: {'Content-Type':'application/json'}
            })
            const data = await response.json();
            console.log(data)
            if(data.statusCode === "ok"){
                setSuccess(true)
                getSuccess();
            }
            dispath(fakeFriendData(data));

        }catch{
            setPressed(false);
            setFailedLogin(true)
            getFailed();
        }
    }


if(pressed === true){
    return(
        <LoadingPage/> 
    )
}

function sendError(){
    if(state === undefined){
        console.log("undefined")
        getError()
        setError(true)

    }
    return
}

    return ( 
        <div className="C">
            {<Notification list={list} p={list[list.length-1]}/>}
        <div className='Home'>
            <input className='input' type="text" id='userName' placeholder='Input @' onChange={getUsername}></input>
            <input className='input' type="password" id='pass' placeholder='Password' onChange={getPassword} onBlur={getPassword}></input>
            <button onClick={Login}>Sign In {}</button>
            <div className='Options'>
                <Link to={state === undefined ? "/":"/fakefriend/result"} >
                    <div className='option' id='Not Following Back' onClick={sendError}><div className='Snakepic' ></div><h1>Not Following Back</h1><h2 style={{marginTop:'0',backgroundColor:'white',color:'green',width:'80px',borderRadius:'40px',display:'flex',justifyContent:'center'}}>Count: {notFollowingBackCount}</h2></div>
                </Link>
                <div className='option' id='EngagementRate' ><div className='Percentpic'></div><h1>Engagement Rate</h1> </div>
                <div className='option' id='GhostFollowers' ><div className='Ghostpic'></div><h1>Ghost Followers</h1> </div>
                <Link to={state === undefined ? "":"/lostfollowers/result"}>
                    <div className='option' id='LostFollower' onClick={sendError} ><div className='Graphpic'></div><h1>Lost Followers</h1><h2 style={{marginTop:'0',backgroundColor:'white',color:'green',width:'80px',borderRadius:'40px',display:'flex',justifyContent:'center'}}>Count: {lostFollowersCount}</h2> </div>
                </Link>

            </div>
        </div>
        </div>


    )
}

export default Home
