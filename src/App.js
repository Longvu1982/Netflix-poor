import "./App.css";
import HomePage from "./home/HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SinglePage from "./components/watch/SinglePage";
import LoginPage from "./components/login";
import LogoutPage from "./components/register";
import { upcome } from "./dummyData";
import RegisterPage from "./components/register";
import Upcomming from "./components/upcoming/Upcomming";
import useUserStore from "./store/useUser";

function App() {
  const currentUser = useUserStore();
  return (
    <>
      <Router>
        {currentUser.email ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/upcomming"
              element={<Upcomming items={upcome} title="Upcomming" />}
            />
            <Route path="/singlepage/:id" element={<SinglePage />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        )}
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
