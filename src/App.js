import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AiAssistantPage from './pages/AiAssistantPage';
import EmergencyPopup from './components/EmergencyPopup';
import './App.css';

function App() {
    const [showEmergencyPopup, setShowEmergencyPopup] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [emergencyContacts, setEmergencyContacts] = useState(null);

    // Load emergency contacts based on location
    useEffect(() => {
        if (userLocation) {
            const contacts = getEmergencyContacts(userLocation.country);
            setEmergencyContacts(contacts);
        }
    }, [userLocation]);

    const getEmergencyContacts = (country) => {
        const contactsMap = {
            'US': { ambulance: '911', police: '911', fire: '911', poison: '1-800-222-1222' },
            'IN': { ambulance: '102', police: '100', fire: '101', poison: '1066' },
            'UK': { ambulance: '999', police: '101', fire: '999', poison: '111' },
            'AU': { ambulance: '000', police: '131444', fire: '000', poison: '131126' },
            'CA': { ambulance: '911', police: '911', fire: '911', poison: '1-800-268-9017' }
        };
        return contactsMap[country] || contactsMap['US'];
    };

    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Emergency Button - Fixed at top */}
                <button 
                    onClick={() => setShowEmergencyPopup(true)}
                    className="fixed top-4 right-4 z-50 emergency-pulse btn btn-error btn-circle btn-lg shadow-2xl"
                    title="Emergency SOS"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </button>

                <Routes>
                    <Route path="/" element={
                        <HomePage 
                            setUserLocation={setUserLocation} 
                            emergencyContacts={emergencyContacts}
                        />
                    } />
                    <Route path="/ai-assistant" element={
                        <AiAssistantPage 
                            userLocation={userLocation}
                            emergencyContacts={emergencyContacts}
                        />
                    } />
                </Routes>

                {/* Emergency Popup */}
                {showEmergencyPopup && (
                    <EmergencyPopup 
                        onClose={() => setShowEmergencyPopup(false)}
                        userLocation={userLocation}
                        emergencyContacts={emergencyContacts}
                    />
                )}
            </div>
        </Router>
    );
}

export default App;