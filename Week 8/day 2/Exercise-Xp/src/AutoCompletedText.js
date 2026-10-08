import React, { Component } from "react";
import countries from "./countries";
import "./AutoCompletedText.css";

class AutoCompletedText extends Component {
  state = {
    suggestions: [],
    text: "",
  };

  handleChange = (event) => {
    const text = event.target.value;
    const query = text.trim().toLowerCase();

    this.setState({
      text,
      suggestions: query
        ? countries.filter((country) =>
            country.toLowerCase().startsWith(query)
          )
        : [],
    });
  };

  selectCountry = (country) => {
    this.setState({
      text: country,
      suggestions: [],
    });
  };

  render() {
    const { suggestions, text } = this.state;

    return (
      <div className="autocomplete">
        <label className="autocomplete__label" htmlFor="country-search">
          Country
        </label>
        <input
          autoComplete="off"
          className="autocomplete__input"
          id="country-search"
          onChange={this.handleChange}
          placeholder="Start typing a country..."
          value={text}
        />
        {suggestions.length > 0 && (
          <ul className="autocomplete__suggestions">
            {suggestions.map((country) => (
              <li key={country}>
                <button
                  className="autocomplete__suggestion"
                  onClick={() => this.selectCountry(country)}
                  type="button"
                >
                  {country}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default AutoCompletedText;
