import { PlantsIndex } from "./PlantsIndex";
import { PlantsNew } from "./PlantsNew";
import { PlantId } from "./PlantId";
import { PlantHealth } from "./PlantHealth";
import { PlantAll } from "./PlantAll";
import { Scheduler } from "./Home/Scheduler";
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import { Signup } from "./Signup/Signup";
import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

export function Content() {
  const [plants, setPlants] = useState([]);

  const handleIndexPlants = () => {
    axios.get("http://localhost:3000/plants.json").then((response) => {
      setPlants(response.data);
    });
  };

  const handleCreatePlants = (params, successCallback) => {
    axios.post("http://localhost:3000/plants.json", params).then((response) => {
      setPlants([...plants, response.data]);
      successCallback();
    });
  };

  useEffect(handleIndexPlants, []);

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="plantall" element={<PlantAll />} />
        <Route path="/plantid" element={<PlantId />} />
        <Route path="/planthealth" element={<PlantHealth />} />
        <Route path="/plants" element={<PlantsIndex plants={plants} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/plants/new"
          element={<PlantsNew onCreatePlant={handleCreatePlants} />}
        />
      </Routes>
    </div>
  );
}
