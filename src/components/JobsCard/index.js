import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {Link} from 'react-router-dom'

import './index.css'

const JobsCard = props => {
  const {jobDetail} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetail
  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-card">
        <div className="company-logo-title">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
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

        <h1 className="company-description-header">Description</h1>
        <p className="company-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
