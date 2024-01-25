import {Component} from 'react'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {titleInput: '', dateInput: '', appointmentsList: []}

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  render() {
    const {appointmentsList} = this.state
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
              <p className="title">TITLE</p>
              <input
                type="text"
                id="title"
                className="text-input"
                placeholder="Title"
                onChange={this.onChangeTitleInput}
              />
              <p className="date">DATE</p>
              <input type="date" className="date-input" />
              <button type="button" className="add-button">
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
            <h1 className="sub-heading">Appointements</h1>
            <button type="button" className="starred-button">
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {appointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
