import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Calendar from "./Calender";
import YearlyCalendar from "./yearlyCalender";
import DailyCalendar from "./dailyCalender";

function Main() {
  const [currentDate, setcurrentDate] = useState(new Date());

  function DailyCalendarWrapper({ currentDate }) {
    const { date } = useParams();
    const selectedDate = date ? new Date(date) : currentDate;
    return <DailyCalendar date={selectedDate} />;
  }

  return (
    <BrowserRouter>
      <div className="app" style={{textAlign:'center'}}>
        <Link to="/year">
          <button>Yearly</button>
        </Link>
        <Link to="/month">
          <button>Monthly</button>
        </Link>
        <Link to={`/daily/${new Date().toISOString().split("T")[0]}`}>
          <button>Daily</button>
        </Link>
      </div>
      <Routes>
        <Route path="" element={<Calendar />} />
        <Route path="year" element={<YearlyCalendar initialYear={2023} />} />
        <Route path="month" index element={<Calendar />} />
        <Route
          path="daily/:date"
          element={<DailyCalendarWrapper currentDate={currentDate} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
