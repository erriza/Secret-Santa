import { useEffect, useState } from 'react';
import familyData from '../data/families';
import { Family, FamilyMember } from './../types';
import generateSecretSanta from './utils/generateSecretSanta';
import './App.css';

function App() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [pairings, setPairings] = useState<Record<string, string>>({});
  const [pairingError, setPairingError] = useState<string | null>(null);

  useEffect(() => {
    console.log('initializing, loading families');
    setFamilies(familyData);
  }, []);

  const addFamilyMember = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newMember: FamilyMember = {
      name: newMemberName,
      familyId: families.length > 0 ? Math.max(...families.map(f => f.members.length > 0 ? Math.max(...f.members.map(m => m.familyId)) : 0)) + 1 : 1
    };

    const existingFamilyIdx = families.findIndex(f => f.name === newFamilyName);

    if (existingFamilyIdx !== -1) {
      const updatedFamilies = [...families];
      updatedFamilies[existingFamilyIdx].members.push(newMember);
      setFamilies(updatedFamilies);
    } else {
      const newFamily: Family = {
        name: newFamilyName,
        members: [newMember]
      };
      setFamilies([...families, newFamily]);
    }

    setNewFamilyName('');
    setNewMemberName('');
  };


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
      <form onSubmit={addFamilyMember}>
        <div>
          <label htmlFor="familyName">Family Name:</label>
          <input
            type="text"
            id="familyName"
            value={newFamilyName}
            onChange={(e) => setNewFamilyName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="memberName">Member Name:</label>
          <input
            type="text"
            id="memberName"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
          />
          <button type="submit">Add new family Member</button>
        </div>
      </form>
      <h2>Family members:</h2>
      {families.map((family) => (
        <div key={family.name}>
          <h3>{family.name}</h3>
          <ul>
            {family.members.map((member) => (
              <li key={member.name}>{member.name}</li>
            ))}
          </ul>
        </div>
      ))}

      <button onClick={generatePairings} disabled={families.length < 2}>Generate Secret Santa</button>

      {pairingError && <p style={{ color: 'red' }}>{pairingError}</p>}

      {Object.entries(pairings).map(([giver, receiver]) => (
        <li key={giver}>
          {giver} gives to {receiver}
        </li>
      ))}
    </>
  );
}

export default App;
