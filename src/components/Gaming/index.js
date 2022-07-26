import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {SiYoutubegaming} from 'react-icons/si'

import Header from '../Header'

import NavItems from '../NavItems'

import AppTheme from '../../context/AppTheme'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Gaming extends Component {
  state = {gamingList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getGamingList()
  }

  getGamingList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      //   console.log(updatedData)
      this.setState({
        gamingList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getGamingList()
  }

  renderSuccessView = () => (
    <AppTheme.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {gamingList} = this.state

        const bgColor = isDarkTheme ? 'dark' : 'light'

        return (
          <div className="gaming-container">
            <ul className="games-list-container">
              {gamingList.map(each => (
                <li key={each.id} className="each-game-card">
                  <Link
                    to={`/videos/${each.id}`}
                    className={`video-link-styles ${bgColor}`}
                  >
                    <img
                      src={each.thumbnailUrl}
                      alt="video thumbnail"
                      className="game-img"
                    />
                    <div className="game-content">
                      <p className="game-title">{each.title}</p>
                      <p className="game-count">{each.viewCount} Watching</p>
                      <p className="game-count">World Wide</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </AppTheme.Consumer>
  )

  renderFailureView = () => (
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
                <button
                  className="retry-button"
                  type="button"
                  onClick={this.onRetry}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </AppTheme.Consumer>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderGamingDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <AppTheme.Consumer>
        {value => {
          const {isDarkTheme} = value

          const bgColor = isDarkTheme ? 'dark' : 'light'

          const leftNavTheme = isDarkTheme
            ? 'left-nav-dark-theme'
            : 'left-nav-light-theme'

          const activeBar = isDarkTheme ? 'dark-bar' : 'light-bar'

          return (
            <>
              <div className="not-found-page-container">
                <Header />
                <div className="large-devices-containers">
                  <div className={`large-nav-bar-container ${leftNavTheme}`}>
                    <NavItems />
                  </div>
                </div>
                <div className="videos-block-container">
                  <div className={`active-tab-show ${activeBar}`}>
                    <span>
                      <SiYoutubegaming size={25} className="active-icon" />
                    </span>
                    <h1 className="active-tab-heading">Gaming</h1>
                  </div>
                  <div
                    className={`display-items-container ${bgColor}`}
                    data-testid="gaming"
                  >
                    {this.renderGamingDetails()}
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default Gaming
