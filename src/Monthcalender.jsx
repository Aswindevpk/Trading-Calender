// MonthCalendar.jsx
import React from "react";
import "./yearlyCalender.css";

const MonthCalendar = ({ month, year, data }) => {
  return (
    <div className="yearly-month-calendar">
      <h3>{`${new Date(year, month).toLocaleString("default", {
        month: "short",
      })} ${year}`}</h3>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {data.map((week, index) => (
            <tr key={index}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex}>
                  <>
                    {day !== "" ? (
                      <>
                        {day.value ? (
                          <>
                            <div
                              className="yearly-month-calender"
                              style={{
                                backgroundColor:
                                  Number(day.value) < 0
                                    ? "rgb(250, 176, 176)"
                                    : Number(day.value) > 0
                                    ? "#C1F2B0"
                                    : "white",
                              }}
                            >
                              <span
                                className="yearly-month-calender-value"
                                style={{
                                  color:
                                    Number(day.value) < 0 ? "red" : "green",
                                }}
                              >
                                {day.value}
                              </span>
                              <br></br>
                              <span className="yearly-month-calender-day">
                                {day.day}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className="yearly-month-calender"
                              style={{ backgroundColor: "white" }}
                            >
                              <span className="yearly-month-calender-value">
                                {day.value}
                              </span>
                              <br></br>
                              <span className="yearly-month-calender-day">
                                {day.day}
                              </span>
                            </div>
                          </>
                        )}
                      </>
                    ) : null}
                  </>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthCalendar;
