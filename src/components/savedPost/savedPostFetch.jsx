import React from "react";
import axios from "axios";

const savedPostFetch = (type,product, setSaveId, setSaveState) => {
  async function uploadProduct() {
    const token = localStorage.getItem("token");
    let config = null;

    if (token) {
      config = {
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
      };
    } else {
      console.error("Token not found in localStorage");
    }

    try {
      console.log(config);
      const res = await axios.post(
        `https://aguero.pythonanywhere.com/${type}/${product.id}/save/`,
        {},
        config
      );
      alert(`${type} Saved successfully`);
      console.log("uploaded:", res);

      setSaveId(res.data);
      return res.data;
    } catch (err) {
      console.error(`Error uploading ${type}:`, err);
    }
  }

  uploadProduct().then(() => {
    setSaveState(true);
  });
  return <div></div>;
};

export default savedPostFetch;
