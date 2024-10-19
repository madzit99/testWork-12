import { Route, Routes } from "react-router-dom";
import AppToolbar from "./UI/AppToolbar/AppToolbar";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import { Typography } from "@mui/material";
import Photos from "./features/photos/containers/Photos";
import CreatePhoto from "./features/photos/containers/CreatePhoto";

const App = () => {

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      
      <main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Photos/>}/>
          <Route path="/create" element={<CreatePhoto/>}/>

          <Route
            path="*"
            element={<Typography variant="h1">Not found</Typography>}
          />
        </Routes>
      </main>
    </>
  );
}

export default App
