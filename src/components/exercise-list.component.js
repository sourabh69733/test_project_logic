import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username} </td>
    <td>{props.exercise.description} </td>
    <td>{props.exercise.duration} </td>
    <td>{props.exercise.date.substring(0, 10)} </td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>Edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteExercise(id) {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((response) => console.log(response.data));
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }
  exerciseList() {
    return this.state.exercises.map((currexercise) => {
      return (
        <Exercise
          exercise={currexercise}
          deleteExercise={this.deleteExercise}
          key={currexercise._id}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <h3> Logged Exercises</h3>
        <table className="table">
          <thread className="thread-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thread>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
