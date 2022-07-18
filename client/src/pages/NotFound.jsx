import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import NotFoundImg from './../assets/Scarecrow.png';

const NotFound = () => {
  return (
    <div className=" grid place-items-center text-center">
      <div className="flex items-center gap-20">
        <img className="h-96 w-96" src={NotFoundImg} alt="" />
        <div className="flex flex-col gap-8">
          <h1 className="text-8xl">!Oops</h1>
          <p className="text-3xl">404 - Page not found</p>
          <Link
            to="/"
            className="text-2xl p-5 flex items-center justify-center bg-black rounded-md text-white"
          >
            <FaHome style={{ marginRight: '5px' }} /> Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
