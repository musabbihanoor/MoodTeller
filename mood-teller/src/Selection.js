import React, { useEffect, useState } from "react";
import Choice from "./Choice";

const Selection = ({ setData }) => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const datafromserver = await fetchalldata();
      setAllData(datafromserver);
    };

    getAllData();
    console.log("here");
  }, []);

  const fetchalldata = async () => {
    const res = await fetch("http://localhost:5000/admin");
    const data = await res.json();
    console.log(data);
    return data;
  };

  return (
    <div>
      <h1>Selection</h1>
      <div className='select'>
        {allData.map((choice, index) => (
          <Choice
            key={index}
            name={choice.name}
            file={choice.emoji}
            background={choice.color}
            setData={setData}
          />
        ))}
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   allData: state.allData,
// });

export default Selection;
