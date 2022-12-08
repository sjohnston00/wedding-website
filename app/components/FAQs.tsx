import React from "react";

export default function FAQs() {
  return (
    <>
      <section className='faqs'>
        <h1 id='faqs'>FAQs</h1>
        <h2>Getting Here</h2>
        <p>
          Hockwold Hall is located near Thetford Forest in Norfolk just of the
          A1065{" "}
          <div className='venue-map-wrapper'>
            <iframe
              style={{ width: "100%", height: "100%", border: "0" }}
              title='Hockwold Hall Map'
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2430.908308220028!2d0.53689!3d52.462688!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcca8662dddd69d8f!2sHockwold%20Hall!5e0!3m2!1sen!2sus!4v1670535978794!5m2!1sen!2sus'
              loading='lazy'></iframe>
          </div>
        </p>
        <h2>Dress code</h2>
        <h2>Accommodation</h2>
        <h2>Food & Alergies</h2>
        <h2>Are children invited?</h2>
        <p>no</p>
        <h2>Can I bring a date?</h2>
        <p>No.</p>
      </section>
    </>
  );
}
