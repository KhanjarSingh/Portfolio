import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initSmoothScroll } from './lib/scroll'
import { LITE } from './lib/media'

// Start Lenis before React mounts so child effects (e.g. the intro) can lock scrolling.
initSmoothScroll()
if (LITE) document.documentElement.classList.add('lite')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Clean up stale service workers from previous projects
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
}
