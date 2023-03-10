export const loginUser = (username) => (dispatch) => {
    const user = {username: username, authenticated: true}
    dispatch({ type: "LOGIN_USER", payload: {user} })
}

export const logoutUser = () => (dispatch) => {
    const user = { username: "", authenticated:false}
    dispatch({ type: "LOGOUT_USER", payload: {user} })
}