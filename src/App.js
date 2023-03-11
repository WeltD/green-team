// import logo from './logo.svg';
import './App.css';

import { Navigate, Route, Routes} from "react-router";
import { HashRouter } from "react-router-dom";

import Layout from './pages/Layout';
import Home from './pages/Home';
import Bar from './pages/Charts/Bar';
import Pie from './pages/Charts/Pie';

// Average Key
import AverageKeyBar from './pages/AverageKey/AverageKeyBar';
import AverageKeyHeatMap from './pages/AverageKey/AverageKeyHeatMap';

// Booking Metric
import BookingMetricBar from './pages/BookingMetric/BookingMetricBar';
import BookingMetricHeatMap from './pages/BookingMetric/BookingMetricHeatMap';

//Cancellation
import CancellationBar from './pages/Cancellation/CancellationBar';
import CancellationHeatMap from './pages/Cancellation/CancellationHeatMap';

function App() {
  return (
    <div className="App">
    
    <HashRouter>

      <Layout>

        <Routes>
        
              <Route path="/" element={<Home />}/>
              <Route path="/barchart" element={<Bar />}/>
              <Route path="/piechart" element={<Pie />}/>

              {/* Average Key */}
              <Route path="/AverageKeyBar" element={<AverageKeyBar />}/>
              <Route path="/AverageKeyHeatMap" element={<AverageKeyHeatMap />}/>

              {/* Booking Metric */}
              <Route path="/bookingMetricBar" element={<BookingMetricBar />}/>
              <Route path="/bookingMetricHeatMap" element={<BookingMetricHeatMap />}/>

              {/* Cancellation */}
              <Route path="/cancellationBar" element={<CancellationBar />}/>
              <Route path="/cancellationHeatMap" element={<CancellationHeatMap />}/>
        
              {/* 默认路由 */}
              <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </Layout>

    </HashRouter>
    

    </div>
  );
}

export default App;
