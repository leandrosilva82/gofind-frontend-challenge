import './App.css';
import MainTemplate from './components/template/main-template.js';
import { BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router> 
      <div className="App">
        <MainTemplate />
      </div>
    </Router>
  );
}

export default App;
