import './index.css'

const NotFound = () => (
  <div className="no-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="no-found-img"
      alt="not found"
    />
    <h1 className="no-found-header">Page Not Found</h1>
    <p className="no-found-description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
