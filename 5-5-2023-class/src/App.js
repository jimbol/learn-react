import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './pages/Router';
import AppHeader from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <AppHeader />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
