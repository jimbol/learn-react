import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import Router from './components/Router';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
