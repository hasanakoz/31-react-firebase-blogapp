import { ToastContainer } from "react-toastify";
import "./App.css";
import AuthContextProvider from "./context/AuthContextProvider";
import AppRouter from "./router/AppRouter";
import "react-toastify/dist/ReactToastify.css";
import { BlogContextProvider } from "./context/BlogContextProvider";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BlogContextProvider>
          <AppRouter />
          <ToastContainer />
        </BlogContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
