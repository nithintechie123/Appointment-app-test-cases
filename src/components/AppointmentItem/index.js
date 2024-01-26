import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isFavoriteStarButton} = props
  const {id, title, date, isFavorite} = appointmentDetails

  const toggleStarImage = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteButton = () => {
    isFavoriteStarButton(id)
  }

  return (
    <li className="appointment-item">
      <div className="user-star-container">
        <p className="title-heading">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="star-button"
          onClick={onClickFavoriteButton}
        >
          <img src={toggleStarImage} alt="star" />
        </button>
      </div>
      <p className="full-date">Date:{date}</p>
    </li>
  )
}

export default AppointmentItem
