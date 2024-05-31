import { useState } from "react";
import { Family } from "../../types";
// import { Types } from "mongoose";
import familyService from "../services/families";


interface Props {
    families: Family[];
    setFamilies: React.Dispatch<React.SetStateAction<Family[]>>;
}

const FamilyFormComponent = ({ families, setFamilies }: Props) => {
    /**
     * State to store the new family name
     * State to store the new member name
     */
    const [newFamilyName, setNewFamilyName] = useState('');
    const [newMemberName, setNewMemberName] = useState('');

    /**
     * Handles form submission to add a new family member.
     * Creates a new family member object and adds it to the existing family or creates a new family if the family name doesn't exist.
     * Updates the families state.
     * @param event The form submission event.
     */
    // const addFamilyMember = (event: React.SyntheticEvent) => {
    //     event.preventDefault();
    
    //     const newMember: FamilyMember = {
    //       name: newMemberName,
    //       familyId: families.findIndex(f => f.name === newFamilyName) + 1,
    //       _id: new Types.ObjectId()

    //       // familyId: families.length > 0 ? Math.max(...families.map(f => f.members.length > 0 ? Math.max(...f.members.map(m => m.familyId)) : 0)) + 1 : 1
    //     };
    
    //     const existingFamilyIdx = families.findIndex(f => f.name === newFamilyName);
    
    //     if (existingFamilyIdx !== -1) {
    //       const updatedFamilies = [...families];
    //       updatedFamilies[existingFamilyIdx].members.push(newMember);
    //       setFamilies(updatedFamilies);
    //     } else {
    //       const newFamily: Family = {
    //         name: newFamilyName,
    //         members: [newMember],
    //         familyId: families.findIndex(f => f.name === newFamilyName) + 1,
    //         _id: new Types.ObjectId()
    //       };
    //       setFamilies([...families, newFamily]);
    //     }
    
    //     setNewFamilyName('');
    //     setNewMemberName('');
    //   };

        /**
     * Handles form submission to add a new family member.
     * Creates a new family member object and adds it to the existing family or creates a new family if the family name doesn't exist.
     * Updates the families state.
     * @param event The form submission event.
     */
        const addFamilyMember = async (event: React.SyntheticEvent) => {
          event.preventDefault();
      
          try {
            const newFamilyOrMember = await familyService.addFamilyOrMember({
              familyName: newFamilyName,
              memberName: newMemberName
            });
  
            if (newFamilyOrMember.message === 'Family and member created successfully') {
              // New family created
              setFamilies([...families, newFamilyOrMember.family]);
            } else if (newFamilyOrMember.message === 'Member added successfully') {
              // Member added to existing family
              setFamilies(families => families.map(f => f._id.toString() === newFamilyOrMember.family._id.toString() ? newFamilyOrMember.family : f));
            }
  
            setNewFamilyName('');
            setNewMemberName('');
          } catch (error) {
            // Handle error
            console.error("Error creating family or adding member:", error);
          }
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
