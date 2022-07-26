import {Component} from 'react'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import AppTheme from '../../context/AppTheme'
import './index.css'

class Header extends Component {
  render() {
    return (
      <AppTheme.Consumer>
        {value => {
          const {isDarkTheme, changeTheme} = value

          const bgColor = isDarkTheme ? 'dark' : 'light'
          const logoutButton = isDarkTheme ? 'white' : 'blue'

          const websiteLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          const popText = isDarkTheme ? 'pop-white' : 'pop-blue'

          const onChangeTheme = () => {
            changeTheme()
          }

          const onClickLogout = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          /* const onClickLogo = () => {
            const {history} = this.props
            history.replace('/')
          } */

          return (
            <div className={`header-extra ${bgColor}`}>
              <div className="nav-bar-logo-container">
                <button
                  type="button"
                  className="home-logo-button"
                  //   onClick={onClickLogo}
                >
                  <Link to="/">
                    <img
                      src={websiteLogo}
                      alt="website logo"
                      className="nav-logo"
                    />
                  </Link>
                </button>
              </div>
              <div className="nav-items-container">
                <button
                  type="button"
                  data-testid="theme"
                  onClick={onChangeTheme}
                  className={`header-button ${bgColor}`}
                >
                  {isDarkTheme ? <BsBrightnessHigh /> : <BsMoon />}
                </button>
                <button type="button" className={`header-button ${bgColor}`}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-img-nav"
                  />
                  <span className="hover-icon">
                    <GiHamburgerMenu className="hamburg" />
                  </span>
                </button>
                <div className="pop-up-extra">
                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        className={`header-button ${bgColor}`}
                      >
                        <p className={`logout-text ${logoutButton}`}>Logout</p>
                        <FiLogOut className="logout-icon" />
                      </button>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <div className={`pop-up-container ${bgColor}`}>
                        <p className={`pop-up-hint ${popText}`}>
                          Are you sure, you want to logout
                        </p>
                        <div className="pop-up-button-container">
                          <button
                            type="button"
                            className="cancel-button"
                            onClick={() => close()}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="confirm-button"
                            onClick={onClickLogout}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </div>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default withRouter(Header)
