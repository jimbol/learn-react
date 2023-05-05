import { BrowserRouter } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Router from './components/Router';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Router />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
