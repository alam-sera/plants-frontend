import "./PlantsNew.css";

export function PlantsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreatePlant(params, () => event.target.reset());
  };

  return (
    <div className="PlantsNew-container">
      <h1>
        <center>New Plant</center>
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            id="name"
            type="text"
            className="PlantsNew-input"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            name="description"
            id="description"
            type="text"
            className="PlantsNew-input"
          />
        </div>
        <div>
          <label htmlFor="amount_of_sun">Amount of Sun:</label>
          <input
            name="amount_of_sun"
            id="amount_of_sun"
            type="text"
            className="PlantsNew-input"
          />
        </div>
        <div>
          <label htmlFor="days_to_water">Days before Watering:</label>
          <input
            name="days_to_water"
            id="days_to_water"
            type="text"
            className="PlantsNew-input"
          />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input
            name="image_url"
            id="image_url"
            type="text"
            className="PlantsNew-input"
          />
        </div>
        <button type="submit" className="PlantsNew-button">
          Create plant
        </button>
      </form>
    </div>
  );
}
