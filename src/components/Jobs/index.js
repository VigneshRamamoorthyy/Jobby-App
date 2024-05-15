import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import ProfileCard from '../ProfileCard'
import FiltersGroup from '../FiltersGroup'

import JobsCard from '../JobsCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobDetails: [],
    searchInput: '',
    salaryRangeId: '',
    employeeType: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {searchInput, salaryRangeId, employeeType} = this.state
    console.log(searchInput)
    console.log(employeeType)

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${salaryRangeId}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const formattedData = data.jobs.map(eachData => ({
        id: eachData.id,
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))

      this.setState({
        jobDetails: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  onClickSearchButton = () => {
    this.getJobsDetails()
  }

  onApplySalaryRange = id => {
    this.setState({salaryRangeId: id}, this.getJobsDetails)
  }

  onChangeEmployeeList = (type, isChecked) => {
    this.setState(prevState => {
      const {employeeType} = prevState
      if (isChecked) {
        if (!employeeType.includes(type)) {
          return {employeeType: [...employeeType, type]}
        }
      } else {
        return {employeeType: employeeType.filter(item => item !== type)}
      }
      return null
    }, this.getJobsDetails)
  }

  onRetryGetDetails = () => {
    this.getJobsDetails()
  }

  renderSeacrhInputMobile = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container-mobile">
        <input
          type="search"
          className="search-input-field"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyPress={this.onEnterSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />.
        </button>
      </div>
    )
  }

  renderSeacrhInputlg = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container-lg">
        <input
          type="search"
          className="search-input-field"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          onKeyPress={this.onEnterSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearchButton}
        >
          <BsSearch className="search-icon" />.
        </button>
      </div>
    )
  }

  renderProfileCard = () => <ProfileCard />

  renderJobCard = () => {
    const {jobDetails} = this.state
    const noJobs = jobDetails.length === 0

    return noJobs ? (
      <>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />

        <h1 className="failure-header">No Jobs Found</h1>
        <p className="failure-description">
          We could not find any jobs. Try other filters
        </p>
      </>
    ) : (
      <>
        <ul className="job-lists">
          {jobDetails.map(eachData => (
            <JobsCard jobDetail={eachData} key={eachData.id} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-img"
        alt="failure view"
      />
      <h1 className="failure-header">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
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

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderJobCard()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {employeeType} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="responsive-container">
            <div className="job-section-lg">
              <div className="profile-card-filter-container-lg">
                {this.renderSeacrhInputMobile()}
                {this.renderProfileCard()}
                <FiltersGroup
                  employmentTypesList={employmentTypesList}
                  salaryRangesList={salaryRangesList}
                  onApplySalaryRange={this.onApplySalaryRange}
                  onChangeEmployeeList={this.onChangeEmployeeList}
                  checkedEmploymentTypes={employeeType}
                />
              </div>
              <div className="jobs-list-container-lg">
                {this.renderSeacrhInputlg()}
                {this.renderAllJobs()}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
