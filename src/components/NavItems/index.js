import {AiFillHome} from 'react-icons/ai'
import {ImFire} from 'react-icons/im'
import {SiYoutubegaming} from 'react-icons/si'
import {MdPlaylistAdd} from 'react-icons/md'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import AppTheme from '../../context/AppTheme'

import './index.css'

class NavItems extends Component {
  render() {
    return (
      <AppTheme.Consumer>
        {value => {
          const {isDarkTheme} = value
          const bgColor = isDarkTheme ? 'nav-dark' : 'nav-light'
          const hoverColor = isDarkTheme ? 'hover-dark' : 'hover-light'
          return (
            <>
              <ul className="left-nav-items-container">
                <Link to="/" className={`link-styles ${hoverColor}`}>
                  <li className={`items ${bgColor}`}>
                    <span>
                      <AiFillHome size={25} />
                    </span>
                    <p className="nav-texts">Home</p>
                  </li>
                </Link>
                <Link to="/trending" className={`link-styles ${hoverColor}`}>
                  <li className={`items ${bgColor}`}>
                    <span>
                      <ImFire size={25} />
                    </span>
                    <p className="nav-texts">Trending</p>
                  </li>
                </Link>
                <Link to="/gaming" className={`link-styles ${hoverColor}`}>
                  <li className={`items ${bgColor}`}>
                    <span>
                      <SiYoutubegaming size={25} />
                    </span>
                    <p className="nav-texts">Gaming</p>
                  </li>
                </Link>
                <Link
                  to="/saved-videos"
                  className={`link-styles ${hoverColor}`}
                >
                  <li className={`items ${bgColor}`}>
                    <span>
                      <MdPlaylistAdd size={25} />
                    </span>
                    <p className="nav-texts">Saved Videos</p>
                  </li>
                </Link>
              </ul>
              <div className="contact-container">
                <p className="contact-heading">CONTACT US</p>
                <ul className="soc-media-apps">
                  <li>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                      alt="facebook logo"
                      className="social-icons"
                    />
                  </li>
                  <li>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                      alt="twitter logo"
                      className="social-icons"
                    />
                  </li>
                  <li>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                      alt="linked in logo"
                      className="social-icons"
                    />
                  </li>
                </ul>
                <p className="content-des">
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default NavItems
