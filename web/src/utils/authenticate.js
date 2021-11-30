import api from "services/api"

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

export const validateToken = async () => {
    const response = await api.get('auth', {}).catch(
        err => {
            if(err.response.status == 401){
                logout()
                const err = {status: 401}
                return err
            }
        }
    )

    if(response.status == 401) return false

    return true;
}