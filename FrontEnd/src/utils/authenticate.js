export const getToken = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    if(!token) return null

    return token
}

export const setToken = async (token, persistent) => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')

    if(persistent){
        localStorage.setItem('token', token)
    }else{
        sessionStorage.setItem('token', token)
    }

    return
}

export const logout = () =>{
    localStorage.removeItem('token')
    sessionStorage.removeItem('token')
}