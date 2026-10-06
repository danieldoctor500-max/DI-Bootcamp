import React, { Component } from "react";
import data from "./data/data.json";

class Example2 extends Component {
  render() {
    return (
      <div>
        <h2>Skills</h2>

        {Object.entries(data.Skills).map(([skill, level]) => (
          <p key={skill}>
            {skill}: {level}
          </p>
        ))}
      </div>
    );
  }
}

export default Example2;