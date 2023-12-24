import React, { useState, useEffect } from "react";
import db from "./firebaseConfig";
import MonthCalendar from "./Monthcalender";
import "./yearlyCalender.css";
import { collection, getDocs } from "firebase/firestore";

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const getMonthData = async (year, month) => {
  const date = new Date(year, month); // Adjusting to zero-based index
  const shortMonth = date
    .toLocaleString("en-US", { month: "short" })
    .toLowerCase();
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
          const specificObject = fetchedData.find(
            (item) => Number(item.id) === dayCounter
          );
          let dayObj = {};
          if (specificObject) {
            dayObj = { day: dayCounter, ...specificObject };
          } else {
            dayObj = { day: dayCounter };
          }
          week.push(dayObj);
          dayCounter++;
        } else {
          week.push("");
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

const YearlyCalendar = ({ initialYear }) => {
  const [year, setYear] = useState(initialYear);
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allMonthsData = [];
        for (let month = 0; month < 12; month++) {
          const monthData = await getMonthData(year, month);
          allMonthsData.push(monthData);
        }
        setYearlyData(allMonthsData);
      } catch (error) {
        console.error("Error fetching yearly data:", error);
      }
    };

    fetchData();
  }, [year]);

  const goToPreviousYear = () => {
    setYear((prevYear) => prevYear - 1);
  };

  const goToNextYear = () => {
    setYear((prevYear) => prevYear + 1);
  };

  
  return (
    <div className="yearly-calendar-container">
      <div className="yearly-calendar-header">
        <button onClick={goToPreviousYear}>&lt; Previous Year</button>
        <h2>{year}</h2>
        <button onClick={goToNextYear}>Next Year &gt;</button>
      </div>
      <div className="yearly-calendar">
        {yearlyData.map((monthData, index) => (
          <MonthCalendar
            key={index}
            month={index}
            year={year}
            data={monthData}
          />
        ))}
      </div>
    </div>
  );
};

export default YearlyCalendar;
