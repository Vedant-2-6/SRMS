import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>Get in touch with the admin or department heads.</p>
      <div className="contact-details">
        <h2>Admin Office:</h2>
        <p>Email: admin@university.edu</p>
        <p>Phone: +123-456-7890</p>
        
        <h2>Department Heads:</h2>
        <p>Computer Science: cshead@university.edu</p>
        <p>Mathematics: mathhead@university.edu</p>
        {/* Add more contact details as needed */}
      </div>
      <div className="helpdesk">
        <h2>Helpdesk Support:</h2>
        <form className="helpdesk-form">
          <label htmlFor="issue">Describe your issue:</label>
          <textarea id="issue" name="issue" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
