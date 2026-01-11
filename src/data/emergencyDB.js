export const emergencyNumbers = {
  US: {
    country: "United States",
    emergency: "911",
    ambulance: "911",
    police: "911",
    fire: "911",
    poison: "1-800-222-1222",
    mentalHealth: "988",
    coastalEmergency: "911"
  },
  IN: {
    country: "India",
    emergency: "112",
    ambulance: "102",
    police: "100",
    fire: "101",
    poison: "1066",
    mentalHealth: "080-46110007",
    coastalEmergency: "1554"
  },
  UK: {
    country: "United Kingdom",
    emergency: "999",
    ambulance: "999",
    police: "101",
    fire: "999",
    poison: "111",
    mentalHealth: "116123",
    coastalEmergency: "999"
  },
  DE: {
    country: "Germany",
    emergency: "112",
    ambulance: "112",
    police: "110",
    fire: "112",
    poison: "19240",
    mentalHealth: "0800-1110111",
    coastalEmergency: "112"
  },
  AU: {
    country: "Australia",
    emergency: "000",
    ambulance: "000",
    police: "131444",
    fire: "000",
    poison: "131126",
    mentalHealth: "131114",
    coastalEmergency: "000"
  },
  CA: {
    country: "Canada",
    emergency: "911",
    ambulance: "911",
    police: "911",
    fire: "911",
    poison: "1-800-268-9017",
    mentalHealth: "1-833-456-4566",
    coastalEmergency: "911"
  }
};

export const stateSpecific = {
  "US-CA": {
    state: "California",
    additional: {
      mentalHealth: "988",
      earthquake: "911",
      wildfire: "911"
    }
  },
  "US-TX": {
    state: "Texas",
    additional: {
      poison: "1-800-222-1222",
      hurricane: "911"
    }
  },
  "IN-DL": {
    state: "Delhi",
    additional: {
      ambulance: "102",
      womenHelpline: "181"
    }
  },
  "IN-MH": {
    state: "Maharashtra",
    additional: {
      ambulance: "108",
      disaster: "1077"
    }
  },
  "UK-ENG": {
    state: "England",
    additional: {
      nonEmergency: "101",
      coastguard: "999"
    }
  }
};