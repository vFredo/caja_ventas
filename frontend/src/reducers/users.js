let initialState = {
    user: {
        username: "",
        authenticated: false,
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case "LOGIN_USER":
        return{
            ...state,
            user: action.payload.user
        }
    }
}


export default userReducer