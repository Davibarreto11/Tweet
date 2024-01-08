import React, { useState, useEffect } from 'react'
import api from '../services/api'
import socket from 'socket.io-client'

import twitterLogo from '../twitter.svg'
import './Timeline.css'

import Tweet from '../components/Tweet'

function Timeline() {
	const [newtweet, setNewtweet] = useState('')
	const [tweets, setTweets] = useState([])

	const subscribeToEvents = () => {
		const io = socket('http://localhost:3333')

		io.on('tweet', data => {
			setTweets([data, ...tweets])
		})

		io.on('like', data => {
			setTweets(tweets.map(tweet => tweet._id === data._id ? data : tweet))
		})
	}

	const handleNewTweet = async (e) => {
		if (e.keyCode !== 13) return undefined

		const content = newtweet
		const author = localStorage.getItem('@GoTwitter:username')

		await api.post('tweets', { content, author })

		setNewtweet('')
	}

  const handleNewTweetButton = async (e) => {
		// if (e.keyCode !== 13) return undefined

		const content = newtweet
		const author = localStorage.getItem('@GoTwitter:username')

		await api.post('tweets', { content, author })

		setNewtweet('')
	}



	const handleInputChange = (e) => {
		setNewtweet(e.target.value)
	}

	useEffect(() => {
		api.get('tweets').then((response) => setTweets(response.data))

	}, [])

	useEffect(() => {
		subscribeToEvents()

	}, [subscribeToEvents])

	return (
		<div className='timeline-wrapper'>
			<img height={24} src={twitterLogo} alt='GoTwitter' />

			<form>
				<textarea
					value={newtweet}
					onChange={handleInputChange}
					onKeyDown={handleNewTweet}
					placeholder='O que está acotecendo?'
				/>

        <button type='submit' onClick={handleNewTweetButton}>Twetar</button>
			</form>

			<ul className='tweet-list'>
				{tweets.map(tweet => (
					<Tweet key={tweet._id} feed={tweet} />
				))}
			</ul>
		</div>
	)
}

export default Timeline
