import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import Router from './components/Router';
import ErrorBoundary from './components/ErrorBoundary';

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
