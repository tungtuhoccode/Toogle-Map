import { Button } from "@/components/ui/button"
// App.tsx or App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import AppMap from "@/Map/AppMap"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppMap />} />
      </Routes>
    </Router>
  );
}

export default App;