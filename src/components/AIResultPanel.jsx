import React, { useState } from 'react';
import { askAIFollowup } from '../services/aiService';
import { 
  FaRobot, FaBrain, FaQuestionCircle, FaLightbulb,
  FaShieldAlt, FaExclamationTriangle, FaCheckCircle
} from 'react-icons/fa';

const AIResultPanel = ({ aiResponse, location, symptoms }) => {
  const [userQuestion, setUserQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [showChat, setShowChat] = useState(false);

  if (!aiResponse) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center py-10">
          <FaRobot className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-bold">AI Analysis Not Available</h3>
          <p className="text-gray-600">Click "Analyze with AI" in the symptom checker to get AI-powered assessment</p>
        </div>
      </div>
    );
  }

  const handleAskAI = async () => {
    if (!userQuestion.trim()) return;

    const newConversation = [...conversation, { role: 'user', content: userQuestion }];
    setConversation(newConversation);
    setIsThinking(true);

    try {
      const aiAnswer = await askAIFollowup(userQuestion, newConversation);
      
      setConversation([
        ...newConversation,
        { 
          role: 'assistant', 
          content: aiAnswer.answer,
          warning: aiAnswer.safetyWarning,
          action: aiAnswer.suggestedAction
        }
      ]);
      
      setUserQuestion('');
    } catch (error) {
      console.error('Chat error:', error);
      setConversation([
        ...newConversation,
        { 
          role: 'assistant', 
          content: "Sorry, I couldn't process your question. Please try again.",
          warning: "If this is urgent, call emergency services.",
          action: "Try rephrasing your question"
        }
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const confidenceColor = aiResponse.aiConfidence >= 80 ? 'text-green-600' :
                         aiResponse.aiConfidence >= 60 ? 'text-yellow-600' :
                         'text-red-600';

  return (
    <div className="space-y-6">
      {/* AI Analysis Card */}
      <div className={`card shadow-xl ${
        aiResponse.emergencyLevel === 'red' ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-300' :
        aiResponse.emergencyLevel === 'orange' ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300' :
        aiResponse.emergencyLevel === 'yellow' ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300' :
        'bg-gradient-to-r from-green-50 to-green-100 border-green-300'
      }`}>
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-4xl">
                <FaRobot />
              </div>
              <div>
                <h2 className="card-title text-2xl font-bold">
                  AI-Powered Assessment
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <div className={`badge badge-lg ${
                    aiResponse.emergencyLevel === 'red' ? 'badge-error' :
                    aiResponse.emergencyLevel === 'orange' ? 'badge-warning' :
                    aiResponse.emergencyLevel === 'yellow' ? 'badge-info' :
                    'badge-success'
                  }`}>
                    {aiResponse.emergencyLevel.toUpperCase()} LEVEL
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Confidence: </span>
                    <span className={confidenceColor}>{aiResponse.aiConfidence}%</span>
                  </div>
                </div>
              </div>
            </div>
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setShowChat(!showChat)}
            >
              {showChat ? 'Hide Chat' : 'Ask AI'}
            </button>
          </div>

          {/* AI Reasoning */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                <FaLightbulb className="text-primary" />
                AI Assessment
              </h3>
              <p className="bg-white/70 p-4 rounded-lg">{aiResponse.reason}</p>
            </div>

            {/* Immediate Actions */}
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                <FaExclamationTriangle className="text-orange-500" />
                Immediate Actions
              </h3>
              <div className="space-y-2">
                {aiResponse.immediateActions?.map((action, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/70 p-3 rounded-lg">
                    <div className="badge badge-primary">{index + 1}</div>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Warning Signs */}
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                <FaShieldAlt className="text-red-500" />
                Warning Signs - Go to ER if:
              </h3>
              <div className="flex flex-wrap gap-2">
                {aiResponse.warningSigns?.map((sign, index) => (
                  <div key={index} className="badge badge-error badge-lg gap-1">
                    ⚠️ {sign}
                  </div>
                ))}
              </div>
            </div>

            {/* Possible Conditions */}
            {aiResponse.possibleConditions && (
              <div>
                <h3 className="font-bold text-lg mb-2">Possible Considerations:</h3>
                <div className="flex flex-wrap gap-2">
                  {aiResponse.possibleConditions.map((condition, index) => (
                    <span key={index} className="badge badge-outline badge-lg">
                      {condition}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Note: This is not a diagnosis. These are possibilities based on symptoms.
                </p>
              </div>
            )}

            {/* Safety Notes */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-bold text-blue-800 mb-2">AI Safety Notes</h3>
              <p className="text-blue-700">{aiResponse.safetyNotes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Interface */}
      {showChat && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <FaBrain className="text-primary" />
              Ask AI Follow-up Questions
            </h3>
            
            {/* Conversation History */}
            <div className="space-y-4 max-h-60 overflow-y-auto p-2">
              {conversation.map((msg, index) => (
                <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
                  <div className={`chat-bubble ${
                    msg.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'
                  }`}>
                    {msg.content}
                    
                    {msg.warning && (
                      <div className="mt-2 p-2 bg-red-100 text-red-800 rounded text-sm">
                        ⚠️ {msg.warning}
                      </div>
                    )}
                    
                    {msg.action && (
                      <div className="mt-2 text-sm font-semibold">
                        💡 {msg.action}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isThinking && (
                <div className="chat chat-start">
                  <div className="chat-bubble chat-bubble-secondary">
                    <span className="loading loading-dots loading-sm"></span>
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            {/* Question Input */}
            <div className="join w-full mt-4">
              <input
                type="text"
                className="input input-bordered join-item w-full"
                placeholder="Ask AI about your symptoms or treatment..."
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
              />
              <button 
                className="btn btn-primary join-item"
                onClick={handleAskAI}
                disabled={isThinking || !userQuestion.trim()}
              >
                <FaQuestionCircle />
              </button>
            </div>

            {/* Suggested Questions */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "How can I manage pain at home?",
                  "Should I take any medication?",
                  "What are the signs it's getting worse?",
                  "When should I follow up with a doctor?"
                ].map((question, index) => (
                  <button
                    key={index}
                    className="btn btn-xs btn-outline"
                    onClick={() => setUserQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Disclaimer */}
      <div className="card bg-yellow-50 border-yellow-300">
        <div className="card-body">
          <h3 className="card-title text-yellow-800 flex items-center gap-2">
            <FaShieldAlt />
            AI Assistant Disclaimer
          </h3>
          <div className="text-yellow-700 space-y-2">
            <p>⚠️ <strong>This AI assistant is for informational purposes only.</strong></p>
            <p>• AI responses are generated based on patterns, not medical training</p>
            <p>• Accuracy is approximately {aiResponse.aiConfidence}% for this assessment</p>
            <p>• Always consult healthcare professionals for medical advice</p>
            <p>• In emergencies, CALL 911/112/999/000 immediately</p>
            <p>• AI may not consider all individual factors or rare conditions</p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <FaCheckCircle className="text-green-500" />
            Last AI analysis: {new Date(aiResponse.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResultPanel;