// import logo from './logo.svg';
import './App.css';

import { Navigate, Route, Routes} from "react-router";
import { HashRouter } from "react-router-dom";

import Layout from './pages/Layout';
import Home from './pages/Home';
import Bar from './pages/Charts/Bar';
import Pie from './pages/Charts/Pie';

// Average Delay
import AverageDelayBar from './pages/AverageDelay/AverageDelayBar';
import AverageDelayHeatMap from './pages/AverageDelay/AverageDelayHeatMap';

// Average Key
import AverageKeyBar from './pages/AverageKey/AverageKeyBar';
import AverageKeyHeatMap from './pages/AverageKey/AverageKeyHeatMap';

// Booking Metric
import BookingMetricBar from './pages/BookingMetric/BookingMetricBar';
import BookingMetricHeatMap from './pages/BookingMetric/BookingMetricHeatMap';
import BookingMetricForecast from './pages/BookingMetric/BookingMetricForecast';

//Cancellation
import CancellationBar from './pages/Cancellation/CancellationBar';
import CancellationHeatMap from './pages/Cancellation/CancellationHeatMap';

//InAdvance
import InAdvanceBar from './pages/InAdvance/InAdvanceBar';
import InAdvanceHeatMap from './pages/InAdvance/InAdvanceHeatMap';

//Stay
import StayBar from './pages/Stay/StayBar';
import StayHeatMap from './pages/Stay/StayHeatMap';

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
              <Route path="/AverageDelayBar" element={<AverageDelayBar />}/>
              <Route path="/AverageDelayHeatMap" element={<AverageDelayHeatMap />}/>

              {/* Average Key */}
              <Route path="/AverageKeyBar" element={<AverageKeyBar />}/>
              <Route path="/AverageKeyHeatMap" element={<AverageKeyHeatMap />}/>

              {/* Booking Metric */}
              <Route path="/bookingMetricBar" element={<BookingMetricBar />}/>
              <Route path="/bookingMetricHeatMap" element={<BookingMetricHeatMap />}/>
              <Route path="/bookingMetricForecast" element={<BookingMetricForecast />}/>

              {/* Cancellation */}
              <Route path="/cancellationBar" element={<CancellationBar />}/>
              <Route path="/cancellationHeatMap" element={<CancellationHeatMap />}/>

              {/* In Advance */}
              <Route path="/inAdvanceBar" element={<InAdvanceBar />}/>
              <Route path="/inAdvanceHeatMap" element={<InAdvanceHeatMap />}/>

              {/* Stay */}
              <Route path="/stayBar" element={<StayBar />}/>
              <Route path="/stayHeatMap" element={<StayHeatMap />}/>
        
              {/* 默认路由 */}
              <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </Layout>

    </HashRouter>
    

    </div>
  );
}

export default App;
