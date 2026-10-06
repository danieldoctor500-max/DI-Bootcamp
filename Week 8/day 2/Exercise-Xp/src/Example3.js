import React, { Component } from "react";
import data from "./data/data.json";

class Example3 extends Component {
  render() {
    return (
      <div>
        <h2>Experiences</h2>

        {data.Experiences.map((experience, index) => (
          <div key={index}>
            <p>Company: {experience.company}</p>
            <p>Role: {experience.role}</p>
            <p>Years: {experience.years}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;