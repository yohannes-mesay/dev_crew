import React from "react";
import axios from "axios";

const deletePost = (type, product, saveId, setSaveState) => {
  console.log("product.id", product.id);
  console.log("saveId", saveId);
  console.log("setSavedState");
  async function deleteProduct() {
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
      console.log(saveId);
      const res = await axios.delete(
        `https://aguero.pythonanywhere.com/${type}/${product.id}/save/${saveId}/`,
        config
      );
      console.log(config);
      alert(`${type} deleted successfully`);
      console.log("deleted:", res);

      return res.data;
    } catch (err) {
      console.error(`Error deleting ${type}:`, err);
    }
  }

  deleteProduct().then(() => {
    setSaveState(false);
  });
  return <div></div>;
};

export default deletePost;
