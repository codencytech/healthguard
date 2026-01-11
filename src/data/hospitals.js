const hospitalDatabase = {
    US: {
        CA: [
            {
                id: 1,
                name: 'Los Angeles Medical Center',
                address: '123 Health St, Los Angeles, CA 90001',
                phone: '(213) 555-0123',
                distance: '2.5 miles',
                emergency: true,
                specialties: ['Cardiology', 'Emergency', 'Trauma'],
                rating: 4.8
            },
            {
                id: 2,
                name: 'San Francisco General Hospital',
                address: '456 Care Ave, San Francisco, CA 94102',
                phone: '(415) 555-0234',
                distance: '5.1 miles',
                emergency: true,
                specialties: ['Neurology', 'Surgery', 'Pediatrics'],
                rating: 4.6
            },
            {
                id: 3,
                name: 'San Diego Memorial Hospital',
                address: '789 Wellness Blvd, San Diego, CA 92101',
                phone: '(619) 555-0345',
                distance: '3.7 miles',
                emergency: true,
                specialties: ['Oncology', 'Orthopedics', 'ICU'],
                rating: 4.7
            }
        ],
        TX: [
            {
                id: 4,
                name: 'Houston Medical Center',
                address: '101 Recovery Rd, Houston, TX 77001',
                phone: '(713) 555-0456',
                distance: '1.8 miles',
                emergency: true,
                specialties: ['Cardiac Surgery', 'Burn Center', 'ICU'],
                rating: 4.9
            }
        ]
    },
    IN: {
        DL: [
            {
                id: 5,
                name: 'Delhi Medical Institute',
                address: '12 Healing Marg, Delhi 110001',
                phone: '011-2345-6789',
                distance: '3.2 km',
                emergency: true,
                specialties: ['Cardiology', 'Neurology', 'Trauma'],
                rating: 4.5
            }
        ]
    },
    UK: {
        ENG: [
            {
                id: 6,
                name: 'London Royal Hospital',
                address: '1 Medical Square, London SW1A 1AA',
                phone: '020 7123 4567',
                distance: '1.5 miles',
                emergency: true,
                specialties: ['Emergency', 'Surgery', 'ICU'],
                rating: 4.8
            }
        ]
    }
};

// Function to get hospitals based on location
export function getHospitalsByLocation(country, state) {
    return hospitalDatabase[country]?.[state] || [];
}

// Function to get nearby hospitals
export function getNearbyHospitals(country, state, limit = 5) {
    const hospitals = getHospitalsByLocation(country, state);
    
    // If no hospitals for that state, return default ones
    if (hospitals.length === 0) {
        return [
            {
                id: 999,
                name: 'City General Hospital',
                address: '123 Main St, City Center',
                phone: '(555) 123-4567',
                distance: '3.0 miles',
                emergency: true,
                specialties: ['Emergency', 'General Medicine'],
                rating: 4.5
            },
            {
                id: 998,
                name: 'Community Medical Center',
                address: '456 Park Ave, Downtown',
                phone: '(555) 987-6543',
                distance: '4.2 miles',
                emergency: true,
                specialties: ['Pediatrics', 'Urgent Care'],
                rating: 4.3
            }
        ].slice(0, limit);
    }
    
    return hospitals.slice(0, limit);
}

export default hospitalDatabase;