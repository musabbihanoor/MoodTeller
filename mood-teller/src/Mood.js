import React from "react";

const Mood = ({ data }) => {
  return (
    <div className='mood' style={{ backgroundColor: data.color }}>
      <h1>{"Musabbiha is feeling " + data.name}</h1>
      <p>{data.emoji}</p>
    </div>
  );
};

export default Mood;
