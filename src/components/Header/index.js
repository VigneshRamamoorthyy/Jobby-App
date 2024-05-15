import {Link, withRouter} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="nav-header">
      <div className="nav-content">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
        </Link>

        <ul className="nav-menu-mobile">
          <Link to="/" className="nav-link">
            <li>
              <MdHome className="nav-menu-item-mobile" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>
              <BsFillBriefcaseFill className="nav-menu-item-mobile" />
            </li>
          </Link>
          <li>
            <FiLogOut
              className="nav-menu-item-mobile"
              onClick={onClickLogout}
            />
          </li>
        </ul>

        <ul className="nav-menu-lg">
          <Link to="/" className="nav-link">
            <li className="nav-menu-item">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="nav-menu-item">Jobs</li>
          </Link>
        </ul>
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
