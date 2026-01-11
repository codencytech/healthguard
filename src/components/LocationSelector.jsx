import React, { useState } from 'react';
import { emergencyNumbers, stateSpecific } from '../data/emergencyDB';

const LocationSelector = ({ onLocationChange }) => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedState, setSelectedState] = useState('');

  const countries = Object.keys(emergencyNumbers).map(code => ({
    code,
    name: emergencyNumbers[code].country
  }));

  const getStatesForCountry = (countryCode) => {
    return Object.keys(stateSpecific)
      .filter(key => key.startsWith(`${countryCode}-`))
      .map(key => ({
        code: key.split('-')[1],
        name: stateSpecific[key].state
      }));
  };

  const states = getStatesForCountry(selectedCountry);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    onLocationChange({ country, state: '' });
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    onLocationChange({ country: selectedCountry, state });
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <h2 className="text-2xl font-bold mb-4">📍 Select Your Location</h2>
      <p className="text-gray-600 mb-6">This helps us provide the correct emergency numbers</p>
      
      <div className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text font-semibold">Country</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {states.length > 0 && (
          <div>
            <label className="label">
              <span className="label-text font-semibold">State/Region (Optional)</span>
            </label>
            <select 
              className="select select-bordered w-full"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select state/region</option>
              {states.map(state => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800">Current Location:</h3>
          <p className="text-blue-700">
            {emergencyNumbers[selectedCountry]?.country}
            {selectedState && `, ${stateSpecific[`${selectedCountry}-${selectedState}`]?.state}`}
          </p>
          <p className="text-sm text-blue-600 mt-2">
            Emergency: <span className="font-bold">{emergencyNumbers[selectedCountry]?.emergency}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationSelector;