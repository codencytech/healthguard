import React, { useState, useEffect } from 'react';
import SymptomInput from '../components/SymptomInput';
import AiResponse from '../components/AiResponse';
import QuickSymptoms from '../components/QuickSymptoms';
import HospitalList from '../components/HospitalList';

function AiAssistantPage({ userLocation, emergencyContacts }) {
    const [symptoms, setSymptoms] = useState('');
    const [aiResponse, setAiResponse] = useState(null);
    const [emergencyLevel, setEmergencyLevel] = useState(null);
    const [showHospitals, setShowHospitals] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const quickSymptoms = [
        { id: 1, name: 'Chest Pain', level: 'high', description: 'Severe chest discomfort or pressure' },
        { id: 2, name: 'Difficulty Breathing', level: 'high', description: 'Shortness of breath or choking' },
        { id: 3, name: 'Severe Bleeding', level: 'high', description: 'Uncontrolled bleeding' },
        { id: 4, name: 'High Fever', level: 'medium', description: 'Temperature above 104°F (40°C)' },
        { id: 5, name: 'Head Injury', level: 'medium', description: 'Head trauma with confusion' },
        { id: 6, name: 'Broken Bone', level: 'medium', description: 'Visible deformity or severe pain' },
        { id: 7, name: 'Cough & Cold', level: 'low', description: 'Common cold symptoms' },
        { id: 8, name: 'Headache', level: 'low', description: 'Mild to moderate headache' },
        { id: 9, name: 'Stomach Pain', level: 'medium', description: 'Abdominal discomfort' },
        { id: 10, name: 'Allergic Reaction', level: 'high', description: 'Swelling or difficulty breathing' }
    ];

    const handleQuickSymptomClick = (symptom) => {
        setSymptoms(prev => prev ? `${prev}, ${symptom.name}` : symptom.name);
    };

    const analyzeSymptoms = async () => {
        if (!symptoms.trim()) {
            alert('Please describe your symptoms');
            return;
        }

        setIsLoading(true);
        
        // Simulate AI analysis with mock data
        setTimeout(() => {
            const mockAiResponse = {
                emergencyLevel: getEmergencyLevel(symptoms),
                diagnosis: getMockDiagnosis(symptoms),
                immediateActions: getImmediateActions(symptoms),
                whatToExpect: getWhatToExpect(symptoms),
                warningSigns: getWarningSigns(symptoms),
                timestamp: new Date().toISOString()
            };
            
            setAiResponse(mockAiResponse);
            setEmergencyLevel(mockAiResponse.emergencyLevel);
            setShowHospitals(['high', 'medium'].includes(mockAiResponse.emergencyLevel));
            setIsLoading(false);
        }, 1500);
    };

    const getEmergencyLevel = (symptomsText) => {
        const highKeywords = ['chest pain', 'difficulty breathing', 'severe bleeding', 'unconscious', 'stroke', 'heart attack'];
        const mediumKeywords = ['high fever', 'broken bone', 'head injury', 'severe pain', 'vomiting blood'];
        
        const text = symptomsText.toLowerCase();
        if (highKeywords.some(keyword => text.includes(keyword))) return 'high';
        if (mediumKeywords.some(keyword => text.includes(keyword))) return 'medium';
        return 'low';
    };

    const getMockDiagnosis = (symptoms) => {
        const diagnoses = [
            'Possible cardiac issue - requires immediate evaluation',
            'Respiratory distress - needs urgent medical attention',
            'Traumatic injury - requires assessment',
            'Infectious process - needs monitoring',
            'Minor ailment - self-care recommended'
        ];
        return diagnoses[Math.floor(Math.random() * diagnoses.length)];
    };

    const getImmediateActions = (symptoms) => [
        'Stay calm and keep the patient comfortable',
        'Do not give anything by mouth if unconscious',
        'Keep airway clear and monitor breathing',
        'Apply pressure to bleeding wounds with clean cloth',
        'Do not move if spinal injury is suspected'
    ];

    const getWhatToExpect = (symptoms) => [
        'Emergency services will assess vital signs',
        'Possible need for oxygen therapy',
        'Intravenous fluids may be administered',
        'Pain management medication',
        'Further diagnostic tests at hospital'
    ];

    const getWarningSigns = (symptoms) => [
        'Worsening pain or discomfort',
        'Difficulty breathing increases',
        'Change in consciousness level',
        'New symptoms develop',
        'Bleeding that does not stop'
    ];

    return (
        <div className="min-h-screen p-4 md:p-6 page-transition">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10 scroll-reveal">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold gradient-text mb-2">
                                AI Medical Assistant
                            </h1>
                            <p className="text-gray-600">
                                Describe your symptoms or select from common symptoms below
                            </p>
                        </div>
                        {userLocation && (
                            <div className="badge badge-primary badge-lg gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {userLocation.countryName}
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Input Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Symptom Input */}
                        <div className="card-hover glass-effect rounded-3xl p-6 shadow-soft scroll-reveal">
                            <SymptomInput 
                                symptoms={symptoms}
                                setSymptoms={setSymptoms}
                                onAnalyze={analyzeSymptoms}
                                isLoading={isLoading}
                            />
                        </div>

                        {/* Quick Symptoms */}
                        <div className="scroll-reveal">
                            <QuickSymptoms 
                                symptoms={quickSymptoms}
                                onSelect={handleQuickSymptomClick}
                            />
                        </div>
                    </div>

                    {/* Right Column - Info Panel */}
                    <div className="space-y-8">
                        {/* Emergency Contacts */}
                        {emergencyContacts && (
                            <div className="card-hover bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-6 shadow-soft scroll-reveal">
                                <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    Emergency Contacts
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(emergencyContacts).map(([service, number]) => (
                                        <div key={service} className="flex justify-between items-center p-3 bg-white rounded-lg">
                                            <span className="font-medium text-gray-700 capitalize">{service}</span>
                                            <span className="font-bold text-lg text-primary">{number}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tips Card */}
                        <div className="card-hover bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-6 shadow-soft scroll-reveal">
                            <h3 className="font-bold text-xl text-gray-800 mb-4">Important Tips</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Stay calm and describe symptoms clearly</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Have medication list ready if available</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Keep emergency contacts accessible</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* AI Response Section */}
                {aiResponse && (
                    <div className="mt-10 scroll-reveal">
                        <AiResponse 
                            response={aiResponse}
                            emergencyLevel={emergencyLevel}
                        />
                    </div>
                )}

                {/* Hospital List - Show for medium/high emergencies */}
                {showHospitals && (
                    <div className="mt-10 scroll-reveal">
                        <HospitalList 
                            userLocation={userLocation}
                            emergencyLevel={emergencyLevel}
                        />
                    </div>
                )}

                {/* Disclaimer */}
                <div className="mt-12 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <div>
                            <h4 className="font-bold text-yellow-800 mb-2">Important Disclaimer</h4>
                            <p className="text-yellow-700">
                                This AI assistant provides preliminary health information based on symptoms described. 
                                It is NOT a substitute for professional medical advice, diagnosis, or treatment. 
                                Always seek the advice of your physician or other qualified health provider with any 
                                questions you may have regarding a medical condition. In case of emergency, 
                                call your local emergency number immediately.
                            </p>
                            <p className="text-yellow-700 mt-2 font-medium">
                                ⚠️ This is a demonstration system for educational purposes only.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AiAssistantPage;