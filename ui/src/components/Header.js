import React from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import './Header.css'

export default function Header () {
  const handleLogout = (e) => {
    e.preventDefault()
    sessionStorage.clear()
    window.location.href = '/'
  }

  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <Typography variant="h6">
          {'Edirect Project Manager'}
        </Typography>
        {sessionStorage.getItem('name') != null &&
             <Typography variant="h6">
               {`${sessionStorage.getItem('name')}'s To do List`}
             </Typography>
        }
        {sessionStorage.getItem('token') != null &&
              <Button onClick={handleLogout} color="inherit">Logout</Button>
        }
      </Toolbar>
    </AppBar>
  )
}
