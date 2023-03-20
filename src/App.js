// import logo from './logo.svg';
import './App.css';

import { Navigate, Route, Routes} from "react-router";
import { HashRouter } from "react-router-dom";

import Layout from './pages/Layout';
import Home from './pages/Home';

// // Average Delay
import AverageDelayHistorical from './pages/AverageDelay/AverageDelayHistorical';
import AverageDelayHeatMap from './pages/AverageDelay/AverageDelayHeatMap';

// // Average Key
import AverageKeyHistorical from './pages/AverageKey/AverageKeyHistorical';
import AverageKeyHeatMap from './pages/AverageKey/AverageKeyHeatMap';

// // Booking Metric
import BookingMetricHistorical from './pages/BookingMetric/BookingMetricHistorical';
import BookingMetricHeatMap from './pages/BookingMetric/BookingMetricHeatMap';
import BookingMetricForecast from './pages/BookingMetric/BookingMetricForecast';

//Cancellation
import CancellationHistorical from './pages/Cancellation/CancellationHistorical';
import CancellationForcast from './pages/Cancellation/CancellationForcast';
import CancellationHeatMap from './pages/Cancellation/CancellationHeatMap';

// //InAdvance
import InAdvanceHistorical from './pages/InAdvance/InAdvanceHistorical';
import InAdvanceHeatMap from './pages/InAdvance/InAdvanceHeatMap';

// //Stay
import StayHistorical from './pages/Stay/StayHistorical';
import StayHeatMap from './pages/Stay/StayHeatMap';
import StayForcast from './pages/Stay/StayForcast';

function App() {
  return (
    <div className="App">
    
    <HashRouter>

      <Layout>

        <Routes>
        
              <Route path="/" element={<Home />}/>

              {/* Average Delay */}
              <Route path="/averageDelayHistorical" element={<AverageDelayHistorical />}/>
              <Route path="/AverageDelayHeatMap" element={<AverageDelayHeatMap />}/>

              {/* Average Key */}
              <Route path="/averageKeyHistorical" element={<AverageKeyHistorical />}/>
              <Route path="/AverageKeyHeatMap" element={<AverageKeyHeatMap />}/>

              {/* Booking Metric */}
              <Route path="/bookingMetricHistorical" element={<BookingMetricHistorical />}/>
              <Route path="/bookingMetricHeatMap" element={<BookingMetricHeatMap />}/>
              <Route path="/bookingMetricForecast" element={<BookingMetricForecast />}/>

              {/* Cancellation */}
              <Route path="/cancellationHistorical" element={<CancellationHistorical />}/>
              <Route path="/cancellationForcast" element={<CancellationForcast />}/>
              <Route path="/cancellationHeatMap" element={<CancellationHeatMap />}/>

              {/* In Advance */}
              <Route path="/inAdvanceHistorical" element={<InAdvanceHistorical />}/>
              <Route path="/inAdvanceHeatMap" element={<InAdvanceHeatMap />}/>

              {/* Stay */}
              <Route path="/stayHistorical" element={<StayHistorical />}/>
              <Route path="/stayHeatMap" element={<StayHeatMap />}/>
              <Route path="/stayForcast" element={<StayForcast />}/>
        
              {/* 默认路由 */}
              <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </Layout>

    </HashRouter>
    

    </div>
  );
}

export default App;
