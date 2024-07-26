import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebaseConfig";
import "./dailyCalender.css";
import dayPhoto from "./assets/day-temp.jpg";

const DailyCalendar = ({ date }) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [dailyData, setDailyData] = useState({});

  const goToPreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(currentDate.getDate() - 1);
    console.log(previousDay);
    setCurrentDate(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    setCurrentDate(nextDay);
  };


  useEffect(() => {
    const fetchDailyData = async () => {
      setDailyData({});
      const date = currentDate;
      const shortMonth = date
        .toLocaleString("en-US", { month: "short" })
        .toLowerCase();
      const year = date.getFullYear();
      const id = date.getDate();


      // Get individual components
      const day = currentDate.getDate();
      const month = currentDate.toLocaleString('en-US', { month: 'long' }).toUpperCase();
      const yearl = currentDate.getFullYear();

      // Concatenate as needed
      const dateToShow = `${day} ${month} ${yearl}`;

      let collectionName = `${shortMonth}${year}`;

      try {
        const dailyCollectionRef = collection(db, collectionName);
        const dailySnapshot = await getDocs(dailyCollectionRef);
        const fetchedData = dailySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: dateToShow,
        }));

        if (!dailySnapshot.empty) {
          const data = fetchedData.find(
            (item) => Number(item.id) === Number(id)
          );
          if (!data.empty) {
            setDailyData(data);
          } else {
            setDailyData({});
          }
        } else {
          // Handle case where no data is found for the current date
          console.log("No data found for the current date.");
        }
      } catch (error) {
        console.error("Error fetching daily data:", error);
      }
    };

    fetchDailyData();
  }, [currentDate]);

  return (
    <div className="daily-calendar-container">
      <div className="daily-calender-header">
        <button onClick={goToPreviousDay}>&lt; Prev</button>
        <h2>{currentDate.toDateString().toUpperCase()}</h2>
        <button onClick={goToNextDay}>Next &gt;</button>
      </div>
      {Object.keys(dailyData).length !== 0 ? (
        <>
          <div className="header">
            <div className="header-values gradient__blue">
              <span className="header-value-action">{dailyData.action} |</span>
              <span className="header-values-cap">{dailyData.cap} |</span>
              <span className="header-values-option">{dailyData.type}</span>
            </div>
            <h2 className={`header-mainvalue ${Number(dailyData.value) < 0 ? "gradient__red" : "gradient__green"}`}>
              {dailyData.value} %
            </h2>
            <p className="header-entryprice">ENTRY PRICE : {dailyData.entry}</p>
            <p className="header-closeprice">CLOSE PRICE : {dailyData.close}</p>
            <h3 className="header-date">{dailyData.date}</h3>
          </div>
          <div class="day-view">
            <img class="photo" src={dayPhoto} alt="photo of the trading company"/>
          </div>
        </>
      ) : (
        <>
          <h2 className="daily-calender-no-data">NO DATA TO SHOW !</h2>
        </>
      )}
    </div>
  );
};

export default DailyCalendar;
