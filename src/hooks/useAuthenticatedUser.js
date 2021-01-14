import { useState } from 'react'

const jwt = require('jsonwebtoken')

export const useAuthenticatedUser = () => {

    const [user, setUser] = useState(null)
    const token = localStorage.getItem('token')
    const decoded = jwt.decode(token)

    if (decoded && !user) {
        setUser({
            email: decoded.email,

            logout() {
                localStorage.removeItem('token')
                setUser(null)
            },

            refresh() {
                setUser(null)
            },
        })
    }
    return user
}

