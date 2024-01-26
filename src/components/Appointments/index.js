import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  isFavoriteStarButton = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavorite: !eachAppointment.isFavorite}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    const {titleInput, dateInput} = this.state
    event.preventDefault()

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy,EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getUpdatedAppointmentList = () => {
    const {isFilterActive, appointmentsList} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isFavorite === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state

    const starredButtonClassName = isFilterActive
      ? 'filter-active-button'
      : 'filter-button'

    const updatedAppointmentsList = this.getUpdatedAppointmentList()

    return (
      <div className="app-container">
        <div className="appointments-container">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="inputs-container">
            <form
              type="submit"
              className="form"
              onSubmit={this.onAddAppointment}
            >
              <label htmlFor="title" className="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="text-input"
                value={titleInput}
                placeholder="Title"
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="date" className="date">
                DATE
              </label>
              <input
                id="date"
                type="date"
                className="date-input"
                onChange={this.onChangeDateInput}
                value={dateInput}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="heading-button-container">
            <h1 className="sub-heading">Appointments</h1>
            <button
              type="button"
              className={starredButtonClassName}
              onClick={this.onFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-items-container">
            {updatedAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                isFavoriteStarButton={this.isFavoriteStarButton}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
