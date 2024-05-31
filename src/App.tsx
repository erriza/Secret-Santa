import { useEffect, useState } from 'react';
import familyData from '../data/families';
import { Family } from './../types';
import generateSecretSanta from './utils/generateSecretSanta';
import './App.css';
import axios from 'axios';
import { apiBaseUrl } from './constants';
import familyService from './services/families';
import FamilyFormComponent from './components/formComponent';
import FamilyListComponent from './components/familyListcomponent';
import SecretSantaResultsComponent from './components/secretSantaResultsComponent';

function App() {

  /**
   * State to store the list of families
   * State to store the generated Secret Santa pairings
   * State to store any error that occurs during pairing generation
   */
  const [families, setFamilies] = useState<Family[]>([]);
  const [pairings, setPairings] = useState<Record<string, string>>({});
  const [pairingError, setPairingError] = useState<string | null>(null);

  /**
   * Perform a simple ping to the backend server
   * Fetch initial families on component mount
   * Set initial families from local data (for development/testing)
   */
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchFamilies = async () => {
      const families = await familyService.getAllFamilies();
      setFamilies(families)
    }
    void fetchFamilies();
    setFamilies(familyData);
  }, []);

  // function to generate Secret Santa pairings
  const generatePairings = () => {
    const currentYear = new Date().getFullYear();
    const pairingHistory = {}
    const [newPairings, error] = generateSecretSanta(families, pairingHistory, currentYear);
    setPairings(newPairings);
    setPairingError(error);
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      
      <h1 className='text-4xl font-bold mb-8 flex items-center justify-center gap-4'>
        <GiftIcon />
          Secret Santa
        <GiftIcon />
      </h1>
      
      <FamilyFormComponent
        families={families}
        setFamilies={setFamilies}
      />

      <h2 className='text-2xl font-semibold mb-4'>Family members:</h2>
      <FamilyListComponent
        families={families}
      />

      <SecretSantaResultsComponent
        pairings={pairings} 
        pairingError={pairingError} 
        generatePairings={generatePairings} 
        families={families} 
      />

    </div>
  );
}

export default App;

function GiftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: '24px', height: '24px', color: 'green', fill: 'none' }}
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  )
}