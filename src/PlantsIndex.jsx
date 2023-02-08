import { useState } from "react";

export function PlantsIndex(props) {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div>
      <h1>All Plants</h1>
      Search filter:{" "}
      <input
        type="text"
        value={searchFilter}
        onChange={(event) => setSearchFilter(event.target.value)}
      />
      {props.plants
        .filter(
          (plant) =>
            plant.name &&
            plant.name.toLowerCase().includes(searchFilter.toLowerCase())
        )
        .map((plant) => (
          <div key={plant.id}>
            <img src={plant.image_url} />
            <h3>Name: {plant.name}</h3>
            <h3>Description: {plant.description}</h3>
            <h3>Amount of Sun needed: {plant.amount_of_sun}</h3>
            <h3>Water fequency(days): {plant.days_to_water}</h3>
          </div>
        ))}
    </div>
  );
}
