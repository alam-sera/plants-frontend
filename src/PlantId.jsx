import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PlantId.css";

export function PlantId() {
  const [result, setResult] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);
  };

  useEffect(() => {
    const readFiles = async () => {
      const base64files = await Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.onerror = (error) => {
              reject(error);
            };
          });
        })
      );

      const data = {
        api_key: "",
        images: base64files,
        modifiers: ["crops_fast", "similar_images"],
        plant_language: "en",
        plant_details: [
          "common_names",
          "url",
          "name_authority",
          "wiki_description",
          "taxonomy",
          "synonyms",
        ],
      };

      axios
        .post("https://api.plant.id/v2/identify", data)
        .then((res) => {
          setResult(res.data);
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    };

    if (files.length > 0) {
      readFiles();
    }
  }, [files]);

  return (
    <div>
      <h1>Plant Identification</h1>
      <p>Upload a picture to get started</p>
      <input type="file" multiple onChange={handleFileUpload} />
      {result && (
        <div className="plant-container">
          <h2 className="plant-name">
            Suggested Plant: {result.suggestions[0].plant_name}
          </h2>
          <img className="plant-image" src={result.images[0].url} alt="Plant" />
          <p className="plant-description">
            {result.suggestions[0].plant_details.wiki_description.value}
          </p>
          <ul className="taxonomy">
            <li className="taxonomy-class">
              Class: {result.suggestions[0].plant_details.taxonomy.class}
            </li>
            <li className="taxonomy-family">
              Family: {result.suggestions[0].plant_details.taxonomy.family}
            </li>
          </ul>
          <h3 className="similar-images-title">Similar Images:</h3>
          <ul className="similar-images-list">
            {result.suggestions[0].similar_images.map((image) => (
              <li className="similar-image-item" key={image.id}>
                <img
                  className="similar-image"
                  src={image.url}
                  alt="Similar Plant"
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
