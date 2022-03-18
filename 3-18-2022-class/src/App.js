import journalLogo from './journal-logo.png';
import './App.css';
import Header from './components/Header'
import Journal from './components/Journal';

function App() {
  const text = 'Hello world';

  return (
    <div className="App">
      <Header />
      <Journal />
    </div>
  );
}

export default App;
