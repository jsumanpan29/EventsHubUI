import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import img_people from '../images/img_people.jpg';

const Contact = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_wwexzcb', 'template_57hg74e', form.current, '03LM3RRIJV52zhn2V')
      .then((result) => {
          form.current.reset()
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <>
 <div className="hero min-h-screen" style={{ backgroundImage: 'url(' + img_people + ')' }}>
  <div className="hero-overlay bg-opacity-80"></div>
  <div className="z-0 flex flex-col items-center justify-center gap-4 p-4 lg:flex-row-reverse bg-base-200 shadow-3xl lg:card max-w-screen-xl mx-auto">
    <div className="text-center lg:text-left px-4 lg:px-11">
      <h2 className="text-3xl lg:text-4xl mb-4">Get in Touch with Us</h2>
      <p className="mb-4">
        Welcome to <span className="font-semibold">Eventurado</span>, your ultimate destination for discovering and exploring diverse events! We're dedicated to connecting you with a wide array of events ranging from cultural festivals to educational workshops and everything in between.
      </p>
      <p className="mb-4">
        Need assistance navigating our platform, promoting your event, or exploring collaboration opportunities? Our team is here to assist you every step of the way.
      </p>
      <h3 className="text-xl lg:text-2xl mb-2">How We Can Help:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>General Inquiries</li>
        <li>Event Promotion</li>
        <li>Partnership Opportunities</li>
      </ul>
      <p className="mb-4">
        Don't hesitate to drop us a message using the contact form provided on this page. Our dedicated team will promptly respond to your queries and assist you in making the most out of your event journey with us.
      </p>
      <p>
        Thank you for being a part of the vibrant <span className="font-semibold">Eventurado</span> community. We're excited to help you discover, create, and experience amazing events!
      </p>
    </div>
    <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
      <form ref={form} onSubmit={sendEmail} className="card-body p-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered" name="user_name" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Email" className="input input-bordered" name="user_email" required />
        </div>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Message</span>
          </div>
          <textarea className="textarea textarea-bordered w-full h-full resize-none bg-transparent focus:outline-none" placeholder="Message" name="message" required></textarea>
        </label>
        <div className="form-control mt-4">
          <button className="btn btn-primary w-full">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>

    </>
    
  )
}

export default Contact