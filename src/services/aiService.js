import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || 'demo-key');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Emergency knowledge base
const MEDICAL_KNOWLEDGE = `
CRITICAL EMERGENCY SYMPTOMS (RED LEVEL - CALL 911/112/999/000 immediately):
1. Chest pain or pressure (especially radiating to left arm/jaw) - Possible heart attack
2. Difficulty breathing or choking - Could be heart failure, pulmonary embolism
3. Sudden severe headache (worst ever) - Possible stroke, aneurysm
4. Unconsciousness or unresponsiveness
5. Severe bleeding that won't stop
6. Signs of stroke: FAST - Face drooping, Arm weakness, Speech difficulty, Time to call emergency
7. Severe allergic reaction (anaphylaxis) - Difficulty breathing, swelling
8. Suicidal thoughts or severe mental crisis

URGENT SYMPTOMS (ORANGE LEVEL - Go to ER within 2 hours):
1. High fever (above 104°F/40°C) with confusion
2. Severe abdominal pain
3. Broken bones with deformity
4. Deep cuts needing stitches
5. Head injury with loss of consciousness (even briefly)
6. Severe burns (large area or deep)
7. Poison ingestion
8. Severe dehydration (no urine for 8+ hours, dizziness)

CLINIC SYMPTOMS (YELLOW LEVEL - See doctor within 24 hours):
1. Fever above 100.4°F/38°C
2. Persistent vomiting/diarrhea
3. Moderate pain or injury
4. Suspected infection (redness, swelling, warmth)
5. Worsening chronic condition
6. Rash with fever
7. Ear pain, sinus pain

HOME CARE (GREEN LEVEL - Self-care):
1. Common cold symptoms
2. Minor cuts/scrapes
3. Mild headaches
4. Sore throat without fever
5. Minor sprains
6. Mild allergy symptoms
7. Heartburn/indigestion

IMPORTANT RULES:
1. When in doubt, always recommend higher urgency level
2. If multiple symptoms, follow the most serious one
3. Consider age: Children and elderly need more urgent care
4. Consider pregnancy: Always be more cautious
5. Mental health emergencies are as serious as physical
`;

