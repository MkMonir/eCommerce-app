import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Contact = () => {
  return (
    <>
      <Breadcrumbs>
        <Link to="/">Home</Link>
        Contact
      </Breadcrumbs>
      <div id="contactBanner" className="text-white grid place-items-center">
        <h1>#Let's Talk</h1>
      </div>
      <div className="tw-container w-full py-10 px-5 md:px-0">
        <div className="my-5">
          <h2 className="text-center font-bold text-3xl lg:text-4xl">Contact Us</h2>
          <div className="mt-3 w-24 h-1 bg-blue-400 mx-auto" />
        </div>
        <form className="md:w-1/2 w-full md:mx-auto bg-gray-100 p-8 rounded shadow-lg">
          <div className="md:flex gap-5 w-full mb-3 md:mb-5 ">
            <div className="flex flex-col w-full mb-3 md:mb-0">
              <label htmlFor="name" className="pb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                id="name"
                name="name"
                className="bg-transparent outline-none border border-gray-700 py-3 px-2 w-full rounded focus:shadow-md"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="pb-1">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter your email address"
                id="email"
                name="email"
                className="bg-transparent outline-none border border-gray-700 py-3 px-2 w-full rounded focus:shadow-md"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="pb-1">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              placeholder="Enter your message"
              className="bg-transparent h-28 border border-gray-700 py-3 px-2 outline-none rounded focus:shadow-md resize-none"
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
};
export default Contact;
