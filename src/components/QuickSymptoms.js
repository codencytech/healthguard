import React from 'react';

function QuickSymptoms({ symptoms, onSelect }) {
    const getLevelColor = (level) => {
        switch(level) {
            case 'high': return 'border-red-300 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100';
            case 'medium': return 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100';
            case 'low': return 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100';
            default: return 'border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100';
        }
    };

    const getLevelBadge = (level) => {
        switch(level) {
            case 'high': return <span className="badge badge-error">Emergency</span>;
            case 'medium': return <span className="badge badge-warning">Urgent</span>;
            case 'low': return <span className="badge badge-success">Mild</span>;
            default: return <span className="badge badge-info">Info</span>;
        }
    };

    const getLevelIcon = (level) => {
        switch(level) {
            case 'high': return '🚨';
            case 'medium': return '⚠️';
            case 'low': return '💚';
            default: return 'ℹ️';
        }
    };

    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
                Common Symptoms
                <span className="text-sm font-normal text-gray-500">
                    (Click to add)
                </span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {symptoms.map((symptom) => (
                    <button
                        key={symptom.id}
                        onClick={() => onSelect(symptom)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 hover-lift ${getLevelColor(symptom.level)}`}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <span className="text-2xl">{getLevelIcon(symptom.level)}</span>
                            {getLevelBadge(symptom.level)}
                        </div>
                        
                        <h4 className="font-bold text-gray-800 mb-1">
                            {symptom.name}
                        </h4>
                        
                        <p className="text-sm text-gray-600">
                            {symptom.description}
                        </p>
                        
                        <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            Click to add
                        </div>
                    </button>
                ))}
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">Tip:</span> Select symptoms that match your condition. 
                            The AI will analyze severity and provide appropriate guidance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuickSymptoms;