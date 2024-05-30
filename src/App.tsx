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
  const [families, setFamilies] = useState<Family[]>([]);
  const [pairings, setPairings] = useState<Record<string, string>>({});
  const [pairingError, setPairingError] = useState<string | null>(null);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchFamilies = async () => {
      const families = await familyService.getAllFamilies();
      setFamilies(families)
    }
    void fetchFamilies();
    setFamilies(familyData);
  }, []);

  const generatePairings = () => {
    const currentYear = new Date().getFullYear();
    const pairingHistory = {}
    const [newPairings, error] = generateSecretSanta(families, pairingHistory, currentYear);
    setPairings(newPairings);
    setPairingError(error);
};

  return (
    <>
      <h1>Secret Santa</h1>
      <FamilyFormComponent
        families={families}
        setFamilies={setFamilies}
      />

      <h2>Family members:</h2>
      <FamilyListComponent
        families={families}
      />

      <SecretSantaResultsComponent
        pairings={pairings} 
        pairingError={pairingError} 
        generatePairings={generatePairings} 
        families={families} 
      />

    </>
  );
}

export default App;
