import React, { Component } from "react";
import ShowSchedule from "./showSchedule";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Schedule extends React.PureComponent {
  state = {
    username: "",
    agenda: "",
    dayInput: "",
    selectedMeetingRoom: "--select--",
    meetingFrom: "",
    meetingTo: "",
    checkAvailability: false,
    scheduledMeetings: [],
    isSuccess: false
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value }, function() {});
    this.setState({ checkAvailability: false, isSuccess: false });
  };

  checkAvailability = e => {
    const meetingDataObj = {
      day: "",
      Schedule: [{ meetingRoom: "", time: [], username: "", agenda: "" }]
    };
    const meetingData = this.state;
    if (this.state.scheduledMeetings.length == 0) {
      meetingDataObj.day = meetingData.dayInput;
      meetingDataObj.Schedule.map(i => {
        i.username = meetingData.username;
        i.agenda = meetingData.agenda;
        i.meetingRoom = meetingData.selectedMeetingRoom;
        i.time.push(`${meetingData.meetingFrom}-${meetingData.meetingTo}`);
      });
    } else {
      for (let x of this.state.scheduledMeetings) {
        if (x.day != meetingData.dayInput) {
          meetingDataObj.day = meetingData.dayInput;
          meetingDataObj.Schedule.map(i => {
            i.username = meetingData.username;
            i.agenda = meetingData.agenda;
            i.meetingRoom = meetingData.selectedMeetingRoom;
            i.time.push(`${meetingData.meetingFrom}-${meetingData.meetingTo}`);
          });
        }
      }
    }
    this.setState(
      {
        scheduledMeetings: [...this.state.scheduledMeetings, meetingDataObj],
        isSuccess: true
      },
      function() {}
    );
  };

  render() {
    const meetingRoom = [
      "Meeting Room 1",
      "Meeting Room 2",
      "Meeting Room 3",
      "Meeting Room 4",
      "Meeting Room 5",
      "Meeting Room 6",
      "Meeting Room 7",
      "Meeting Room 8",
      "Meeting Room 9",
      "Meeting Room 10"
    ];
    const daysArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let days = daysArr.map(d => <option key={d}>{d}</option>);
    let mrArr = meetingRoom.map(r => <option key={r}>{r}</option>);
    let showSchedule;
    if (this.state.checkAvailability == true) {
      showSchedule = <ShowSchedule userData={this.state}></ShowSchedule>;
    }

    let success = this.state.isSuccess
      ? "Meeting room booked successfully!!"
      : "";
    return (
      <div className="container">
        <div className="centerBox">
          <div className="marginDiv">
            <label>Username </label>
            <input
              type="text"
              name="username"
              onChange={this.handleInput}
              value={this.state.username || ""}
              placeholder="username"
            ></input>
          </div>
          <div className="marginDiv">
            <label>Agenda </label>
            <input
              style={{ marginLeft: "22px" }}
              type="text"
              name="agenda"
              onChange={this.handleInput}
              value={this.state.agenda || ""}
              placeholder="Agenda"
            />
          </div>
          <div className="marginDiv">
            <label>Date: </label>
            {/* <select
              id="daySelected"
              name="dayInput"
              value={this.state.dayInput}
              onChange={this.handleInput}
            >
              {days}
            </select> */}
            <input
              style={{ marginLeft: "53px" }}
              type="date"
              name="dayInput"
              onChange={this.handleInput}
              value={this.state.dayInput}
              placeholder="dayInput"
            />
          </div>
          <div className="marginDiv">
            <label htmlFor="mRooms">Meeting Room: </label>
            <select
              id="mRooms"
              name="selectedMeetingRoom"
              value={this.state.selectedMeetingRoom}
              onChange={this.handleInput}
              defaultValue={{ label: "Select", value: "Select" }}
            >
              {mrArr}
            </select>
          </div>
          <span className="marginDiv">
            <label htmlFor="meetingFrom">From: </label>
            <input
              type="time"
              id="appt"
              name="meetingFrom"
              onChange={this.handleInput}
            ></input>
            &nbsp;&nbsp;
            <label htmlFor="meetingTo">To: </label>
            <input
              type="time"
              id="appt"
              name="meetingTo"
              onChange={this.handleInput}
            ></input>
          </span>

          <div>
            <button onClick={this.checkAvailability}>Book Meeting</button>
          </div>
          <h4 style={{ color: "green" }}>{success}</h4>

          <div>
            <Link
              to={{
                pathname: "/showmeetings",
                state: {
                  passedState: this.state
                },
                meetingRoom: { meetingRoom }
              }}
              style={{ color: "rgb(91, 88, 255)" }}
            >
              Show All meeting schedule
            </Link>
          </div>
          {showSchedule}
        </div>
      </div>
    );
  }
}

Schedule.propTypes = {
  username: PropTypes.string,
  agenda: PropTypes.string,
  username: PropTypes.isRequired,
  agenda: PropTypes.isRequired
};

export default Schedule;
