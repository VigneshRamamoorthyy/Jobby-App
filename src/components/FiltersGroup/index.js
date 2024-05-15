import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onApplySalaryRange,
    onChangeEmployeeList,
    checkedEmploymentTypes,
  } = props

  const onChangesalary = event => {
    onApplySalaryRange(event.target.value)
  }

  const onSelectEmployeeType = event => {
    onChangeEmployeeList(event.target.value, event.target.checked)
  }

  const renderEmploymentTypesList = () => (
    <div>
      <hr className="line-break" />
      <h1 className="filters-range-header">Type of Employment</h1>

      <ul className="filter-types-lists">
        {employmentTypesList.map(eachList => (
          <li className="filter-types-list" key={eachList.employmentTypeId}>
            <input
              type="checkbox"
              id={eachList.employmentTypeId}
              className="filter-input"
              value={eachList.employmentTypeId}
              onChange={onSelectEmployeeType}
              checked={checkedEmploymentTypes.includes(
                eachList.employmentTypeId,
              )}
            />
            <label
              className="filters-label"
              htmlFor={eachList.employmentTypeId}
            >
              {eachList.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRangeList = () => (
    <div>
      <hr className="line-break" />
      <h1 className="filters-range-header">Salary Range</h1>

      <ul className="filter-types-lists">
        {salaryRangesList.map(eachList => (
          <li className="filter-types-list" key={eachList.salaryRangeId}>
            <input
              type="radio"
              value={eachList.salaryRangeId}
              onChange={onChangesalary}
              name="salary_range"
              className="filter-input"
              id={eachList.salaryRangeId}
            />
            <label className="filters-label" htmlFor={eachList.salaryRangeId}>
              {eachList.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="filter-group-container">
      {renderEmploymentTypesList()}
      {renderSalaryRangeList()}
    </div>
  )
}

export default FiltersGroup
