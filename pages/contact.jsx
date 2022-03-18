import Nav from "../components/navbar/Nav";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import emailjs from "emailjs-com";
import Image from "next/image";
import contactImg from "../public/images/contact.png";
import { toast, ToastContainer } from "react-toastify";

function contact() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function sendEmail(e) {
    e.preventDefault();
    setErrorMessage("");
    emailjs
      .sendForm(
        "service_x73zcsh",
        "template_r9wmhvd",
        e.target,
        "user_5QxnFjF9fjdqCMAYK0gki"
      )
      .then(
        (result) => {
          console.log(result.text);
          notifySuccess();
        },
        (error) => {
          setErrorMessage("Something went wrong.Please try again later.");
          console.log(error.text);
          notifyError();
        }
      );

    e.target.reset();

    setEmailSent(!emailSent);
  }

  const notifySuccess = () =>
    toast.success(" We received your message.!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = () =>
    toast.info("Something went wrong!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div>
      <Nav />
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-md">
          {emailSent && (
            <div role="alert">
              <div className="flex justify-center align-middle m-2">
                <div className="w-2/3 ">
                  <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                    Success
                  </div>
                  <div
                    className="border border-t-0 border-green-400 rounded-b 
                    bg-green-100 px-4 py-3 text-green-700 "
                  >
                    <p>We received your message. We will contact you soon.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {errorMessage && (
            <div role="alert">
              <div className="flex justify-center align-middle m-2">
                <div className="w-2/3 ">
                  <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2">
                   Something went wrong.
                  </div>
                  <div
                    className="border border-t-0 border-blue-400 rounded-b 
                        bg-blue-100 px-4 py-3 text-blue-700 "
                  >
                    <p> {errorMessage}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-10 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-4xl text-center text-blue-400 font-display font-semibold xl:text-4xl
                        xl:text-bold"
            >
              Contact Us
            </h2>

            <div className="mt-3 text-gray-700 text-center">
              <p>
                How can we help you? Please contact us with questions, problems,
                or suggestions.
              </p>
            </div>
            <div className="mt-6">
              <form onSubmit={sendEmail}>
                <div className="mt-10">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Your Name
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                    type="text"
                    placeholder="Your Name*"
                    required
                    name="name"
                  />
                </div>
                <div className="mt-10">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                    type="email"
                    placeholder="example@gmail.com*"
                    required
                    name="email"
                  />
                </div>
                <div className="mt-10">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Your Message
                    </div>
                    <div
                      className="text-xs font-display font-semibold text-blue-400 
                            hover:text-blue-500 cursor-pointer"
                    ></div>
                  </div>

                  <textarea
                    name="message"
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-300"
                    required
                    rows="2"
                    minLength="6"
                    maxLength="200"
                    placeholder="Enter your message*"
                  ></textarea>
                </div>

                <div className="mt-10 flex justify-center items-center">
                  <button
                    type="submit"
                    className="bg-blue-400 text-gray-100 p-4 w-2/3 rounded-full tracking-wide
                                    font-semibold font-display focus:outline-none focus:shadow-outline
                                    hover:bg-blue-500 shadow-lg"
                  >
                    SEND
                  </button>
                </div>
              </form>
              <div className="mt-6 flex justify-center pb-5 text-sm font-display font-semibold text-gray-700 text-center">
                Don't have an account ?{" "}
                <div className="cursor-pointer ml-3 text-blue-400 hover:text-blue-500">
                  <Link href="/auth/SignUpPage">Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center bg-blue-100 flex-1 h-screen">
          <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
            <Image
              src={contactImg}
              width={400}
              height={400}
              alt="Contact Image"
            />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  );
}

export default contact;
