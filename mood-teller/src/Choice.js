import React from "react";

const Choice = ({ name, file, background, setData }) => {
  const updatedata = async (newdata) => {
    const res = await fetch("http://localhost:5000/data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newdata),
    });
    const data = await res.json();
    setData(data);
  };

  return (
    <div className='choice' style={{ backgroundColor: background }}>
      <h2>{name}</h2>
      <p>{file}</p>
      <button
        onClick={() =>
          updatedata({
            name: name,
            emoji: file,
            color: background,
          })
        }
      >
        Select
      </button>
    </div>
  );
};

export default Choice;
