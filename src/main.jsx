import { createRoot } from "react-dom/client";
import "./input.css";
import Weather from "./Weather";
import store from "./Redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Weather />
  </Provider>
);
