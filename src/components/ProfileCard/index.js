import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  inital: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {
    activeApiStatus: apiStatusConstants.inital,
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      activeApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()

    if (response.ok === true) {
      const formatProfileDetails = {
        profileDetails: data.profile_details,
      }

      const {profileDetails} = formatProfileDetails

      const formatProfileDetailsData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        profileDetails: formatProfileDetailsData,
        activeApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        activeApiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetryProfile = () => {
    this.getProfileDetails()
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfilecardView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-content-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-short-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureVeiw = () => (
    <>
      <button
        className="retry-button"
        onClick={this.onRetryProfile}
        type="button"
      >
        Retry
      </button>
    </>
  )

  renderOuputView = () => {
    const {activeApiStatus} = this.state

    switch (activeApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderProfilecardView()
      case apiStatusConstants.failure:
        return this.renderFailureVeiw()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-card-container">{this.renderOuputView()}</div>
    )
  }
}

export default ProfileCard
