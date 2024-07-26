// MonthCalendar.jsx
import React from "react";
import "./Monthcalender.css";
import logo from "./assets/logo.png";
import temp from "./assets/day_template.png";
import no_data from "./assets/no-data.jpg";
import { useNavigate, useLocation } from 'react-router-dom';


const MonthCalendar = ({ month, year, data }) => {
  const calculateSum = (data) => {
    return data.reduce((acc, week) => {
      return acc + week.reduce((weekAcc, day) => {
        return weekAcc + (parseFloat(day.value, 10) || 0);
      }, 0);
    }, 0).toFixed(2);
  };

  const calculateWeekSum = (rowData) => {
    return rowData.reduce((acc, day) => acc + (parseFloat(day.value, 10) || 0), 0);
  };

  const navigate = useNavigate();
  const location = useLocation();


  const handleDayClick = (day) => {
    const combinedDate = new Date(year, month, day);

    // Check if the current navigation action is a 'POP' (back/forward button)
    const isPopAction = location.state?.action === 'POP';

    if (isPopAction) {
      // Handle pop action (e.g., back button clicked)
      // You may want to customize this based on your use case
    } else {
      // Handle normal navigation
      navigate(`/daily/${combinedDate}`);
    }
  };

  const handleMonthClick = (year,month) => {
    const combinedDate = new Date(year, month);

    // Check if the current navigation action is a 'POP' (back/forward button)
    const isPopAction = location.state?.action === 'POP';

    if (isPopAction) {
      // Handle pop action (e.g., back button clicked)
      // You may want to customize this based on your use case
    } else {
      // Handle normal navigation
      navigate(`/month/${combinedDate}`);
    }
  };
  return (
    <div className="yearly-month-calendar">
      <a onClick={()=> handleMonthClick(year,month)}>
        <h3>{`${new Date(year, month).toLocaleString("default", {month: "short",}).toUpperCase()} ${year}`}</h3>
      </a>
      <table className="yearly-calender-table">
        <thead>
          <tr>
            <th>SUN</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
            <th>SAT</th>
            <th>WEEK P&L</th>
          </tr>
        </thead>
        <tbody>
          {data.map((week, index) => (
            <tr key={index}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex}>
                  <>
                  <a onClick={() => handleDayClick(day.day)}>
                    {day !== "" ? (
                      <>
                        {day.value ? (
                          <>
                            <div className="yearly-calendar-cell">
                              <div className="yearly-calendar-cell_content">
                                <div>
                                  <div className="yearly-calendar-cell-header-values gradient__blue">
                                    <span className="yearly-calendar-cell-header-values-action">
                                      {day.action} |
                                    </span>
                                    <span className="yearly-calendar-cell-header-values-cap">
                                      {day.cap} |
                                    </span>
                                    <span className="yearly-calendar-cell-header-values-option">
                                      {day.type}
                                    </span>
                                  </div>
                                  <p
                                    className={`yearly-calendar-cell-header-mainvalue ${
                                      Number(day.value) < 0
                                        ? "gradient__red"
                                        : "gradient__green"
                                    }`}
                                  >
                                    {day.value}%
                                  </p>
                                  <p className="yearly-calendar-cell-header-entryprice">
                                    ENTRY PRICE : {day.entry}
                                  </p>
                                  <p className="yearly-calendar-cell-header-closeprice">
                                    CLOSE PRICE : {day.close}
                                  </p>
                                  {/* <p className='calendar-cell-header-date'>{day.day}</p> */}
                                </div>
                                <div className="yearly-calendar-cell-day">
                                  <p className="gradient__day">{day.day}</p>
                                </div>
                              </div>
                              <img
                                className="yearly-calendar-cell_img"
                                src={temp}
                                alt="Your Photo"
                              ></img>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="yearly-calendar-cell-blank">
                              <div className="yearly-calendar-cell-blank_content">
                                <p className="gradient__day">{day.day}</p>
                              </div>
                              <img
                                className="yearly-calendar-cell-blank_img"
                                src={no_data}
                                alt="Your Photo"
                              ></img>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <div
                          className="yearly-calendar-cell-blank"
                          style={{ backgroundColor: "#191919" }}
                        >
                          <img
                            className="yearly-calendar-cell-blank_img"
                            src={no_data}
                            alt="Your Photo"
                          ></img>
                        </div>
                      </>
                    )}
                    </a>
                  </>
                </td>
              ))}
              <td>
                {calculateWeekSum(week) !== 0 && (
                  <div className="yearly-calendar-week-pl">
                    <p
                      className={`${
                        Number(calculateWeekSum(week)) < 0
                          ? "gradient__red"
                          : "gradient__green"
                      }`}
                    >
                      {calculateWeekSum(week) > 0
                        ? `+${calculateWeekSum(week).toFixed(2)}%`
                        : `${calculateWeekSum(week).toFixed(2)}%`}
                    </p>
                  </div>
                )}
              </td>
              {index === 0 && (
                <td rowSpan="6">
                  <div className="yearly-calendar-month-pl">
                    <h4 className="gradient__blue">MONTH</h4>
                    <h6 className="gradient__blue">PROFIT & LOSS</h6>
                    <br></br>
                    <p
                      className={`${
                        Number(calculateSum(data)) < 0
                          ? "gradient__red"
                          : "gradient__green"
                      }`}
                    >
                      {calculateSum(data) > 0
                        ? `+${calculateSum(data)}%`
                        : `${calculateSum(data)}%`}
                    </p>
                    <br></br>
                    {/* <h4 className="gradient__blue">PROFIT</h4>
                    <h6 className="gradient__blue">TILL TODAY</h6> */}
                  </div>
                </td>
              )} 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthCalendar;
