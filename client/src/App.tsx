import './App.css';
import { getStripeAPI } from './lib/firebase';

function App() {
  const goStripe = async () => {
    await getStripeAPI();
  };

  return (
    <div className="App">
      <h1>Stripe 実装</h1>
      <button onClick={goStripe}>stripe </button>
    </div>
  );
}

export default App;
