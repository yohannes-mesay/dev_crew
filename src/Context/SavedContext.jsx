import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "https://aguero.pythonanywhere.com";

const SavedContext = createContext();

function SavedProvider({ children }) {
  const [savedProducts, setSavedProducts] = useState([]);
  const [savedServices, setSavedServices] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const token = localStorage.getItem("token");
  let config = null;

  if (token) {
    config = {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json", // Specify Content-Type header
      },
    };
  }
  const getproducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/0/save`, config);
      setSavedProducts(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(
    function () {
      getproducts();
    },
    [savedProducts]
  );

  const getServices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/service/0/save`, config);
      setSavedServices(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(
    function () {
      getServices();
    },
    [savedServices]
  );

  const getEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/event/0/save`, config);
      setSavedEvents(response.data);
      console.log("savedEvents", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(
    function () {
      getEvents();
    },
    [savedEvents]
  );

  const saveProduct = async (product) => {
    console.log("product.id", product.id);
    if (!product) {
      return "No product is saved";
    }
    try {
      console.log(config);
      const res = await axios.post(
        `https://aguero.pythonanywhere.com/product/${product.id}/save/`,
        {},
        config
      );
      alert("Product uploaded successfully");
      console.log("uploaded:", res);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const saveService = async (service) => {
    console.log("service.id", service.id);
    try {
      console.log(config);
      const res = await axios.post(
        `https://aguero.pythonanywhere.com/service/${service.id}/save/`,
        {},
        config
      );
      alert("service uploaded successfully");
      console.log("uploaded:", res);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const saveEvent = async (event) => {
    console.log("event.id", event.id);
    try {
      console.log(config);
      const res = await axios.post(
        `https://aguero.pythonanywhere.com/event/${event.id}/save/`,
        {},
        config
      );
      alert("event uploaded successfully");
      console.log("uploaded:", res);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  async function deleteProduct(product, saveId, setSaveState) {
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
      alert(`${type} unsaved successfully` + saveId.id);
      console.log("deleted:", res);
      setSaveState(false);
      return res.data;
    } catch (err) {
      console.error(`Error deleting ${type}:  `, err);
    }
  }

  return (
    <SavedContext.Provider
      value={{
        savedEvents,
        setSavedEvents,
        savedServices,
        setSavedServices,
        savedProducts,
        deleteProduct,
        setSavedProducts,
        getproducts,
        saveProduct,
        saveEvent,
        saveService,
        getServices,
        getEvents,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}

function useSaved() {
  const context = useContext(SavedContext);
  if (context === undefined)
    throw new Error("SavedContext used outside provider");
  return context;
}

export { SavedProvider, useSaved };
