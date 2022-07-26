import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import AppTheme from './context/AppTheme'

import LoginPage from './components/LoginPage'

import ProtectedRoute from './components/ProtectedRoute'

import Home from './components/Home'

import Trending from './components/Trending'

import Gaming from './components/Gaming'

import VideoItem from './components/VideoItem'

import SavedVideos from './components/SavedVideos'

import NotFound from './components/NotFound'

class App extends Component {
  state = {isDarkTheme: false, savedVideos: []}

  changeTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  addSavedVideos = async data => {
    const {savedVideos} = this.state

    if (savedVideos.length > 0) {
      const checkSavedVideos = savedVideos.filter(item => item.id === data.id)
      if (checkSavedVideos.length === 0) {
        await this.setState({savedVideos: [...savedVideos, data]})
      }
    } else {
      await this.setState({savedVideos: [...savedVideos, data]})
    }
  }

  render() {
    const {isDarkTheme, savedVideos} = this.state
    return (
      <AppTheme.Provider
        value={{
          isDarkTheme,
          changeTheme: this.changeTheme,
          savedVideos,
          addSavedVideos: this.addSavedVideos,
        }}
      >
        <Switch>
          <Route path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/videos/:id" component={VideoItem} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/bad-path" component={NotFound} />
          <Redirect to="bad-path" />
        </Switch>
      </AppTheme.Provider>
    )
  }
}

export default App
