import React, { Component } from "react";
import { Link } from "react-router-dom";

class ShowSchedule extends React.PureComponent {
  state = {
    selectedMeetingRoom: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value }, function() {});
  };
  render() {
    const meetingRooms = this.props.location.meetingRoom.meetingRoom;
    const scheduleMeetings = this.props.location.state.passedState;
    let meetings;
    let meetingTable;
    if (
      this.state.selectedMeetingRoom == scheduleMeetings.selectedMeetingRoom
    ) {
      meetings = scheduleMeetings;
      meetingTable = (
        <table style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Agenda</th>
              <th>Day</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{meetings.username}</td>
              <td>{meetings.agenda}</td>
              <td>{meetings.dayInput}</td>
              <td>{meetings.meetingFrom}</td>
              <td>{meetings.meetingTo}</td>
            </tr>
          </tbody>
        </table>
      );
    }
    return (
      <div>
        <center>
          <h5>Select meeting room to view scheduled meetings.</h5>
          <Link
            to={{
              pathname: "/"
            }}
            style={{ color: "rgb(91, 88, 255)" }}
          >
            <button style={{ margin: "10px" }}>Back</button>
          </Link>
          <select
            onChange={this.handleChange}
            name="selectedMeetingRoom"
            value={this.state.selectedMeetingRoom}
          >
            {meetingRooms.map(i => (
              <option key={i}>{i}</option>
            ))}
          </select>

          {meetingTable}
        </center>
      </div>
    );
  }
}

export default ShowSchedule;
