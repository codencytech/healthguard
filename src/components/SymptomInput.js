import React, { useState } from 'react';

function SymptomInput({ symptoms, setSymptoms, onAnalyze, isLoading }) {
    const [characterCount, setCharacterCount] = useState(0);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSymptoms(value);
        setCharacterCount(value.length);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (symptoms.trim().length > 0) {
                onAnalyze();
            }
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    <span className="text-xl font-bold text-gray-800">
                        Describe Your Symptoms
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                        Be as detailed as possible
                    </span>
                </label>
                
                <div className="relative">
                    <textarea
                        value={symptoms}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Example: I have chest pain that started 30 minutes ago, with shortness of breath and sweating. The pain radiates to my left arm."
                        className="textarea textarea-bordered w-full h-48 text-lg p-4 border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none rounded-2xl"
                        maxLength="1000"
                    />
                    
                    <div className="absolute bottom-4 right-4 text-sm text-gray-500">
                        {characterCount}/1000 characters
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tips for better analysis:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Mention when symptoms started
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Describe pain level (1-10 scale)
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Note any other symptoms
                    </li>
                    <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Include medical history if relevant
                    </li>
                </ul>
            </div>

            {/* Analyze Button */}
            <div className="text-center pt-4">
                <button
                    onClick={onAnalyze}
                    disabled={isLoading || !symptoms.trim()}
                    className={`btn btn-primary btn-lg px-12 rounded-full shadow-lg transition-all duration-300 ${!symptoms.trim() ? 'opacity-50' : 'hover:shadow-xl hover:-translate-y-1'}`}
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <span className="loading loading-spinner loading-sm"></span>
                            AI is analyzing symptoms...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Analyze with AI
                        </span>
                    )}
                </button>
                
                <p className="text-sm text-gray-500 mt-3">
                    Our AI will assess symptoms and provide emergency guidance
                </p>
            </div>
        </div>
    );
}

export default SymptomInput;