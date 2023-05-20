import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import twitterLogo from '../twitter.svg'
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const handleInputChange = (e) => {
        setUsername(e.target.value)
    } 
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!username.length) return undefined

        localStorage.setItem('@GoTwitter:username', username)

        navigate('timeline')
    }

  return (
    <div className='login-wrapper'>
        <img src={twitterLogo} alt='GoTwiiter' />
        <form onSubmit={handleSubmit}>
            <input
            value={username}
            onChange={handleInputChange}
            placeholder='Nome de Usuário'
            />
            <button type='submit'>Entrar</button>
        </form>
    </div>
  )
}

export default Login
