import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {ImFire} from 'react-icons/im'

import Cookies from 'js-cookie'

import Header from '../Header'

import NavItems from '../NavItems'

import AppTheme from '../../context/AppTheme'

import VideosView from '../VideosView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Trending extends Component {
  state = {trendingList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingDetails()
  }

  getTrendingDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      }))
      this.setState({
        trendingList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getTrendingDetails()
  }

  renderSuccessView = () => {
    const {trendingList} = this.state

    return (
      <div className="videos-container">
        <ul className="video-cards-container">
          {trendingList.map(eachVideo => (
            <VideosView videoDetails={eachVideo} key={eachVideo.id} />
          ))}
        </ul>
      </div>
    )
  }

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

  renderTrendingDetails = () => {
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
              <div className="nxt-watch-home-container">
                <Header />
                <div className="large-devices-containers">
                  <div className={`large-nav-bar-container ${leftNavTheme}`}>
                    <NavItems />
                  </div>
                  <div className="videos-block-container">
                    <div className={`active-tab-show ${activeBar}`}>
                      <span>
                        <ImFire size={25} className="active-icon" />
                      </span>
                      <h1 className="active-tab-heading">Trending</h1>
                    </div>
                    <div className={`display-items-container ${bgColor}`}>
                      {this.renderTrendingDetails()}
                    </div>
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

export default Trending
