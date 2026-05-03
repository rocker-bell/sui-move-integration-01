import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import TaskApp from "./Components/TaskApp";
import WalrusTaskApp from "./Components/Walrus";
import WalrusTest from "./Components/WalrusTest";
import NautilusDemo from "./Components/NautilusDemo";

const App = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/TaskApp" element={<TaskApp/>} />
          <Route path="/WalrusTaskApp" element={<WalrusTaskApp/>} />
          <Route path="/WalrusTest" element={<WalrusTest/>} />
          <Route  path="/NautilusDemo" element={<NautilusDemo/>} />
      </Routes>
    </>
  )
}

export default App;