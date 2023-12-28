// Desc: Home page of the app
// Path: wp_fp_gambling/src/app/component/main.tsx
// Usage:
// import { Main } from "./component";
//
// <Main />
//
// ------------------------------------------------------------------

export default function Main() {
  return (
    <>
      <div className="p-11"/> 
      <div className="hero pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            src="./assets/gamble(1).jpg"
            className="card-img img-fluid"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              <p className="card-title fs-1 text-bold fw-lighter text-xl">
                Predict the Unpredictable
              </p>
              <p className="card-text fs-5 d-none d-sm-block text-xl">
                Bet on the Future: Weather, Stocks, Games - Where Thrills Meet
                Forecast !
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
