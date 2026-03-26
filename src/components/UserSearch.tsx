import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchGithubUser } from '../api/github'
import UserCard from './UserCard'

const UserSearch = () => {
  const [username, setUserName] = useState('')
  const [submittedUsername, setSubmittedUserName] = useState('')

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users', submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),
    enabled: !!submittedUsername
  })
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmittedUserName(username.trim())
  }

  return (  
    <>
      <form 
        onSubmit={handleSubmit}
        className='form'>
        <input 
          type='text' 
          placeholder='Enter GitHub Username...'
          value={username}
          onChange={(e) => setUserName(e.target.value)}  
        />
        <button 
          type='submit'
        >
          Search
        </button>
      </form>
      {isLoading && (
        <p className='status'>Loading...</p>
      )}
      {isError && (
        <p className='status error'>{error.message}</p>
      )}
      {data && (
        <UserCard user={data} />
      )}
    </>
  )
}
 
export default UserSearch