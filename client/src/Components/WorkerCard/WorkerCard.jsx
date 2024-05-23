import React from "react";
import TempProfile from "../../assets/profiles.png";

const WorkerCard = ({ worker, addToCart }) => {
  //cart
  const handleAddToCart = () => {
    addToCart(worker);
    // console.log(worker);
  };
  return (
    <div className="worker-card">
      {/* <Link to={`/worker${worker._id}`} key={worker._id}> */}
      <img
        src={TempProfile}
        alt=""
        style={{
          width: "6rem",
          height: "6rem",
          borderRadius: "100%",
        }}
      />
      <h2>{worker.user.name}</h2>
      <p>SKill : {worker.skills}</p>
      <p>Location : {worker.location}</p>
      <p>Experience : {worker.experience} years</p>
      <p>Rate : {worker.rate} per hour</p>
      <button className="button" onClick={handleAddToCart}>
        Add to Cart
      </button>
      {/* </Link> */}
    </div>
  );
};

export default WorkerCard;
