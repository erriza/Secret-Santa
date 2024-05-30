import { useState } from "react";
import { Family, FamilyMember } from "../../types";

interface Props {
    families: Family[];
    setFamilies: React.Dispatch<React.SetStateAction<Family[]>>;
}

const FamilyFormComponent = ({ families, setFamilies }: Props) => {
    const [newFamilyName, setNewFamilyName] = useState('');
    const [newMemberName, setNewMemberName] = useState('');

    const addFamilyMember = (event: React.SyntheticEvent) => {
        event.preventDefault();
    
        const newMember: FamilyMember = {
          name: newMemberName,
          familyId: families.findIndex(f => f.name === newFamilyName) + 1
          // familyId: families.length > 0 ? Math.max(...families.map(f => f.members.length > 0 ? Math.max(...f.members.map(m => m.familyId)) : 0)) + 1 : 1
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

    return (
        <>
        <form onSubmit={addFamilyMember} className="form">
          <div>
            <label htmlFor="familyName">Family Name:</label>
            <input
              type="text"
              id="familyName"
              value={newFamilyName}
              onChange={(e) => setNewFamilyName(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label htmlFor="memberName">Member Name:</label>
            <input
              type="text"
              id="memberName"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="input"
            />
            <button type="submit" className="submit-button">Add new family Member</button>
          </div>
        </form>
        </>
    )
}

export default FamilyFormComponent;