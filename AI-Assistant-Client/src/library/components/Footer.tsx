import { FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white py-6 mt-8 footer">
            <div className="mx-auto px-6 text-center">
                <p className="my-4">
                    Made with{" "}
                    <span className="text-red-700">
                        <FaHeart className="inline-block mx-1 text-xl" />
                    </span>{" "}
                    by{" "}
                    <a
                        href="https://github.com/DennisMwangi1"
                        className="text-red-700 font-bold transition duration-200"
                    >
                        Dennis Mwangii
                    </a>
                </p>

                <div className="flex justify-center sm:justify-between place-items-center flex-wrap">
                    <p className="text-sm mb-4 sm:mb-0 sm:w-auto w-full text-center sm:text-center">
                        © 2025 Doc Analyzer. All rights reserved.
                    </p>
                    <div className="flex justify-center space-x-6 mt-4 sm:mt-0 sm:space-x-8 w-full sm:w-auto text-center sm:text-center">
                        <a
                            href="#privacy"
                            className="text-white hover:text-blue-200 transition duration-200"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#terms"
                            className="text-white hover:text-blue-200 transition duration-200"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#contact"
                            className="text-white hover:text-blue-200 transition duration-200"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
