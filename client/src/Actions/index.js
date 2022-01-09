export const fakeFriendData = (data) =>{
    return {
        type : 'fakeFriendList',
        body: data
    }
}

export const removeNotification = (data)=>{
    return({
        type:'removeNotification',
        body: data
    })
}