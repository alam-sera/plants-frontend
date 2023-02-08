import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plants } from "./Plants";

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
        plant_details: [
          "common_names",
          "url",
          "name_authority",
          "wiki_description",
          "taxonomy",
          "synonyms",
        ],
      };

      // axios.defaults.headers.common["Authorization"] =
      //   "Bearer ";
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");

      axios
        // .post("https://api.plant.id/v2/identify/health_assessment", data)
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
      {result ? <pre>{JSON.stringify(result, null, 2)}</pre> : <p></p>}
    </div>
  );
}
