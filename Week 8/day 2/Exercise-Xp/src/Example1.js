import React, { Component } from "react";
import data from "./data/data.json";

class Example1 extends Component {
  render() {
    return (
      <div>
        <h2>Social Medias</h2>

        {data.SocialMedias.map((socialMedia, index) => (
          <div key={index}>
            <p>{socialMedia.name}</p>
            <p>{socialMedia.url}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Example1;