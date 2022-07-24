import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ReactPlayer from 'react-player'

import Cookies from 'js-cookie'

import {BiLike, BiDislike} from 'react-icons/bi'

import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'

import NavItems from '../NavItems'

import Error from '../Error'

import AppTheme from '../../context/AppTheme'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class VideoItem extends Component {
  state = {
    videoItemDetails: [],
    apiStatus: apiStatusConstants.initial,
    isSaved: false,
    liked: false,
    disliked: false,
  }

  componentDidMount() {
    this.getVideoItem()
  }

  getVideoItem = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.video_details
      const updatedData = {
        description: fetchedData.description,
        id: fetchedData.id,
        publishedAt: fetchedData.published_at,
        thumbnailUrl: fetchedData.thumbnail_url,
        title: fetchedData.title,
        videoUrl: fetchedData.video_url,
        viewCount: fetchedData.view_count,
        name: fetchedData.channel.name,
        profileImageUrl: fetchedData.channel.profile_image_url,
        subscribersCount: fetchedData.channel.subscriber_count,
      }
      this.setState({
        videoItemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSavingVideo = async () => {
    const {isSaved} = this.state

    if (isSaved) {
      await this.setState({isSaved: false})
    } else {
      await this.setState({isSaved: true})
    }
  }

  isDisLiked = () => {
    const {liked, disliked} = this.state
    if (liked) {
      this.setState({liked: false})
    }
    if (disliked) {
      this.setState({disliked: false})
    } else {
      this.setState({disliked: true})
    }
  }

  isLiked = () => {
    const {liked, disliked} = this.state
    if (disliked) {
      this.setState({disliked: false})
    }
    if (liked) {
      this.setState({liked: false})
    } else {
      this.setState({liked: true})
    }
  }

  renderSuccessView = () => (
    <AppTheme.Consumer>
      {value => {
        const {addSavedVideos, isDarkTheme} = value

        const {videoItemDetails, isSaved, liked, disliked} = this.state

        const {
          description,
          publishedAt,
          title,
          videoUrl,
          viewCount,
          name,
          profileImageUrl,
          subscribersCount,
        } = videoItemDetails

        const colorChange = isSaved ? 'blue-rec' : 'normal'

        const likedButton = liked ? 'blue-rec' : 'normal'

        const disLikeButton = disliked ? 'blue-rec' : 'normal'

        const textChange = isSaved ? 'Saved' : 'Save'

        const bgColor = isDarkTheme ? 'dark' : 'light'

        const onSave = () => {
          this.onSavingVideo()
          addSavedVideos(videoItemDetails)
        }

        return (
          <>
            <div className="video">
              <ReactPlayer url={videoUrl} controls className="video-player" />
            </div>
            <div className="video-item-content">
              <p className="title-text-v">{title}</p>
              <div className="extra-need">
                <div className="view-pub-at">
                  <p className="view-text">{viewCount} views</p>
                  <p className="view-text">{publishedAt}</p>
                </div>
                <div className="reaction-buttons-container">
                  <button
                    type="button"
                    className={`reaction-button ${likedButton} ${bgColor}`}
                    onClick={this.isLiked}
                  >
                    <BiLike size={18} /> <span>Like</span>
                  </button>
                  <button
                    type="button"
                    className={`reaction-button ${disLikeButton} ${bgColor}`}
                    onClick={this.isDisLiked}
                  >
                    <BiDislike size={18} />
                    <span>Dislike</span>
                  </button>
                  <button
                    type="button"
                    className={`reaction-button ${colorChange} ${bgColor}`}
                    onClick={onSave}
                  >
                    <MdPlaylistAdd size={18} />
                    <span className={`${colorChange}`}>{textChange}</span>
                  </button>
                </div>
              </div>
              <hr />
              <div className="profile-container">
                <div>
                  <img
                    src={profileImageUrl}
                    alt="channel logo"
                    className="profile-img"
                  />
                </div>
                <div className="sub-name-container">
                  <p>{name}</p>
                  <p>{subscribersCount}Subscribers</p>
                </div>
              </div>
              <div className="description-container">
                <p className="description">{description}</p>
              </div>
            </div>
          </>
        )
      }}
    </AppTheme.Consumer>
  )

  renderFailureView = () => <Error />

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderVideoPlayerDetails = () => {
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

          return (
            <>
              <div className="nxt-watch-home-container">
                <Header />
                <div className="large-devices-containers">
                  <div className={`large-nav-bar-container ${leftNavTheme}`}>
                    <NavItems />
                  </div>
                  <div
                    className={`video-items-block-container ${bgColor}`}
                    data-testid="videoItemDetails"
                  >
                    {this.renderVideoPlayerDetails()}
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

export default VideoItem
