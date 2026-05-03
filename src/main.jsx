import React from 'react'
import ReactDOM from 'react-dom/client'
import 'animal-island-ui/style'   // MUST be first — library tokens & fonts
import './styles/globals.css'      // project overrides come after
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
