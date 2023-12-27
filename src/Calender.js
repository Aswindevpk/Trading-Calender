import React, { useState, useEffect } from 'react';
import './Calender.css';
import db from './firebaseConfig';
import { collection, getDocs } from '@firebase/firestore';
import Main from './main';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "./assets/logo.png";
import temp from "./assets/day_template.png"


const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const getMonthData = async (year, month) => {
  const date = new Date(year, month); // Adjusting to zero-based index
  const shortMonth = date.toLocaleString('en-US', { month: 'short' }).toLowerCase();
  let collectionName = `${shortMonth}${year}`;
  const monthCollectionRef = collection(db, collectionName);
  try {
    const daydata = await getDocs(monthCollectionRef);
    const fetchedData = daydata.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(year, month);
    const data = [];

    let dayCounter = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push("");
        } else if (dayCounter <= totalDays) {
          const specificObject = fetchedData.find((item) => Number(item.id) === dayCounter);
          let dayObj = {}
          if (specificObject) {
            dayObj = { day: dayCounter, ...specificObject }
          } else {
            dayObj = { day: dayCounter }
          }
          week.push(dayObj);
          dayCounter++;
        } else {
          week.push("")
        }
      }
      data.push(week);
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};



const Calendar = ({date}) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth());
  const [monthData, setMonthData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMonthData(year, month);
        setMonthData(data);
        console.log(data)
      } catch (error) {
        // Handle error
        console.error("Error fetching month data:", error);
      }
    };

    fetchData();
  }, [year, month]);

  const goToPreviousMonth = () => {
    setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setYear((prevYear) => (month === 0 ? prevYear - 1 : prevYear));
  };

  const goToNextMonth = () => {
    setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setYear((prevYear) => (month === 11 ? prevYear + 1 : prevYear));
  };

  const [selectedDay, setSelectedDay] = useState(null);


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

  const calculateSum = (monthData) => {
    return monthData.reduce((acc, week) => {
      return acc + week.reduce((weekAcc, day) => {
        return weekAcc + (parseFloat(day.value, 10) || 0);
      }, 0);
    }, 0).toFixed(2);
  };


  const calculateWeekSum = (rowData) => {
    return rowData.reduce((acc, day) => acc + (parseFloat(day.value, 10) || 0), 0);
  };


  return (
    <div className="calender-container">
      <div className="calender-header">
        <button onClick={goToPreviousMonth}>&lt; Prev</button>
        <h2>{`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`}</h2>
        <button onClick={goToNextMonth}>Next &gt;</button>
      </div>
      <table className="calender-table">
        <thead>
          <tr>
            <th>SUNDAY</th>
            <th>MONDAY</th>
            <th>TUESDAY</th>
            <th>WEDNESDAY</th>
            <th>THURSDAY</th>
            <th>FRIDAY</th>
            <th>SATURDAY</th>
            <th>WEEK P&L</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {monthData.map((week, index) => (
            <tr key={index}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex}>
                  <a onClick={() => handleDayClick(day.day)}>
                    {day !== '' ? <>
                      {day.value ? <>
                        <div className='calendar-cell'>
                          <div className='calendar-cell_content'>
                            <div>
                              <div className="calendar-cell-header-values gradient__blue">
                                <span className="calendar-cell-header-values-action">{day.action} |</span>
                                <span className="calendar-cell-header-values-cap">{day.cap} |</span>
                                <span className="calendar-cell-header-values-option">{day.type}</span>
                              </div>
                              <p className={`calendar-cell-header-mainvalue ${Number(day.value) < 0 ? "gradient__red" : "gradient__green"}`}>{day.value}%</p>
                              <p className="calendar-cell-header-entryprice">ENTRY PRICE : {day.entry}</p>
                              <p className="calendar-cell-header-closeprice">CLOSE PRICE : {day.close}</p>
                              {/* <p className='calendar-cell-header-date'>{day.day}</p> */}
                            </div>
                            <div className='calendar-cell-day'>
                              <p className='gradient__day'>{day.day}</p>
                            </div>
                          </div>
                          <img className='calendar-cell_img' src={temp} alt="Your Photo" ></img>
                        </div>
                      </> : <>
                        <div className='calendar-cell-blank'>
                          <div className='calendar-cell-blank_content'>
                            <p className='gradient__day'>{day.day}</p>
                          </div>
                          <img className='calendar-cell-blank_img' src={logo} alt="Your Photo" ></img>
                        </div>
                      </>
                      }
                    </>
                      : <>
                        <div className='calendar-cell-blank' style={{ backgroundColor: '#191919' }}>
                          <img className="calendar-cell-blank_img " src={logo} alt="Your Photo" ></img>
                        </div>
                      </>
                    }
                  </a>
                </td>
              ))}
              <td>
                {calculateWeekSum(week) !== 0 && (
                  <div className='calendar-week-pl'>
                    <p className={`${Number(calculateWeekSum(week)) < 0 ? "gradient__red" : "gradient__green"}`} >
                      {calculateWeekSum(week) > 0 ? `+${calculateWeekSum(week).toFixed(2)}%` : `${calculateWeekSum(week).toFixed(2)}%`}
                    </p>
                  </div>
                )}
              </td>
              {index === 0 && (
                <td rowSpan='6'>
                  <div className='calendar-month-pl'>
                    <h4 className='gradient__blue'>MONTH</h4>
                    <h6 className='gradient__blue'>PROFIT & LOSS</h6><br></br>
                    <p className={`${Number(calculateSum(monthData)) < 0 ? "gradient__red" : "gradient__green"}`} >
                      {calculateSum(monthData) > 0 ? `+${calculateSum(monthData)}%` : `${calculateSum(monthData)}%`}</p><br></br>
                    <h4 className='gradient__blue'>PROFIT</h4>
                    <h6 className='gradient__blue'>TILL TODAY</h6>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='calendar-footer gradient__blue'>
        <h3>SATURDAY, SUNDAY ARE NO TRADE IN FOREX MARKET</h3>
        <h3>TELEGRAM</h3>
        <h3>WHATSAPP</h3>
      </div>
      {selectedDay && <Main data={selectedDay} view={'daily'} />}
    </div>
  );
};

export default Calendar;
