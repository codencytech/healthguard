export const symptomsList = [
  // RED LEVEL - IMMEDIATE 911
  { id: 1, name: "Chest pain or pressure", level: "red", description: "Severe chest discomfort" },
  { id: 2, name: "Difficulty breathing", level: "red", description: "Unable to catch breath" },
  { id: 3, name: "Severe bleeding", level: "red", description: "Uncontrolled bleeding" },
  { id: 4, name: "Unconsciousness", level: "red", description: "Not responding or waking up" },
  { id: 5, name: "Sudden confusion", level: "red", description: "Disoriented or strange behavior" },
  
  // ORANGE LEVEL - EMERGENCY ROOM
  { id: 6, name: "High fever (above 104°F)", level: "orange", description: "Very high temperature" },
  { id: 7, name: "Broken bone", level: "orange", description: "Visible deformity or unable to move limb" },
  { id: 8, name: "Severe burn", level: "orange", description: "Large or deep burn" },
  { id: 9, name: "Poison ingestion", level: "orange", description: "Swallowed something toxic" },
  { id: 10, name: "Severe allergic reaction", level: "orange", description: "Difficulty breathing with rash" },
  
  // YELLOW LEVEL - URGENT CARE
  { id: 11, name: "Moderate fever", level: "yellow", description: "100-104°F temperature" },
  { id: 12, name: "Persistent vomiting", level: "yellow", description: "Unable to keep liquids down" },
  { id: 13, name: "Sprain or strain", level: "yellow", description: "Painful but no deformity" },
  { id: 14, name: "Rash with fever", level: "yellow", description: "Skin rash with temperature" },
  
  // GREEN LEVEL - HOME CARE
  { id: 15, name: "Common cold", level: "green", description: "Runny nose, mild cough" },
  { id: 16, name: "Minor cut", level: "green", description: "Small, clean wound" },
  { id: 17, name: "Headache", level: "green", description: "Mild to moderate headache" },
  { id: 18, name: "Sore throat", level: "green", description: "Pain when swallowing" },
  { id: 19, name: "Mild allergy", level: "green", description: "Itchy eyes or sneezing" }
];

export const getEmergencyLevel = (selectedSymptoms) => {
  const levels = selectedSymptoms.map(s => s.level);
  if (levels.includes("red")) return "red";
  if (levels.includes("orange")) return "orange";
  if (levels.includes("yellow")) return "yellow";
  return "green";
};

export const getEmergencyInstructions = (level, countryCode) => {
  const instructions = {
    red: {
      title: "EMERGENCY - CALL NOW",
      color: "bg-red-600",
      textColor: "text-white",
      action: "Call emergency services immediately",
      steps: [
        "Stay calm and call the emergency number",
        "Give your exact location",
        "Describe the symptoms clearly",
        "Follow dispatcher instructions",
        "Stay with the person until help arrives"
      ]
    },
    orange: {
      title: "URGENT - GO TO ER",
      color: "bg-orange-500",
      textColor: "text-white",
      action: "Go to Emergency Room within 2 hours",
      steps: [
        "Go to nearest emergency room",
        "Bring identification and insurance",
        "Don't eat or drink (in case surgery needed)",
        "Have someone drive you if possible"
      ]
    },
    yellow: {
      title: "URGENT CARE NEEDED",
      color: "bg-yellow-500",
      textColor: "text-gray-800",
      action: "Visit urgent care clinic within 24 hours",
      steps: [
        "Schedule urgent care appointment",
        "Monitor symptoms for changes",
        "Rest and stay hydrated",
        "Call if symptoms worsen"
      ]
    },
    green: {
      title: "HOME CARE",
      color: "bg-green-500",
      textColor: "text-white",
      action: "Self-care at home",
      steps: [
        "Rest and drink plenty of fluids",
        "Use over-the-counter medications as needed",
        "Monitor for worsening symptoms",
        "Call doctor if no improvement in 2-3 days"
      ]
    }
  };
  
  return instructions[level] || instructions.green;
};