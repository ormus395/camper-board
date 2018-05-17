import React from "react";
import "./style.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campers: [],
      isAllTime: false
    };
  }

  componentDidMount() {
    fetch("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
      .then(res => res.json())
      .then(recentCamperData => this.setState({ campers: recentCamperData }));
  }

  handleSort(e) {
    e.preventDefault();
    let url = !this.state.isAllTime
      ? "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"
      : "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
    fetch(url)
      .then(res => res.json())
      .then(camperData =>
        this.setState({ campers: camperData, isAllTime: !this.state.isAllTime })
      );
  }

  render() {
    let camperTable = this.state.campers.map((camper, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>
            <img src={camper.img} alt="avatar" />
            {camper.username}
          </td>
          <td>{camper.recent} </td>
          <td>{camper.alltime} </td>
        </tr>
      );
    });
    return (
      <div>
        <h3>Leaderboard</h3>
        <table>
          <thead>
            <th>#</th>
            <th>Camper Name</th>
            <th>
              <a onClick={this.handleSort.bind(this)}>
                {" "}
                Points in past 30 days
              </a>
              <span>{!this.state.isAllTime ? "Active" : null}</span>
            </th>
            <th>
              <a onClick={this.handleSort.bind(this)}>All time points</a>
              <span>{this.state.isAllTime ? "Active" : null}</span>
            </th>
          </thead>
          <tbody>{this.state.campers < 1 ? "Loading" : camperTable}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
