import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Router from './components/Router';
import ErrorBoundary from './components/ErrorBoundary';
import { User } from './components/UserContext';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Router />
          <User />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
