import React from "react";

function Universe() {
  return (
    <div className="container">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-3 mt-5">
          <img
            src="images/smallcaseLogo.png"
            className="img-fluid"
            style={{width: "100%", maxWidth: "50%" }}
          />
          <p className="text-muted mt-2">Thematic investment platform</p>
        </div>

        <div className="col-4 p-3 mt-5">
          <img
            src="images/streakLogo.png"
            className="img-fluid"
            style={{width: "100%", maxWidth: "40%" }}
          />
          <p className=" text-muted mt-2">Algo & strategy platform</p>
        </div>
        <div className="col-4 p-3 mt-5">
          <img
            src="images/sensibullLogo.svg"
            className="img-fluid"
            style={{ width: "100%", maxWidth: "200px" }}
          />
          <p className=" text-muted mt-2">Options trading platform</p>
        </div>
        <div className="col-4 mt-5">
          <img
            src="images/zerodhaFundhouse.png"
            className="img-fluid"
            style={{width: "100%", maxWidth: "50%" }}
          />
          <p className="text-muted mt-2 mb-5">Asset management</p>
        </div>
        <div className="col-4 mt-5 mb-5">
          <img
            src="images/goldenpiLogo.png"
            className="img-fluid"
            style={{width: "100%", maxWidth: "200px" }}
          />
          <p className="text-muted mt-2">Bonds trading platform</p>
        </div>
        <div className="col-4 mt-5 mb-5">
          <img
            src="images/dittoLogo.png"
            className="img-fluid"
            style={{width: "100%", maxWidth: "30%" }}
          />
          <p className=" text-muted mt-2">Insurance</p>
        </div>
        <button
          className="p-2 btn btn-primary mt-5 fs-5 mb-5"
          style={{ width: "30%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
