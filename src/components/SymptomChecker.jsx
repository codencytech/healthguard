import React, { useState, useEffect } from 'react';
import { symptomsList } from '../data/symptomsDB';
import { analyzeSymptomsWithAI } from '../services/aiService';
import { 
  FaHeartbeat, FaThermometerFull, FaBandAid, FaHeadSideVirus,
  FaRobot, FaBrain, FaUserMd, FaExclamationCircle
} from 'react-icons/fa';

const SymptomChecker = ({ onSymptomsChange, onAIResponse }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userPregnant, setUserPregnant] = useState(false);
  const [chronicConditions, setChronicConditions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(true);

  // Enhanced symptoms list with AI-generated descriptions
  const [enhancedSymptoms, setEnhancedSymptoms] = useState(symptomsList);

  // Get more symptom suggestions based on input
  useEffect(() => {
    if (searchTerm.length > 2) {
      // In real app, you could call AI for symptom suggestions
      // For now, we'll use local matching
    }
  }, [searchTerm]);

  const getIcon = (level) => {
    switch(level) {
      case 'red': return <FaHeartbeat className="text-red-500" />;
      case 'orange': return <FaThermometerFull className="text-orange-500" />;
      case 'yellow': return <FaBandAid className="text-yellow-500" />;
      case 'green': return <FaHeadSideVirus className="text-green-500" />;
      default: return null;
    }
  };

  const toggleSymptom = (symptom) => {
    const isSelected = selectedSymptoms.some(s => s.id === symptom.id);
    let newSymptoms;
    
    if (isSelected) {
      newSymptoms = selectedSymptoms.filter(s => s.id !== symptom.id);
    } else {
      newSymptoms = [...selectedSymptoms, symptom];
    }
    
    setSelectedSymptoms(newSymptoms);
    onSymptomsChange(newSymptoms);
  };

  const handleAI分析 = async () => {
    if (selectedSymptoms.length === 0) {
      alert('Please select at least one symptom');
      return;
    }

    setIsAnalyzing(true);
    try {
      const aiResponse = await analyzeSymptomsWithAI(
        selectedSymptoms,
        userAge,
        userPregnant,
        chronicConditions
      );
      
      onAIResponse(aiResponse);
      
      // Show success message
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-success fixed top-4 right-4 z-50 w-96 shadow-lg`;
      alertDiv.innerHTML = `
        <div class="flex items-center gap-3">
          <FaRobot class="text-xl" />
          <div>
            <h3 class="font-bold">AI Analysis Complete!</h3>
            <p class="text-sm">Emergency level: ${aiResponse.emergencyLevel.toUpperCase()}</p>
            <p class="text-xs">Confidence: ${aiResponse.aiConfidence}%</p>
          </div>
        </div>
      `;
      document.body.appendChild(alertDiv);
      setTimeout(() => alertDiv.remove(), 3000);
      
    } catch (error) {
      console.error('AI Analysis failed:', error);
      alert('AI analysis failed. Using standard assessment.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredSymptoms = enhancedSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    symptom.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card bg-base-100 shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">🤒 AI Symptom Checker</h2>
        <div className="flex items-center gap-2">
          <div className="badge badge-primary badge-lg gap-1">
            <FaRobot /> AI-Powered
          </div>
          <label className="swap">
            <input 
              type="checkbox" 
              checked={aiEnabled}
              onChange={(e) => setAiEnabled(e.target.checked)}
            />
            <div className="swap-on">AI ON</div>
            <div className="swap-off">AI OFF</div>
          </label>
        </div>
      </div>
      
      <p className="text-gray-600 mb-6">
        {aiEnabled 
          ? "Select symptoms and get AI-powered emergency assessment"
          : "Select symptoms for basic assessment"}
      </p>

      {/* Patient Information Section */}
      <div className="collapse collapse-arrow bg-base-200 mb-6">
        <input type="checkbox" />
        <div className="collapse-title font-medium">
          <FaUserMd className="inline mr-2" />
          Patient Information (Optional - Improves AI accuracy)
        </div>
        <div className="collapse-content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            <div>
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input 
                type="number" 
                className="input input-bordered w-full"
                placeholder="e.g., 25"
                value={userAge}
                onChange={(e) => setUserAge(e.target.value)}
                min="0"
                max="120"
              />
            </div>
            
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-primary" 
                  checked={userPregnant}
                  onChange={(e) => setUserPregnant(e.target.checked)}
                />
                <span className="label-text">Pregnant or could be pregnant</span>
              </label>
            </div>
            
            <div className="md:col-span-2">
              <label className="label">
                <span className="label-text">Chronic Conditions (Optional)</span>
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {['Diabetes', 'Heart Disease', 'Asthma', 'High BP', 'None'].map(condition => (
                  <button
                    key={condition}
                    className={`btn btn-xs ${chronicConditions.includes(condition) ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => {
                      if (condition === 'None') {
                        setChronicConditions([]);
                      } else if (chronicConditions.includes(condition)) {
                        setChronicConditions(chronicConditions.filter(c => c !== condition));
                      } else {
                        setChronicConditions([...chronicConditions.filter(c => c !== 'None'), condition]);
                      }
                    }}
                  >
                    {condition}
                  </button>
                ))}
              </div>
              <input 
                type="text" 
                className="input input-bordered w-full input-sm"
                placeholder="Add other conditions (comma separated)"
                onBlur={(e) => {
                  const newConditions = e.target.value.split(',').map(c => c.trim()).filter(c => c);
                  if (newConditions.length > 0) {
                    setChronicConditions([...chronicConditions.filter(c => c !== 'None'), ...newConditions]);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Search symptoms (e.g., 'chest pain', 'fever')..."
            className="input input-bordered join-item w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="btn btn-primary join-item"
            onClick={() => {
              if (searchTerm.trim()) {
                // Add custom symptom
                const newSymptom = {
                  id: Date.now(),
                  name: searchTerm.trim(),
                  level: 'yellow',
                  description: 'Custom symptom added by user'
                };
                const newSymptoms = [...selectedSymptoms, newSymptom];
                setSelectedSymptoms(newSymptoms);
                onSymptomsChange(newSymptoms);
                setSearchTerm('');
              }
            }}
          >
            Add
          </button>
        </div>
      </div>

      {/* Selected Symptoms */}
      {selectedSymptoms.length > 0 && (
        <div className="mb-6 bg-base-200 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold">Selected Symptoms ({selectedSymptoms.length}):</h3>
            {aiEnabled && (
              <button
                className={`btn btn-primary btn-sm ${isAnalyzing ? 'loading' : ''}`}
                onClick={handleAI分析}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>Analyzing with AI...</>
                ) : (
                  <>
                    <FaBrain className="mr-2" />
                    Analyze with AI
                  </>
                )}
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map(symptom => (
              <div key={symptom.id} className="badge badge-lg gap-1 p-3">
                {getIcon(symptom.level)}
                <span className="font-medium">{symptom.name}</span>
                <button 
                  onClick={() => toggleSymptom(symptom)} 
                  className="btn btn-xs btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Symptoms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
        {filteredSymptoms.map(symptom => {
          const isSelected = selectedSymptoms.some(s => s.id === symptom.id);
          const levelColors = {
            red: 'bg-red-50 border-red-300',
            orange: 'bg-orange-50 border-orange-300',
            yellow: 'bg-yellow-50 border-yellow-300',
            green: 'bg-green-50 border-green-300'
          };
          const levelBadges = {
            red: <span className="badge badge-error">Emergency</span>,
            orange: <span className="badge badge-warning">Urgent</span>,
            yellow: <span className="badge badge-info">Care Needed</span>,
            green: <span className="badge badge-success">Home Care</span>
          };
          
          return (
            <div
              key={symptom.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                isSelected 
                  ? levelColors[symptom.level] + ' ring-2 ring-offset-1 ring-primary'
                  : 'border-base-300 hover:border-primary'
              }`}
              onClick={() => toggleSymptom(symptom)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getIcon(symptom.level)}
                  <h4 className="font-bold">{symptom.name}</h4>
                </div>
                {levelBadges[symptom.level]}
              </div>
              <p className="text-sm text-gray-600 mb-2">{symptom.description}</p>
              
              {aiEnabled && symptom.aiTips && (
                <div className="text-xs text-primary bg-primary/10 p-2 rounded">
                  <FaRobot className="inline mr-1" />
                  {symptom.aiTips}
                </div>
              )}
              
              {isSelected && (
                <div className="mt-2 text-sm font-medium text-primary flex items-center gap-1">
                  <FaExclamationCircle />
                  Selected - {symptom.level === 'red' ? 'Emergency priority' : 
                              symptom.level === 'orange' ? 'Urgent evaluation needed' : 
                              symptom.level === 'yellow' ? 'Medical attention recommended' : 
                              'Home care advised'}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Status & Controls */}
      <div className="mt-6 pt-6 border-t border-base-300">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`badge ${aiEnabled ? 'badge-primary' : 'badge-ghost'}`}>
              AI Analysis: {aiEnabled ? 'Enabled' : 'Disabled'}
            </div>
            {aiEnabled && (
              <div className="text-sm text-gray-500">
                {process.env.REACT_APP_GEMINI_API_KEY 
                  ? "Using Gemini AI for intelligent assessment"
                  : "Using mock AI (add API key for real AI)"}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                setSelectedSymptoms([]);
                onSymptomsChange([]);
              }}
            >
              Clear All
            </button>
            
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                // Add quick common combination
                const quickSet = enhancedSymptoms.filter(s => 
                  ['Chest pain or pressure', 'Difficulty breathing', 'High fever'].includes(s.name)
                );
                setSelectedSymptoms(quickSet);
                onSymptomsChange(quickSet);
              }}
            >
              Test Emergency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;