export function PlantsNew(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreatePlant(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>New Plant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input name="name" type="text" />
        </div>
        <div>
          Description: <input name="description" type="text" />
        </div>
        <div>
          Amount of Sun: <input name="amount_of_sun" type="text" />
        </div>
        <div>
          Days before Watering: <input name="days_to_water" type="text" />
        </div>
        <div>
          Image_url: <input name="image_url" type="text" />
        </div>
        <button type="submit">Create plant</button>
      </form>
    </div>
  );
}
