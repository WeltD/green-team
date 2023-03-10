// import logo from './logo.svg';
import './App.css';

import { Navigate, Route, Routes} from "react-router";
import { HashRouter } from "react-router-dom";

import Layout from './pages/Layout';
import Home from './pages/Home';
import Bar from './pages/Charts/Bar';
import Pie from './pages/Charts/Pie';
import Cancellation from './pages/Cancellation';

function App() {
  return (
    <div className="App">
    
    <HashRouter>

      <Layout>

        <Routes>
        
              <Route path="/" element={<Home />}/>
              <Route path="/barchart" element={<Bar />}/>
              <Route path="/piechart" element={<Pie />}/>
              <Route path="/cancellation" element={<Cancellation />}/>
        
              {/* 默认路由 */}
              <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </Layout>

    </HashRouter>
    

    </div>
  );
}

export default App;
