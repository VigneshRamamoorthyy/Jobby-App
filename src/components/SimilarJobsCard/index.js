import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobsCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="similar-job-card">
      <div className="similar-job-company-logo-title">
        <img
          src={companyLogoUrl}
          className="similar-job-company-logo"
          alt="similar job company logo"
        />
        <div className="similar-job-company-title-rating">
          <h1 className="similar-job-company-job-title">{title}</h1>
          <div className="similar-job-rating-container">
            <FaStar className="similar-job-star-icon" />
            <p className="similar-job-company-rating">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="similar-job-description-header">Description</h1>
      <p className="similar-job-company-description">{jobDescription}</p>
      <div className="similar-job-location-employment-type-container">
        <div className="similar-job-location-container">
          <MdLocationOn className="similar-job-location-company-icon" />
          <p className="similar-job-location-type">{location}</p>
        </div>
        <div className="similar-job-location-container">
          <BsFillBriefcaseFill className="similar-job-location-company-icon" />
          <p className="similar-job-location-type">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsCard
