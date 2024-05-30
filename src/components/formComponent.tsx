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
        <div className="mb-8 w-full max-w-md">
        <form onSubmit={addFamilyMember} className="bg-white text-gray-900 rounded-lg p-4 gap-3">
          <div className="grid gap-6">
            <div>
              <input
                type="text"
                id="familyName"
                value={newFamilyName}
                onChange={(e) => setNewFamilyName(e.target.value)}
                className="bg-slate-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-100 dark:border-slate-100 dark:placeholder-slate-500 dark:text-slate-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Family Name"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="memberName"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="bg-slate-100 border border-gray-500 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-100 dark:border-slate-100 dark:placeholder-slate-500 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Member Name"
                required
              />
              <button type="submit" className="w-full bg-green-600 text-white my-3">Add new family Member</button>
            </div>
          </div>
        </form>
        </div>
    )
}

export default FamilyFormComponent;
