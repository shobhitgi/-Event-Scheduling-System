import "./App.css";
import AvailabilityPage from "./components/AvailabilityPage";
import AdminDashboardPage from "./components/AdminDashboardPage";
//import SessionManagementPage from './components/SessionManagementPage';
import SessionManagementPage from "./components/SessionManagementPage";
import { SessionProvider } from "./context/SessionContext";

function App() {
  return (
    
      <UserProvider>
          <SessionProvider>
            {/* Render your components here */}
            <AvailabilityPage />
            <AdminDashboardPage />
            <SessionManagementPage />
            {/* Add routing and other components as necessary */}
          </SessionProvider>
     </UserProvider>
  );
}

export default App;
