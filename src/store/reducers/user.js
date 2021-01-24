const initialState = {
    isLoggedIn: false,
    loading: false,
    username: '',
    lists: [],
}

export default function user(state = initialState, action){
    switch(action.type){
        case 'LOG_IN':
            state.loading = true;
            break;
        case 'SET_USER':
            console.log(action);
            state.loading = false;
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.lists = action.payload.lists;
            break;
        default:
            break;   
    }
    return state;
}