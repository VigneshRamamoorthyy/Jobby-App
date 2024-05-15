import {Component} from 'react'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FaStar} from 'react-icons/fa'

import {FiExternalLink} from 'react-icons/fi'

import {MdLocationOn} from 'react-icons/md'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import SimilarJobsCard from '../SimilarJobsCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetailData: {},
    foramattedJobSkillsData: [],
    foramattedLifeAtCompanyData: {},
    foramattedSimilarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  formatJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: data.life_at_company,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills,
    title: data.title,
  })

  foramatLifeAtCompanyAndSkills = data => ({
    description: data.description,
    imageUrl: data.image_url,
    name: data.name,
  })

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const foramattedJobData = this.formatJobDetails(data.job_details)

      const foramattedSimilarJobsData = data.similar_jobs.map(eachData =>
        this.formatJobDetails(eachData),
      )

      console.log(foramattedSimilarJobsData)

      const foramattedLifeAtCompanyData = this.foramatLifeAtCompanyAndSkills(
        foramattedJobData.lifeAtCompany,
      )
      const foramattedJobSkillsData = foramattedJobData.skills.map(eachData =>
        this.foramatLifeAtCompanyAndSkills(eachData),
      )

      this.setState({
        jobDetailData: foramattedJobData,
        foramattedLifeAtCompanyData,
        foramattedJobSkillsData,
        foramattedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetryGetDetails = () => {
    this.getJobItemDetails()
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {
      jobDetailData,
      foramattedJobSkillsData,
      foramattedLifeAtCompanyData,
      foramattedSimilarJobsData,
    } = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobDetailData

    const {description, imageUrl} = foramattedLifeAtCompanyData
    console.log(foramattedSimilarJobsData)
    return (
      <div className="job-detail-container">
        <div className="job-detail-card">
          <div className="company-logo-title">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="company-title-rating">
              <h1 className="company-job-title">{title}</h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p className="company-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-employment-type-container">
              <div className="location-container">
                <MdLocationOn className="location-company-icon" />
                <p className="company-location-type">{location}</p>
              </div>
              <div className="location-container">
                <BsFillBriefcaseFill className="location-company-icon" />
                <p className="company-location-type">{employmentType}</p>
              </div>
            </div>

            <p className="salary-package">{packagePerAnnum}</p>
          </div>
          <hr className="line-break" />
          <div className="description-link-container">
            <h1 className="company-description-header">Description</h1>
            <div className="link-container">
              <a
                href={companyWebsiteUrl}
                className="company-website-visit"
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
              <FiExternalLink className="link-icon" />
            </div>
          </div>

          <p className="company-description">{jobDescription}</p>
          <h1 className="company-details-header">Skills</h1>
          <ul className="skills-lists-container">
            {foramattedJobSkillsData.map(eachData => (
              <li className="skill-list" key={eachData.name}>
                <img
                  src={eachData.imageUrl}
                  alt={eachData.name}
                  className="skills-img"
                />
                <p className="company-details-skills">{eachData.name}</p>
              </li>
            ))}
          </ul>
          <div className="life-at-company-container">
            <h1 className="company-details-header">Life at Company</h1>
            <div className="life-at-company-content-img">
              <p className="company-description">{description}</p>

              <img
                src={imageUrl}
                className="life-at-company-img"
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-header">Similar Jobs</h1>

        <ul className="similar-job-lists">
          {foramattedSimilarJobsData.map(eachData => (
            <SimilarJobsCard similarJobDetails={eachData} key={eachData.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-img"
        alt="Failure view"
      />
      <h1 className="failure-header">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="failure-retry-button"
        type="submit"
        onClick={this.onRetryGetDetails}
      >
        Retry
      </button>
    </>
  )

  renderOutputView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">
          <div className="responsive-container">{this.renderOutputView()}</div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
