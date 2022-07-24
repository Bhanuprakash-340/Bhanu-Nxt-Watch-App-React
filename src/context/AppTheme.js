import React from 'react'

const AppTheme = React.createContext({
  isDarkTheme: false,
  changeTheme: () => {},
  savedVideos: [],
  addSavedVideos: () => {},
})

export default AppTheme
