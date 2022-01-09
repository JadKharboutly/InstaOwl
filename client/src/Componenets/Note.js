import React from 'react'
import './Notification.css'

import {useEffect,useState} from 'react'


function Note(props) {

    const [exit,setExit] = useState(false);
    const [remove,setRemove] = useState(false);

    const{
        note,
        index
    } = props;


    useEffect(() => {
        setTimeout(()=>{
            setExit(true)
        },3000*(index+1))
        // return(
        //     setRemove(true)
        // )
    }, [])

    useEffect(()=>{
        if(exit === true){
            setTimeout(() => {
                setRemove(true)
            }, 200);
        }
    },[exit])
    console.log(exit)        

    
    return (
        <div className={`Notification ${note.type === 'SUCCESS' ? 'success':''} ${note.type === 'ERROR' || note.type === 'FAILED' ? 'error':''} ${exit === true ? 'exit':''} ${remove === true ? 'remove':''}` }  key={note.id}>
            <div className={`Line`}></div>

        <p>{note.message}</p>
    </div>
    )

    // return(
    // // <div className={`Notification`}>
    // //         <div className={`Line`}></div>

    // //     <p>Success</p>
    // // </div>
    // <div className='Notification'></div>
    // )

}

export default Note


