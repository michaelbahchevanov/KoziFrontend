import { useState } from 'react'

const jwt = require('jsonwebtoken')

const useAuthenticatedUser = () => {

    const [user, setUser] = useState(null)
    const token = localStorage.getItem('token')
    const decoded = jwt.decode(token)

    if (decoded && !user) {
        setUser({
            email: decoded.email,

            logout() {
                localStorage.removeItem('token')
                setUser(false)
            },

            refresh() {
                setUser(false)
            },
        })
    }
    return user
}

export default useAuthenticatedUser