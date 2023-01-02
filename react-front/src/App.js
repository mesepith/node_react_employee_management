//import App.css
import './App.css';
import Nav from './Nav'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

//create App
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Employee List</h1>} />
          <Route path="/add" element={<h1>Add Employee</h1>} />
          <Route path="/logout" element={<h1>Bye Bye</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;