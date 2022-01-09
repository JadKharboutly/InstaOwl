import './ResultPage';

import React from 'react'
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Nav from './Nav';

function ResultLostFollowers() {

    const [usernames,setUsernames] = useState([]);

    const data = useSelector(state => state.state);
    useEffect(() => {
        if(data !== undefined){
            for(const n in data.lost_followers){
                console.log(n)
                setUsernames(prev => [...prev,n])
            }
            console.log(usernames)
        }
    }, [])

    const option = "Lost Followers"

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
                    <img crossOrigin='true' src={data.lost_followers[n]} className='profilePic' source={{'Access-Control-Allow-Origin':'*'}} />
                    <p className='username'>{n}</p>
                    </div>
                )}
                </div>
                </div>
            </div>
        )
    

}

export default ResultLostFollowers
