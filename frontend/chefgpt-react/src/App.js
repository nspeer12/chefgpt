
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import {CelebrationPage} from './views/CelebrationPage';
import {CookingPage} from './views/CookingPage';
import {HomePage} from './views/HomePage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />
          <Route exact path="/Cook" element={<CookingPage/>} />
          <Route exact path="/Celebrate" element={<CelebrationPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
