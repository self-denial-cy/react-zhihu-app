import { useState } from 'react';
import dayjs from 'dayjs';
import { HomeHeader } from '../components';

export default function Home() {
  const [today, setToday] = useState(dayjs().format('YYYY-MM-DD'));
  return (
    <div className="home_view">
      <HomeHeader today={today}></HomeHeader>
    </div>
  );
}
