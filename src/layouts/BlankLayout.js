import { Stack } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'

function BlankLayout() {
  return (
    <Stack minHeight="100vh" jsutifyContent="center" alignItems="center">
        <Logo sx={{width:90, height: 90, mb: 5}}/>
        <Outlet></Outlet>
    </Stack>
  )
}

export default BlankLayout