import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GrFormClose, GrFormSearch} from 'react-icons/gr'
import VideosView from '../VideosView'
import Header from '../Header'
import NavItems from '../NavItems'
import AppTheme from '../../context/AppTheme'
import Error from '../Error'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    bannerShown: true,
    searchInput: '',
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickClose = () => {
    this.setState({bannerShown: false})
  }

  bannerCard = () => (
    <div className="banner-card-container" data-testid="banner">
      <button
        type="button"
        data-testid="close"
        className="banner-close-icon"
        onClick={this.onClickClose}
      >
        <GrFormClose className="close-icon" />
      </button>
      <div className="banner-content-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="banner-logo"
        />
        <p className="banner-description">
          Buy Nxt Watch Premium prepaid plans with UPI
        </p>
        <button type="button" className="banner-button">
          GET IT NOW
        </button>
      </div>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyPressDown = event => {
    if (event.key.toLowerCase() === 'enter') {
      this.onSearch()
    }
  }

  onSearch = () => {
    const {searchInput} = this.state
    this.getVideoDetails(searchInput)
  }

  searchBar = () => {
    const {searchInput} = this.state

    return (
      <div className="search-bar-container">
        <input
          type="search"
          className="search-bar"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onKeyPressDown}
          value={searchInput}
        />
        <button
          type="button"
          className="search-button"
          onClick={this.onSearch}
          data-testid="searchButton"
        >
          <GrFormSearch className="search-icon" />
        </button>
      </div>
    )
  }

  onRetry = () => {
    this.getVideoDetails()
  }

  renderSuccessView = () => {
    const {videosList} = this.state
    const resultLength = videosList.length
    // console.log(resultLength)

    return (
      <div className="videos-container">
        {resultLength > 0 ? (
          <ul className="video-cards-container">
            {videosList.map(eachVideo => (
              <VideosView videoDetails={eachVideo} key={eachVideo.id} />
            ))}
          </ul>
        ) : (
          <div className="failure-view-container">
            <div className="failure-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
                alt="no videos"
                className="failure-image"
              />
            </div>
            <div className="failure-content-container">
              <h1 className="failure-heading">No Search results found</h1>
              <p className="failure-description">
                Try different key words or remove search filter
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
        )}
      </div>
    )
  }

  renderFailureView = () => <Error />

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideoDetails = () => {
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
    const {bannerShown} = this.state

    return (
      <AppTheme.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? 'dark' : 'home-page-bg'
          const leftNavTheme = isDarkTheme
            ? 'left-nav-dark-theme'
            : 'left-nav-light-theme'

          return (
            <div className="nxt-watch-home-container">
              <Header />
              <div className="large-devices-containers">
                <div className={`large-nav-bar-container ${leftNavTheme}`}>
                  <NavItems />
                </div>
                <div className="videos-block-container">
                  {bannerShown && this.bannerCard()}
                  <div className={`display-items-container ${bgColor}`}>
                    {this.searchBar()}
                    {this.renderVideoDetails()}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default Home
