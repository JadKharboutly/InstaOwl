

const fakeFriendListReducer = (state = {},action) => {
    switch(action.type){
        case 'fakeFriendList':
            state = action.body;
            return {state};
        default:
            return "None"
    }
}


export default fakeFriendListReducer;