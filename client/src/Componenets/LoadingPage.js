import './LoadingPage.css'
import React from 'react'

function LoadingPage() {
    return (
        <div className='LoadingPage'>
            <img className='owl2' src='https://i.ibb.co/0YmjYcm/output-onlinegiftools.gif'/>
            <div className='Container'>
                <h1 className='Loading'>Fetching Data . . .</h1>
            </div>
        </div>
    )
}

export default LoadingPage
