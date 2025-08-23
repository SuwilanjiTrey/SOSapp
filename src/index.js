import ReactDOM from 'react-dom/client'; // <-- Note the '/client'
import App from './App2';
import 'tailwindcss/tailwind.css';
import * as serviceWorker from './serviceWorker';

// Create a root instance for the DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Call render on the root object
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
