import './ResultPage.css'
import React from 'react'
import {useState,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Home from './Home';
import Nav from './Nav';

function ResultPage() {
    const [usernames,setUsernames] = useState([]);

    const data = useSelector(state => state.state)
    useEffect(() => {
        if(data !== undefined){
        for(const n in data.notFollowingBack){
            console.log(n)
            setUsernames(prev => [...prev,n])
        }
        console.log(usernames)
    }
    }, [])

    const option = "Not Following Back"

        return (
            <div className="ResultPage">
                <Nav/>
                <div className="container">
                <div className='ResultBox'>
                <div className='ResultBoxHeader'>
                    <div className='NotFollowingBackHeader'>{option}</div>
                    <div className='NotFollowingBackCount'>Count: {usernames.length}</div>
                </div>
                {usernames.map((n)=>
                    <div className='fakeFriend' key={n}>
                    <img crossOrigin='true' src={data.notFollowingBack[n]} className='profilePic' source={{'Access-Control-Allow-Origin':'*'}} />
                    <p className='username'>{n}</p>
                    </div>
                )}
                </div>
                </div>
            </div>
    
        )
    

}

export default ResultPage
