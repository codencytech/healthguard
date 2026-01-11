import React from 'react';
import { emergencyNumbers, stateSpecific } from '../data/emergencyDB';
import { getEmergencyLevel, getEmergencyInstructions } from '../data/symptomsDB';
import { FaPhone, FaMapMarkerAlt, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';

const EmergencyResult = ({ location, symptoms }) => {
  if (!symptoms || symptoms.length === 0) {
    return (
      <div className="card bg-base-100 shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">👨‍⚕️</div>
        <h2 className="text-2xl font-bold mb-2">Select Symptoms First</h2>
        <p className="text-gray-600">Choose your symptoms to get personalized emergency advice</p>
      </div>
    );
  }

  const emergencyLevel = getEmergencyLevel(symptoms);
  const instructions = getEmergencyInstructions(emergencyLevel, location.country);
  const countryData = emergencyNumbers[location.country];
  const stateData = location.state ? stateSpecific[`${location.country}-${location.state}`] : null;

  const getEmergencyNumber = () => {
    if (emergencyLevel === 'red') return countryData.emergency;
    if (emergencyLevel === 'orange') return countryData.ambulance;
    if (emergencyLevel === 'yellow') return countryData.poison || countryData.emergency;
    return null;
  };

  const emergencyNumber = getEmergencyNumber();

  return (
    <div className="space-y-6">
      {/* EMERGENCY LEVEL CARD */}
      <div className={`card shadow-xl ${instructions.color} ${instructions.textColor}`}>
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="card-title text-3xl font-bold">{instructions.title}</h2>
              <p className="text-xl mt-2">{instructions.action}</p>
            </div>
            <div className="text-6xl">
              {emergencyLevel === 'red' && '🚨'}
              {emergencyLevel === 'orange' && '⚠️'}
              {emergencyLevel === 'yellow' && '🔶'}
              {emergencyLevel === 'green' && '✅'}
            </div>
          </div>
        </div>
      </div>

      {/* EMERGENCY NUMBERS */}
      {emergencyNumber && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title text-xl font-bold flex items-center gap-2">
              <FaPhone className="text-red-500" />
              Emergency Numbers to Call
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Primary Emergency Number */}
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-red-700">Primary Emergency</h4>
                    <p className="text-3xl font-bold text-red-800 mt-2">{emergencyNumber}</p>
                    <p className="text-sm text-red-600 mt-1">
                      Call this number {emergencyLevel === 'red' ? 'IMMEDIATELY' : 'soon'}
                    </p>
                  </div>
                  <div className="text-4xl">📞</div>
                </div>
                <button className="btn btn-error btn-block mt-4">
                  <FaPhone /> Simulate Emergency Call
                </button>
              </div>

              {/* Additional Numbers */}
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="font-bold text-blue-700">Ambulance</p>
                  <p className="text-xl font-bold text-blue-800">{countryData.ambulance}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="font-bold text-purple-700">Police</p>
                  <p className="text-xl font-bold text-purple-800">{countryData.police}</p>
                </div>
                {countryData.poison && countryData.poison !== 'None' && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-bold text-green-700">Poison Control</p>
                    <p className="text-xl font-bold text-green-800">{countryData.poison}</p>
                  </div>
                )}
              </div>
            </div>

            {/* State-Specific Numbers */}
            {stateData && stateData.additional && (
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-bold mb-3">State-Specific Numbers for {stateData.state}:</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(stateData.additional).map(([service, number]) => (
                    <div key={service} className="badge badge-lg badge-outline p-3">
                      {service}: <span className="font-bold ml-1">{number}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INSTRUCTIONS */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title text-xl font-bold flex items-center gap-2">
            <FaExclamationTriangle className="text-orange-500" />
            What To Do Now
          </h3>
          
          <div className="space-y-4 mt-4">
            {instructions.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="badge badge-lg badge-primary">{index + 1}</div>
                <p className="text-lg">{step}</p>
              </div>
            ))}
          </div>

          {/* Emergency Script */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">📝 What to say when calling:</h4>
            <div className="bg-white p-4 rounded border">
              <p>"Hello, I need emergency services at [your location].</p>
              <p>The person has: {symptoms.map(s => s.name).join(', ')}.</p>
              <p>We are at [exact address/location].</p>
              <p>My name is [your name]. Please send help."</p>
            </div>
          </div>
        </div>
      </div>

      {/* SAFETY DISCLAIMER - VERY IMPORTANT */}
      <div className="card bg-red-50 border-2 border-red-300">
        <div className="card-body">
          <h3 className="card-title text-red-700 flex items-center gap-2">
            <FaShieldAlt />
            ⚠️ CRITICAL DISCLAIMER
          </h3>
          <div className="space-y-2 text-red-700">
            <p className="font-bold">THIS IS A DEMONSTRATION SYSTEM ONLY</p>
            <p>• This tool does NOT make real emergency calls</p>
            <p>• Numbers shown are for educational purposes</p>
            <p>• In real emergency, CALL YOUR LOCAL EMERGENCY NUMBER</p>
            <p>• This is a hackathon project, not a real medical tool</p>
            <p>• Always consult medical professionals for actual advice</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyResult;