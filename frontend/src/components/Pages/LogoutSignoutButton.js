import React from 'react'
import cookie from 'react-cookies'
import { Button } from 'react-bootstrap'

const LogoutSignoutButton = () => {
  const handleClick = () => {
    cookie.remove('cookie', { path: '/' })
  }
  return (
    <div>
      <Button variant="outline-dark" size="lg" onClick={handleClick}>
        Sign out
      </Button>
    </div>
  )
}

export default LogoutSignoutButton