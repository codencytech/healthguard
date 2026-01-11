import React from 'react';

function AiResponse({ response, emergencyLevel }) {
    const getEmergencyColor = (level) => {
        switch(level) {
            case 'high': return 'bg-gradient-to-r from-red-600 to-red-700';
            case 'medium': return 'bg-gradient-to-r from-orange-500 to-yellow-500';
            case 'low': return 'bg-gradient-to-r from-green-500 to-emerald-500';
            default: return 'bg-gradient-to-r from-blue-500 to-cyan-500';
        }
    };

    const getEmergencyIcon = (level) => {
        switch(level) {
            case 'high': return '🚨';
            case 'medium': return '⚠️';
            case 'low': return '✅';
            default: return 'ℹ️';
        }
    };

    const getEmergencyTitle = (level) => {
        switch(level) {
            case 'high': return 'HIGH EMERGENCY - IMMEDIATE ACTION REQUIRED';
            case 'medium': return 'URGENT CARE NEEDED - SEE DOCTOR SOON';
            case 'low': return 'MILD SYMPTOMS - MONITOR AND REST';
            default: return 'SYMPTOM ANALYSIS';
        }
    };

    return (
        <div className="space-y-8">
            {/* Emergency Level Banner */}
            <div className={`${getEmergencyColor(emergencyLevel)} text-white rounded-3xl p-6 shadow-xl animate-pulse-gentle`}>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{getEmergencyIcon(emergencyLevel)}</span>
                            <h2 className="text-2xl font-bold">
                                {getEmergencyTitle(emergencyLevel)}
                            </h2>
                        </div>
                        <p className="text-white/90">
                            Based on AI analysis of your symptoms
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="text-center bg-white/20 p-4 rounded-2xl">
                            <div className="text-sm opacity-90">AI Confidence</div>
                            <div className="text-3xl font-bold">92%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Diagnosis Section */}
            <div className="glass-effect rounded-3xl p-6 shadow-soft">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    AI Assessment
                </h3>
                <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200">
                    <p className="text-lg text-gray-800 leading-relaxed">
                        {response.diagnosis}
                    </p>
                </div>
            </div>

            {/* Immediate Actions - Show first for high/medium emergencies */}
            {['high', 'medium'].includes(emergencyLevel) && (
                <div className="glass-effect rounded-3xl p-6 shadow-soft">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Immediate Actions (Do This Now)
                    </h3>
                    <div className="space-y-4">
                        {response.immediateActions.map((action, index) => (
                            <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary transition-all duration-300">
                                <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="text-gray-800 text-lg">{action}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* What to Expect at Hospital */}
            {['high', 'medium'].includes(emergencyLevel) && (
                <div className="glass-effect rounded-3xl p-6 shadow-soft">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        What to Expect at Hospital
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {response.whatToExpect.map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <span className="font-medium text-gray-800">{item}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Warning Signs */}
            <div className="glass-effect rounded-3xl p-6 shadow-soft">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Warning Signs (Go to ER Immediately)
                </h3>
                <div className="flex flex-wrap gap-3">
                    {response.warningSigns.map((sign, index) => (
                        <div key={index} className="badge badge-error badge-lg gap-2 p-4">
                            ⚠️ {sign}
                        </div>
                    ))}
                </div>
            </div>

            {/* Low Emergency Section - Show last */}
            {emergencyLevel === 'low' && (
                <div className="glass-effect rounded-3xl p-6 shadow-soft">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Self-Care Recommendations
                    </h3>
                    <div className="bg-green-50 p-5 rounded-2xl border border-green-200">
                        <p className="text-lg text-gray-800 mb-4">
                            Your symptoms appear to be mild. Here are some self-care tips:
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <span>Rest and stay hydrated with water</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span>Monitor symptoms for 24-48 hours</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span>Contact doctor if symptoms worsen or persist</span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {/* Analysis Time */}
            <div className="text-center text-sm text-gray-500">
                Analysis performed at: {new Date(response.timestamp).toLocaleTimeString()}
            </div>
        </div>
    );
}

export default AiResponse;