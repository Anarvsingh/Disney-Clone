import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from "./components/Login";
import Header from "./components/Header";
import Home from './components/Home';
import { Details } from './components/Details';
import { Video } from './components/Video';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/detail/:id" element={<Details/>} />
      <Route path="/video" element={<Video/>} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
