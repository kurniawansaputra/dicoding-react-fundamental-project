import { BrowserRouter } from "react-router-dom";
import "./App.css";
import NoteApp from "./components/notes/NoteApp";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <NoteApp />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
