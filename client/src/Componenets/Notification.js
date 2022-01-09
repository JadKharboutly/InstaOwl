import './Notification.css'

import React from 'react'
import Note from './Note';
import {useState,useEffect} from 'react'

function Notification(props) {

    const [result,setResult] = useState([])
    const [expired,setExpired] = useState(0)  

    const {
        list,
        notificationActive    
    } = props
     
    
    
    
    useEffect(() => {
        setResult(list)
    }, [list])
    
    
    
    
    useEffect(() => {
      setInterval(() => {
        for(const n in list){
          if(Date.now()-list[n].time > 2900){
            setExpired(list[n])
            list.splice(0,1)
            for(var i=0;i<list.length;i++){
                result[i] = list[i]
            }
          }
        }
      }, 100);
    
    }, [result])
    
    

    return (
        <div className='NotificationContainer'>
        {result.map((n,i)=>{
                return(<Note note={n} key={n.id} index={i}/>)
        })}
        </div>
        

    )
}

export default Notification
