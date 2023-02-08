import React, { useState } from "react";

export function Popup({ plantData }) {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <div>
      <button className="pop-button" onClick={togglePopup}>
        Details
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{plantData.plant_name}</h2>
            <p>{plantData.plant_details.wiki_description.value}</p>
            <button onClick={togglePopup}> Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
