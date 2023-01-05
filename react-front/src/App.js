//import App.css
import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import SignUp from './components/SignUp';

//import PrivateRoute from PrivateComponent
import PrivateRoute from './components/PrivateComponent';

//create App
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>
          < Route element={<PrivateRoute />}>
            <Route path="/" element={<h1>Employee List</h1>} />
            <Route path="/add" element={<h1>Add Employee</h1>} />
            <Route path="/logout" element={<h1>Bye Bye</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;