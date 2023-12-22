import React, { useState, useEffect } from 'react';
import './Calender.css';
import db from './firebaseConfig';
import { collection, getDocs } from '@firebase/firestore';
import Main from './main';


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



const Calendar = () => {
  const currentDate = new Date();
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

  const handleDayClick = (day) => {
    const combinedDate = new Date(year, month, day);
    setSelectedDay(combinedDate);
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
        <button onClick={goToPreviousMonth}>&lt; Previous Month</button>
        <h2>{`${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`}</h2>
        <button onClick={goToNextMonth}>Next Month &gt;</button>
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
                  {day !== '' ? <>
                    {day.value ? <>
                      <div className='calender-cell'>
                        <a href="#" onClick={() => handleDayClick(day.day)}>
                          <span style={{ color: Number(day.value) < 0 ? 'red' : 'green' }}>{day.value}</span><br></br>
                          <p>{day.day}</p>
                        </a>
                      </div>
                    </> : <>
                      <div className='calender-cell'>
                        <a >
                          <span>{day.value}</span><br></br>
                          <p>{day.day}</p>
                        </a>
                      </div>
                    </>}
                  </> : null}
                </td>
              ))}
              <td>
                {calculateWeekSum(week) !== 0 && (
                  <div>
                    <p style={{ color: Number(calculateWeekSum(week)) < 0 ? 'red' : 'green' }}>
                      {calculateWeekSum(week) > 0 ? `+${calculateWeekSum(week).toFixed(2)}` : calculateWeekSum(week).toFixed(2)}
                    </p>
                  </div>
                )}
              </td>
              {index === 0 && (
                <td rowSpan='6'>
                  <div>
                    <h4>MONTH</h4>
                    <h6>PROFIT & LOSS</h6><br></br>
                    <p style={{ color: calculateSum(monthData) < 0 ? 'red' : 'green' }}>
                      {calculateSum(monthData) > 0 ? `+${calculateSum(monthData)}`: calculateSum(monthData)}</p><br></br>
                    <h4>PROFIT</h4>
                    <h6>TILL TODAY</h6>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>SATURDAY, SUNDAY ARE NO TRADE IN FOREX MARKET</h3>
        <h3>TELEGRAM</h3>
        <h3>WHATSAPP</h3>
      </div>
      // {selectedDay && <Main data={selectedDay} view={'daily'} />}
    </div>
  );
};

export default Calendar;
