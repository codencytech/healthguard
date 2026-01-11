import React from 'react';

function EmergencyPopup({ onClose, userLocation, emergencyContacts }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="modal modal-open">
                <div className="modal-box max-w-2xl bg-gradient-to-br from-white to-red-50 border-2 border-red-200">
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>

                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-red-700 mb-2">
                            EMERGENCY SOS ACTIVATED
                        </h3>
                        <p className="text-gray-600">
                            In a real emergency, this system would automatically:
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-red-100">
                            <div className="bg-red-100 p-2 rounded-lg">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Automatic Emergency Call</h4>
                                <p className="text-gray-600 text-sm">
                                    Would automatically call emergency services and provide your location
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-red-100">
                            <div className="bg-red-100 p-2 rounded-lg">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Location Sharing</h4>
                                <p className="text-gray-600 text-sm">
                                    Your exact GPS coordinates would be sent to emergency responders
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-red-100">
                            <div className="bg-red-100 p-2 rounded-lg">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Medical Info Dispatch</h4>
                                <p className="text-gray-600 text-sm">
                                    Your medical history and emergency contacts would be shared with responders
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-red-100">
                            <div className="bg-red-100 p-2 rounded-lg">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">Nearest Hospital Alert</h4>
                                <p className="text-gray-600 text-sm">
                                    Nearby hospitals would be alerted to prepare for your arrival
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Emergency Numbers */}
                    {emergencyContacts && (
                        <div className="mb-8 p-6 bg-red-50 rounded-2xl">
                            <h4 className="font-bold text-red-800 mb-4 text-center">
                                Call Emergency Services Manually
                            </h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(emergencyContacts).map(([service, number]) => (
                                    <a 
                                        key={service}
                                        href={`tel:${number}`}
                                        className="btn btn-error btn-outline rounded-lg"
                                    >
                                        <div className="text-center">
                                            <div className="font-bold text-sm">{service}</div>
                                            <div className="text-lg font-bold">{number}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Demo Notice */}
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-6">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h5 className="font-bold text-yellow-800">DEMONSTRATION ONLY</h5>
                                <p className="text-yellow-700 text-sm">
                                    This is a prototype showing what would happen in a production system. 
                                    For now, you need to manually call emergency services if needed.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="modal-action flex-col sm:flex-row gap-3">
                        <button 
                            onClick={onClose}
                            className="btn btn-ghost btn-wide"
                        >
                            Close
                        </button>
                        {emergencyContacts && (
                            <a 
                                href={`tel:${emergencyContacts.ambulance}`}
                                className="btn btn-error btn-wide gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call Emergency Now
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmergencyPopup;