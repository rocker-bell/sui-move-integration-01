import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import TaskApp from "./Components/TaskApp";
import WalrusTaskApp from "./Components/Walrus";

const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/TaskApp" element={<TaskApp/>} />
          <Route path="/WalrusTaskApp" element={<WalrusTaskApp/>} />
      </Routes>
    </>
  )
}

export default App;