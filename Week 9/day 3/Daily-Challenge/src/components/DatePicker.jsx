function DatePicker({ selectedDate, onDateChange }) {
  return (
    <section className="date-panel" aria-label="Choose a planner date">
      <div className="date-copy">
        <p className="eyebrow">YOUR SCHEDULE</p>
        <h1>Make today <span>count.</span></h1>
        <p className="date-description">
          A little structure leaves room for what matters.
        </p>
      </div>
      <div className="date-controls">
        <label className="date-label" htmlFor="planner-date">Planning for</label>
        <input
          id="planner-date"
          className="date-input"
          type="date"
          value={selectedDate}
          onChange={(event) => onDateChange(event.target.value)}
        />
      </div>
    </section>
  )
}

export default DatePicker
