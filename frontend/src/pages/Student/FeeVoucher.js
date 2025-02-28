import React from 'react';
import './FeeVoucher.css';

const FeeVoucher = () => {
  return (
    <div className="feevoucher">
      <h1>Fee Voucher</h1>
      <p>Generate and print your fee voucher here.</p>
      <form className="voucher-form">
        <label htmlFor="student-id">Student ID:</label>
        <input type="text" id="student-id" name="student-id" required />
        
        <label htmlFor="semester">Semester:</label>
        <select id="semester" name="semester" required>
          <option value="">Select Semester</option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
        </select>
        
        <button type="submit">Generate Fee Voucher</button>
      </form>
    </div>
  );
};

export default FeeVoucher;
