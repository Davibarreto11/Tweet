import React from 'react'
import api from '../services/api'

import like from '../like.svg'
import './Tweet.css'


function Tweet({feed}) {
    const handleLike = async () => {
        const {_id} = feed

        await api.post(`likes/${_id}`)
    }

    return (
        <li className='tweet'>
            <strong>{feed.author}</strong>
            <p>{feed.content}</p>
            <button type='button' onClick={handleLike}>
                <img src={like} alt='Like' />
                {feed.likes}
            </button>
        </li>
    )
}

export default Tweet