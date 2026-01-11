import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import countryList from '../data/countries';
import stateList from '../data/states';

function HomePage({ setUserLocation, emergencyContacts }) {
    const navigate = useNavigate();
    const [country, setCountry] = useState('US');
    const [state, setState] = useState('');
    const [states, setStates] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load states when country changes
    useEffect(() => {
        const countryStates = stateList[country] || [];
        setStates(countryStates);
        setState(countryStates.length > 0 ? countryStates[0].code : '');
    }, [country]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate loading
        setTimeout(() => {
            const locationData = {
                country: country,
                state: state,
                countryName: countryList.find(c => c.code === country)?.name || 'United States',
                stateName: states.find(s => s.code === state)?.name || ''
            };
            
            setUserLocation(locationData);
            setIsSubmitting(false);
            navigate('/ai-assistant');
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 page-transition">
            <div className="max-w-4xl w-full">
                {/* Header Section */}
                <div className="text-center mb-12 scroll-reveal">
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-2xl animate-float">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    
                    <h1 className="text-5xl font-bold mb-4 gradient-text">
                        HealthGuard AI
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                        Your intelligent medical assistant. Get instant help, find nearby hospitals, 
                        and receive emergency guidance based on your symptoms.
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="glass-effect rounded-3xl shadow-soft p-8 mb-8 parallax-card" data-speed="0.3">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">
                            Let's Get Started
                        </h2>
                        <p className="text-gray-600">
                            First, tell us your location to provide accurate emergency information
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* Country Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0022 5.5V3.937M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9z" />
                                        </svg>
                                        Country
                                    </span>
                                </label>
                                <select 
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="select select-bordered w-full bg-white/80 hover:bg-white focus:bg-white border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                                    required
                                >
                                    {countryList.map(c => (
                                        <option key={c.code} value={c.code}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* State Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        State/Region
                                    </span>
                                </label>
                                <select 
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="select select-bordered w-full bg-white/80 hover:bg-white focus:bg-white border-2 border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/30 transition-all duration-300"
                                    required
                                >
                                    {states.map(s => (
                                        <option key={s.code} value={s.code}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Emergency Contacts Preview */}
                        {emergencyContacts && (
                            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Emergency Contacts for Selected Location
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                        <div className="font-bold text-red-600">Ambulance</div>
                                        <div className="text-2xl font-bold mt-1">{emergencyContacts.ambulance}</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                        <div className="font-bold text-blue-600">Police</div>
                                        <div className="text-2xl font-bold mt-1">{emergencyContacts.police}</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                        <div className="font-bold text-orange-600">Fire</div>
                                        <div className="text-2xl font-bold mt-1">{emergencyContacts.fire}</div>
                                    </div>
                                    <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                                        <div className="font-bold text-green-600">Poison</div>
                                        <div className="text-2xl font-bold mt-1">{emergencyContacts.poison}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary btn-lg px-12 rounded-full shadow-lg hover-lift transition-all duration-300"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Setting up your location...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Continue to AI Assistant
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Quick Tips */}
                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        <span className="font-medium">Note:</span> This is a demo system. In real emergency, 
                        call your local emergency number immediately.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;