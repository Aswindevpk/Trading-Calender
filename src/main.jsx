import React, { useState } from 'react';
import Calendar from './Calender';
import YearlyCalendar from './yearlyCalender';
import DailyCalendar from './dailyCalender';

function Main({view,data}) {
  const [currentDate, setcurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("monthly"); // Initial view: yearly

  if (view) {
    setCurrentView(view);
    setcurrentDate(data);
  }
  const handleViewChange = (view) => {
    setCurrentView(view);
  };
  return (
    <div>
      <div className="app" style={{ position: "absolute", top: 10, right: 10 }}>
        <button onClick={() => handleViewChange("yearly")}>Yearly</button>
        <button onClick={() => handleViewChange("monthly")}>Monthly</button>
        <button onClick={() => handleViewChange("daily")}>Daily</button>
      </div>
      {currentView === "yearly" && <YearlyCalendar initialYear={2023} />}{" "}
      {/* Replace with your YearlyCalendar component */}
      {currentView === "monthly" && <Calendar />}{" "}
      {/* Replace with your MonthlyCalendar component */}
      {currentView === "daily" && <DailyCalendar date={currentDate} />}
    </div>
  );
}

export default Main;
