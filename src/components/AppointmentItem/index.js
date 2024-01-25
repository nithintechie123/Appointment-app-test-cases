import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {titleInput, dateInput} = appointmentDetails

  const dateString = format(new Date(dateInput))
  console.log(dateString)

  return (
    <li className="appointment-item">
      <h1>{titleInput}</h1>
      <p>{dateString}</p>
    </li>
  )
}

export default AppointmentItem
