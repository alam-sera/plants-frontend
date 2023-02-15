import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PlantHealth.css";

export function PlantHealth() {
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
        disease_details: ["description", "treatment"],
      };

      axios({
        method: "post",
        url: "https://api.plant.id/v2/health_assessment",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          setResult(response.data);
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
    <div className="container">
      <h1>Plant Assessment</h1>
      <p>Upload a picture to get started</p>
      <input type="file" multiple onChange={handleFileUpload} />
      {result ? (
        <div className="result">
          <img src={result.images[0].url} alt="Plant" />
          <h4>
            Plant Healthy Probability:{" "}
            {result.health_assessment.is_healthy_probability}
          </h4>
          <h4>Disease Name: {result.health_assessment.diseases[0].name}</h4>
          <h4>
            Disease Probability:{" "}
            {result.health_assessment.diseases[0].probability}
          </h4>
          <img
            src={result.health_assessment.diseases[0].similar_images[0].url}
            alt="Disease"
          />
          <h4>
            Disease Description:{" "}
            {result.health_assessment.diseases[0].disease_details.description}
          </h4>
          <h3>Treatment</h3>
          <div className="treatment">
            <h4>
              Biological:{" "}
              {
                result.health_assessment.diseases[0].disease_details.treatment
                  .biological
              }
            </h4>
            <h4>
              Chemical:{" "}
              {
                result.health_assessment.diseases[0].disease_details.treatment
                  .chemical
              }
            </h4>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