export const analyzeSymptomsWithAI = async (symptoms, userAge, userPregnant = false, userChronicConditions = []) => {
  try {
    // Fallback if no API key (for demo)
    if (!process.env.REACT_APP_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY === 'demo-key') {
      return getMockAIResponse(symptoms);
    }

    const symptomText = symptoms.map(s => s.name).join(', ');
    
    const prompt = `
${MEDICAL_KNOWLEDGE}

SYMPTOM ANALYSIS REQUEST:
Patient symptoms: ${symptomText}
Patient age: ${userAge || 'Not specified'}
Pregnant: ${userPregnant ? 'Yes' : 'No'}
Chronic conditions: ${userChronicConditions.join(', ') || 'None'}

ANALYZE THESE SYMPTOMS AND PROVIDE:
1. EMERGENCY LEVEL (RED/ORANGE/YELLOW/GREEN):
   - RED: Call emergency immediately (life-threatening)
   - ORANGE: Go to Emergency Room within 2 hours (urgent)
   - YELLOW: Visit clinic/doctor within 24 hours (needs medical attention)
   - GREEN: Home care (self-treatable)

2. REASON FOR THIS LEVEL: Brief explanation why

3. IMMEDIATE ACTIONS: 3-5 specific steps to take right now

4. WHAT TO WATCH FOR: Warning signs that mean go to ER

5. POSSIBLE CONDITIONS: What this could be (not diagnosis, just possibilities)

6. SAFETY NOTES: Important precautions

FORMAT YOUR RESPONSE AS VALID JSON:
{
  "emergencyLevel": "red|orange|yellow|green",
  "reason": "string",
  "immediateActions": ["action1", "action2"],
  "warningSigns": ["sign1", "sign2"],
  "possibleConditions": ["condition1", "condition2"],
  "safetyNotes": "string",
  "aiConfidence": 0-100
}

Important: BE CONSERVATIVE. When in doubt, choose higher urgency. Better safe than sorry.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response (Gemini sometimes adds markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const aiResponse = JSON.parse(jsonMatch[0]);
      return {
        ...aiResponse,
        rawResponse: text,
        timestamp: new Date().toISOString()
      };
    }
    
    // Fallback to mock response if JSON parsing fails
    return getMockAIResponse(symptoms);
    
  } catch (error) {
    console.error('AI Analysis Error:', error);
    return getMockAIResponse(symptoms);
  }
};

// Mock response for demo/fallback
const getMockAIResponse = (symptoms) => {
  const symptomNames = symptoms.map(s => s.name).join(', ');
  const hasRed = symptoms.some(s => s.level === 'red');
  const hasOrange = symptoms.some(s => s.level === 'orange');
  
  let emergencyLevel = 'green';
  if (hasRed) emergencyLevel = 'red';
  else if (hasOrange) emergencyLevel = 'orange';
  else if (symptoms.some(s => s.level === 'yellow')) emergencyLevel = 'yellow';
  
  const responses = {
    red: {
      emergencyLevel: 'red',
      reason: `These symptoms (${symptomNames}) indicate a potential life-threatening emergency that requires immediate medical attention.`,
      immediateActions: [
        "Call emergency services immediately",
        "Do not drive yourself to the hospital",
        "Stay calm and keep the person still",
        "Prepare to give location and symptoms to dispatcher"
      ],
      warningSigns: [
        "Worsening pain or difficulty breathing",
        "Loss of consciousness",
        "Severe bleeding that won't stop",
        "Blue lips or fingernails"
      ],
      possibleConditions: ["Heart attack", "Stroke", "Severe trauma", "Respiratory failure"],
      safetyNotes: "Do not give anything by mouth. Keep person lying down unless they need to vomit.",
      aiConfidence: 85
    },
    orange: {
      emergencyLevel: 'orange',
      reason: `These symptoms (${symptomNames}) require urgent medical evaluation within 2 hours but are not immediately life-threatening.`,
      immediateActions: [
        "Go to the nearest emergency room",
        "Have someone drive you if possible",
        "Bring ID, insurance, and medications list",
        "Do not eat or drink in case surgery is needed"
      ],
      warningSigns: [
        "Symptoms worsen suddenly",
        "Fever rises above 104°F/40°C",
        "Unable to keep fluids down",
        "Severe pain develops"
      ],
      possibleConditions: ["Appendicitis", "Kidney infection", "Fracture", "Severe infection"],
      safetyNotes: "Monitor closely while traveling to ER. Use seatbelt and keep comfortable.",
      aiConfidence: 80
    },
    yellow: {
      emergencyLevel: 'yellow',
      reason: `These symptoms (${symptomNames}) should be evaluated by a medical professional within 24 hours.`,
      immediateActions: [
        "Schedule appointment with doctor or urgent care",
        "Rest and stay hydrated",
        "Take over-the-counter medications as directed",
        "Monitor temperature and symptoms"
      ],
      warningSigns: [
        "Symptoms not improving in 24 hours",
        "New symptoms develop",
        "Fever persists over 100.4°F/38°C",
        "Pain becomes severe"
      ],
      possibleConditions: ["Infection", "Viral illness", "Minor injury", "Allergic reaction"],
      safetyNotes: "If symptoms worsen, go to ER immediately. Follow up with primary doctor.",
      aiConfidence: 75
    },
    green: {
      emergencyLevel: 'green',
      reason: `These symptoms (${symptomNames}) appear to be mild and can typically be managed at home.`,
      immediateActions: [
        "Rest and get plenty of sleep",
        "Drink clear fluids to stay hydrated",
        "Use over-the-counter remedies as needed",
        "Monitor for any changes"
      ],
      warningSigns: [
        "Symptoms last more than 7-10 days",
        "Fever develops",
        "Symptoms significantly worsen",
        "Difficulty breathing occurs"
      ],
      possibleConditions: ["Common cold", "Seasonal allergies", "Muscle strain", "Indigestion"],
      safetyNotes: "If symptoms persist or worsen, contact your healthcare provider.",
      aiConfidence: 70
    }
  };
  
  return {
    ...responses[emergencyLevel],
    rawResponse: "Mock AI response - using local symptom database",
    timestamp: new Date().toISOString()
  };
};

// AI Chat for follow-up questions
export const askAIFollowup = async (question, conversationHistory = []) => {
  try {
    const prompt = `
You are an emergency medical assistant. Answer the user's question clearly and safely.
Previous conversation: ${JSON.stringify(conversationHistory.slice(-3))}
User question: ${question}

Guidelines:
1. Be clear and concise
2. When in doubt, recommend consulting a doctor
3. Do not give specific medical diagnoses
4. Focus on safety and when to seek help
5. If emergency symptoms mentioned, advise calling emergency services
6. Keep response under 150 words

Response format:
{
  "answer": "Your answer here",
  "safetyWarning": "If any safety warning needed, otherwise empty string",
  "suggestedAction": "What to do next"
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return {
      answer: "I'm not sure about that. Please consult with a healthcare provider for accurate information.",
      safetyWarning: "If you're experiencing severe symptoms, call emergency services immediately.",
      suggestedAction: "Contact your doctor or local clinic"
    };
    
  } catch (error) {
    return {
      answer: "Unable to process your question at this time. Please contact emergency services if this is urgent.",
      safetyWarning: "If symptoms are severe, don't wait - call emergency services.",
      suggestedAction: "Try again or consult a healthcare professional"
    };
  }
};