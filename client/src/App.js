import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import AllRoutes from "./pages/AllRoutes";
import './styles/common.css';

function App() {
  return (
    <Box>
      <Navbar />
      <AllRoutes />
    </Box>
  );
}

export default App;