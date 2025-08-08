import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductsPage } from "@pages/products/ProductsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
