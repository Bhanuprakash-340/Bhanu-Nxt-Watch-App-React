import {Link} from 'react-router-dom'

import AppTheme from '../../context/AppTheme'

import './index.css'

const VideosView = props => {
  const {videoDetails} = props
  const {
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    name,
    profileImageUrl,
    id,
  } = videoDetails

  return (
    <AppTheme.Consumer>
      {value => {
        const {isDarkTheme} = value

        const bgColor = isDarkTheme ? 'dark' : 'light'

        return (
          <li className="each-video-card">
            <Link
              to={`/videos/${id}`}
              className={`video-link-styles ${bgColor}`}
            >
              <div className="video-image-container">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="video-image"
                />
              </div>
              <div className="video-content-container">
                <div className="thumbnail-container">
                  <img
                    src={profileImageUrl}
                    alt="profile"
                    className="profile-img"
                  />
                </div>
                <div className="content">
                  <p className="title">{title}</p>
                  <ul className="video-details">
                    <li className="texts style-none">
                      <p>{name}</p>
                    </li>
                    <li className="texts">
                      <p>{viewCount} Views</p>
                    </li>
                    <li className="texts">
                      <p>{publishedAt}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </AppTheme.Consumer>
  )
}

export default VideosView
