import React, { useState, useEffect } from "react";
import axios from "axios";

export function PlantAll() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "perenual.com/api/species-list?page=1&key=sk-jQzE63e9aceb3921a39"
      );
      const data = response.data;
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data ? <div>Data: {JSON.stringify(data)}</div> : <div>Loading...</div>}
      <h1>TESTING</h1>
    </div>
  );
}
