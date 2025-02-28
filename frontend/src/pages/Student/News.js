import React from 'react';
import './News.css';

const News = () => {
  return (
    <div className="news">
      <h1>News & Announcements</h1>
      <p>Stay updated with the latest campus news.</p>
      <div className="news-articles">
        <h2>Recent News:</h2>
        <article>
          <h3>Mid-Semester Exams Scheduled</h3>
          <p>The mid-semester exams are scheduled from March 15 to March 25. Check the exam timetable on the student portal.</p>
        </article>
        <article>
          <h3>Annual Sports Day</h3>
          <p>The annual sports day will be held on April 5. Participate in various sports events and showcase your talent.</p>
        </article>
        {/* Add more articles as needed */}
      </div>
      <div className="announcements">
        <h2>Upcoming Events:</h2>
        <ul>
          <li>Workshop on AI and Machine Learning - March 10</li>
          <li>Guest Lecture by Industry Expert - March 20</li>
          {/* Add more events as needed */}
        </ul>
      </div>
    </div>
  );
};

export default News;
