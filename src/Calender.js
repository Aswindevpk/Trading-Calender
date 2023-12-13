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
          {monthData.map((week, index) => (
            <tr key={index}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex}>
                  {day !== '' ? <>
                    {day.value ? <>
                      <div className='calender-cell' style={{ backgroundColor: Number(day.value) < 0 ? 'rgb(250, 176, 176)' : '#C1F2B0' }}>
                        <a>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
