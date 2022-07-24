import './index.css'

import {Link} from 'react-router-dom'

import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'

import NavItems from '../NavItems'

import AppTheme from '../../context/AppTheme'

const SavedVideos = () => (
  <AppTheme.Consumer>
    {value => {
      const {isDarkTheme, savedVideos} = value

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
                {savedVideos.length === 0 ? (
                  <div
                    className={`display-saved-items-container ${bgColor}`}
                    data-testid="savedVideos"
                  >
                    <div className="no-files-image-container">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                        alt="no saved videos"
                        className="no-saved-image"
                      />
                    </div>
                    <div className="no-saved-text">
                      <h1 className="no-saved-heading">
                        No saved videos found
                      </h1>
                      <p className="no-saved-description">
                        You can save your videos while watching them
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`active-tab-show ${activeBar}`}>
                      <span>
                        <MdPlaylistAdd size={25} className="active-icon" />
                      </span>
                      <h1 className="active-tab-heading">Saved Videos</h1>
                    </div>
                    <div className={`display-items-container ${bgColor}`}>
                      <div className="videos-container">
                        <ul className="saved-cards-container">
                          {savedVideos.map(each => (
                            <li key={each.id}>
                              <Link
                                to={`/videos/${each.id}`}
                                className={`saved-video-card ${bgColor}`}
                              >
                                <div className="saved-video-image-container">
                                  <img
                                    src={each.thumbnailUrl}
                                    alt="video thumbnail"
                                    className="saved-video-image"
                                  />
                                </div>
                                <div className="saved-video-content-container">
                                  <div className="saved-thumbnail-container">
                                    <img
                                      src={each.profileImageUrl}
                                      alt="profile img"
                                      className="saved-profile-img"
                                    />
                                  </div>
                                  <div className="saved-content">
                                    <p className="saved-title">{each.title}</p>
                                    <ul className="saved-video-details">
                                      <li className="saved-texts style-none">
                                        <p>{each.name}</p>
                                      </li>
                                      <li className="saved-texts">
                                        <p> {each.viewCount} views</p>
                                      </li>
                                      <li className="saved-texts">
                                        <p> {each.publishedAt}</p>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )
    }}
  </AppTheme.Consumer>
)

export default SavedVideos
