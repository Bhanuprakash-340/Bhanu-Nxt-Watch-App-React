import './index.css'

import Header from '../Header'

import NavItems from '../NavItems'

import AppTheme from '../../context/AppTheme'

const NotFound = () => (
  <AppTheme.Consumer>
    {value => {
      const {isDarkTheme} = value
      const bgColor = isDarkTheme ? 'dark' : 'light'
      const notFoundImage = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      const leftNavTheme = isDarkTheme
        ? 'left-nav-dark-theme'
        : 'left-nav-light-theme'

      return (
        <>
          <div className="not-found-page-container">
            <Header />
            <div className="large-devices-containers">
              <div className={`large-nav-bar-container ${leftNavTheme}`}>
                <NavItems />
              </div>
            </div>
            <div className={`not-found-container ${bgColor}`}>
              <div className="not-found-image-container">
                <img
                  src={notFoundImage}
                  alt="not found"
                  className="not-found-image"
                />
                <div className="not-found-content">
                  <h1 className="not-found-heading">Page Not Found</h1>
                  <p className="not-found-description">
                    We are sorry, the page requested could not be found
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    }}
  </AppTheme.Consumer>
)

export default NotFound
