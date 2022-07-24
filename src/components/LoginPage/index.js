import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    errorMessage: '',
    errorMesgShown: false,
  }

  onSubmitFailureForm = mesg => {
    this.setState({errorMesgShown: true, errorMessage: mesg})
  }

  onSubmitSuccessForm = token => {
    const {history} = this.props
    this.setState({errorMesgShown: false})
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccessForm(data.jwt_token)
    } else {
      this.onSubmitFailureForm(data.error_msg)
    }
  }

  render() {
    const {
      username,
      password,
      showPassword,
      errorMessage,
      errorMesgShown,
    } = this.state

    const shownPassword = showPassword ? 'text' : 'password'

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="nxt-watch-app-container">
        <div className="login-content-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="login-page-logo"
            />
          </div>
          <form className="form" onSubmit={this.submitForm}>
            <div className="input-label-container">
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-box"
                value={username}
                placeholder="Username"
                onChange={this.onChangeUserName}
              />
            </div>
            <div className="input-label-container">
              <label htmlFor="password" className="input-label">
                PASSWORD
              </label>
              <input
                type={shownPassword}
                id="password"
                className="input-box"
                value={password}
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </div>
            <div className="check-box-container">
              <input
                type="checkbox"
                id="showPassword"
                className="check-box"
                onChange={this.onChangeCheckbox}
              />
              <label htmlFor="showPassword" className="check-box-label">
                Show Password
              </label>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {errorMesgShown ? (
              <p className="error-mesg">* {errorMessage}</p>
            ) : null}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
