
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'

export default function userId() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
    
        try {
          if (token) {
            const decode = jwtDecode(token)
            console.log('decode', decode)
            setUserId(decode?.sub ?? '') // Use optional chaining and nullish coalescing
            setUserName((decode as any)?.fullName ?? '')
          }
        } catch (error) {
          console.error('Error decoding token:', error)
          setUserId('')
        }
      }, [])
}
