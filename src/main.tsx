
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure the app is wrapped in any necessary providers
createRoot(document.getElementById("root")!).render(<App />);

