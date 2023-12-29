import Image from 'next/image';


export default function Main() {
  return (
    <>
      <div className="p-11" />
      <div className="hero pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          {/* Replace the standard <img> with the Image component */}
          <Image
            src="/assets/gamble(1).jpg"
            alt="Card"
            height={500}
            width={750}  // Specify the width based on your design
            className="card-img img-fluid"
          />
          <div className="card-img-overlay d-flex align-items-center gap-100 bg-opacity-70 bg-gray-900">
            <div className="py-100" />
            <div className="container ">
              <p className="card-title fs-1 text-4xl">
                Predict the Unpredictable
              </p>
              <p className="card-text fs-5 d-none d-sm-block text-xl fw-lighter">
                Bet on the Future: Weather, Stocks, Games - Where Thrills Meet
                Forecast!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
