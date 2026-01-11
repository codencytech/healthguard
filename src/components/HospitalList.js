import React from 'react';
import { getNearbyHospitals } from '../data/hospitals';

function HospitalList({ userLocation, emergencyLevel }) {
    const hospitals = getNearbyHospitals(userLocation?.country, userLocation?.state, 5);

    const callHospital = (phone) => {
        // In production, this would make an actual call
        // For demo, just show an alert
        alert(`In production: Calling ${phone}\n\nFor now, please call manually.`);
    };

    const getDirections = (address) => {
        // In production, this would open maps
        alert(`In production: Opening maps to:\n${address}\n\nFor now, please use your maps app.`);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Nearby Emergency Hospitals
                    </h3>
                    <p className="text-gray-600">
                        Based on your location: {userLocation?.countryName}, {userLocation?.stateName || 'N/A'}
                    </p>
                </div>
                
                <div className="badge badge-lg badge-error gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Open 24/7
                </div>
            </div>

            {/* Emergency Notice */}
            {emergencyLevel === 'high' && (
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-5 animate-pulse">
                    <div className="flex items-center gap-3">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                            <h4 className="font-bold text-lg">HIGH EMERGENCY ALERT</h4>
                            <p className="text-white/90">
                                Go to the nearest emergency department immediately. Do not drive yourself if possible.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Hospitals List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hospitals.map((hospital) => (
                    <div key={hospital.id} className="card-hover bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden">
                        {/* Hospital Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="font-bold text-lg">{hospital.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        <span className="text-sm opacity-90">{hospital.distance} away</span>
                                    </div>
                                </div>
                                <div className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                    ⭐ {hospital.rating}
                                </div>
                            </div>
                        </div>

                        {/* Hospital Details */}
                        <div className="p-5">
                            <div className="mb-4">
                                <div className="flex items-center gap-2 text-gray-700 mb-2">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm">{hospital.address}</span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-gray-700 mb-4">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span className="font-bold text-lg text-primary">{hospital.phone}</span>
                                </div>
                            </div>

                            {/* Specialties */}
                            <div className="mb-5">
                                <div className="text-sm font-medium text-gray-700 mb-2">Specialties:</div>
                                <div className="flex flex-wrap gap-2">
                                    {hospital.specialties.map((specialty, idx) => (
                                        <span key={idx} className="badge badge-outline badge-sm">
                                            {specialty}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => callHospital(hospital.phone)}
                                    className="btn btn-primary btn-outline btn-sm rounded-lg"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Call
                                </button>
                                <button
                                    onClick={() => getDirections(hospital.address)}
                                    className="btn btn-secondary btn-outline btn-sm rounded-lg"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                    Directions
                                </button>
                            </div>
                        </div>

                        {/* Emergency Status */}
                        {hospital.emergency && (
                            <div className="bg-red-50 border-t border-red-200 p-3">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-sm font-medium text-red-700">
                                        24/7 Emergency Department
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Demo Notice */}
            <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200 mt-8">
                <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <h4 className="font-bold text-yellow-800 mb-2">DEMONSTRATION DATA</h4>
                        <p className="text-yellow-700">
                            These hospital details are for demonstration purposes only. 
                            In a production system, this would show real hospitals with:
                        </p>
                        <ul className="list-disc pl-5 mt-2 text-yellow-700">
                            <li>Real-time distance and traffic information</li>
                            <li>Current wait times at emergency departments</li>
                            <li>Available beds and ICU capacity</li>
                            <li>Direct integration with navigation apps</li>
                            <li>Emergency department status updates</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Important Notes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold">1</span>
                        </div>
                        <p className="text-blue-700">
                            Call ahead if possible to alert hospital of your emergency
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold">2</span>
                        </div>
                        <p className="text-blue-700">
                            Bring identification, insurance, and medication list
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold">3</span>
                        </div>
                        <p className="text-blue-700">
                            Have someone accompany you if you're driving
                        </p>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold">4</span>
                        </div>
                        <p className="text-blue-700">
                            In life-threatening emergency, call ambulance (911/112/999)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HospitalList;