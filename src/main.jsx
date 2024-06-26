import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { APIDataProvider } from './contexts/apiData.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <APIDataProvider>
    <App />
  </APIDataProvider>,
)
