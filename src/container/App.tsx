import { Header, Home, Footer } from "../components/layout";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "../components/pages";

const App = () => {
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
