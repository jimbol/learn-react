import logo from './journal-logo.png';
import './App.css';
import Journal from './pages/Journal';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>Quick Jot</code>
        </p>
      </header>
      <Journal />
    </div>
  );
}

export default App;
