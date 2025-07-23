import React from "react";

function Hero() {
  return (
    <div className="container-fluid" id="supportHero">
     
      <div className="row mb-5"></div>
      <div className="row p-5 my-5">
        <div className="supportPortal col-5 mb-3 mx-3">
          <h4 className="mb-5">Support Portal</h4>
          <h1 className="fs-3 ">
            Search for an answer or browse help topics to create a ticket
          </h1>
          <input className="mb-3 mt-3" placeholder="Eg. how do I activate F&O" />
          <br />
          <a href="">Track account opening</a>
          <a href="" className="ms-4">Track segment activation</a>
          <a href="" className="ms-4">Intraday margins</a>
          <a href="" className="ms-4">Kite user manual</a>
        </div>
        <div className="col-1"></div>
        <div className="col-5">
        <h5 className="mb-5"><a href="">Track Tickets</a></h5>
        
          <h1 className="fs-3 mt-5">Featured</h1>
          <ol className="lh-lg">
            <li>
              <a href="">Current Takeovers and Delisting - January 2024</a>
            </li>
            <li>
              <a href="">Latest Intraday leverages - MIS & CO</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Hero;
