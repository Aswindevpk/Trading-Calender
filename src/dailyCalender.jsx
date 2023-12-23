import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebaseConfig";
import "./dailyCalender.css";
import dayPhoto from "./assets/day-temp.png";

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

      const options = {
        day: "2-digit",
        month: "short",
        year: "numeric",
      };
      const formattedDate = currentDate.toLocaleDateString("en-US", options);
      let collectionName = `${shortMonth}${year}`;

      try {
        const dailyCollectionRef = collection(db, collectionName);
        const dailySnapshot = await getDocs(dailyCollectionRef);
        const fetchedData = dailySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: formattedDate,
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
        <button onClick={goToPreviousDay}>Previous Day</button>
        <h2>{currentDate.toDateString()}</h2>
        <button onClick={goToNextDay}>Next Day</button>
      </div>
      {Object.keys(dailyData).length !== 0 ? (
        <>
          <div className="header">
            <div className="header-values">
              {dailyData.action &&dailyData.action.toLowerCase() === "buy" ? (
                <>
                  <span
                    className="header-values-action"
                    style={{ color: "blue" }}
                  >
                    {dailyData.action}
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="header-values-action"
                    style={{ color: "var(--color-red)" }}
                  >
                    {dailyData.action}
                  </span>
                </>
              )}
              <span className="header-values-cap">{dailyData.cap}</span>
              <span className="header-values-option">{dailyData.type}</span>
            </div>
            <h2 className="header-mainvalue" style={{ color: Number(dailyData.value) < 0 ? 'var(--color-red)' : 'var(--color-green)' }}>
              {dailyData.value} %
            </h2>
            <p className="header-entryprice">ENTRY PRICE : {dailyData.entry}</p>
            <p className="header-closeprice">CLOSE PRICE : {dailyData.entry}</p>
            <h3 className="header-date">{dailyData.date}</h3>
          </div>
          <div class="day-view">
            <img class="photo" src={dayPhoto} alt="Your Photo" />
          </div>
        </>
      ) : (
        <>
          <h2 className="daily-calender-no-data">No Data to Show !</h2>
        </>
      )}
    </div>
  );
};

export default DailyCalendar;
