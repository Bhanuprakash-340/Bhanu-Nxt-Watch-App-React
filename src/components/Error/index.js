import './index.css'

import AppTheme from '../../context/AppTheme'

const Error = () => (
  <AppTheme.Consumer>
    {value => {
      const {isDarkTheme} = value
      const failureImage = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

      return (
        <div className="failure-view-container">
          <div className="failure-image-container">
            <img
              src={failureImage}
              alt="failure view"
              className="failure-image"
            />
          </div>
          <div className="failure-content-container">
            <h1 className="failure-heading">Oops! Something Went Wrong</h1>
            <p className="failure-description">
              We are having some trouble to complete your request. Please try
              again.
            </p>
            <div>
              <button className="retry-button" type="button">
                Retry
              </button>
            </div>
          </div>
        </div>
      )
    }}
  </AppTheme.Consumer>
)

export default Error
