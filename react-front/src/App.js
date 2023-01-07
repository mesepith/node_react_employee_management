//import App.css
import './App.css';
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddEmployee from './components/AddEmployee';

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
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/logout" element={<h1>Bye Bye</h1>} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;