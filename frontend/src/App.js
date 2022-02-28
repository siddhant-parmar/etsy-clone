import Signup from './componenets/Signup/Signup';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div class="grid-container">
      <header class="row">
        <div>
          <a class="brand" href="/">Etsy</a>
        </div>
        <div>
          <a href="/">Sign In</a>
          <a href="/">Cart</a>
        </div>
      </header>
      <main>
        <ul>
          <li>Product 1</li>
          <li>Product 2</li>
          <li>Product 3</li>
          <li>Product 4</li>
        </ul>
      </main>
      <footer class="row left">United States | English (US) | $ (USD)</footer>
    </div>
  );
}

export default App;
