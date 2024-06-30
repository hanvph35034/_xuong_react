const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-4 px-3 mt-16">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <p className="text-xs text-gray-400 md:text-sm">
              Msv PH35034
            </p>
            <p className="text-xs text-gray-400 md:text-sm">
            tiến độ dự án hoàn thành được 84%
            </p>
          </div>
          <div className="w-full md:w-1/2 md:text-center md:mb-0 mb-8">
            <ul className="list-reset flex justify-center flex-wrap text-xs md:text-sm gap-3">
            
              <li className="mx-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  email: 123d@gmail.com role : admin
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  passwrod : 123456
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
