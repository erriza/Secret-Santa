import { Family } from "../../types"
import familyService from "../services/families";

interface Props {
  families: Family[];
  setFamilies: React.Dispatch<React.SetStateAction<Family[]>>;
}
const FamilyListComponent = ({ families, setFamilies }: Props) => {

  const handleRemoveMember = async (familyId: string, memberId: string) => { // familyId is now a string
    try {
      await familyService.removeMember(familyId, memberId); 
      const updatedFamilies = await familyService.getAllFamilies(); 
      setFamilies(updatedFamilies); 
    } catch (error) {
      // Handle error
      console.error("Error removing member:", error);
    }
  };
  
  console.log('data', families)
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl items-stretch p-3">
        {families.map((family) => (
          <div key={family.name} className="bg-gray-100 text-gray-900 shadow-md flex flex-col p-4 rounded-md">
            <div className="border-b pb-2">
              <div className="flex items-center justify-between">
                <h3 className="">{family.name}</h3>
                <GiftIcon />
              </div>
            </div>
            <ul className="p-4">
              {family.members.map((member) => (
                <li key={member._id.toString()}>
                  {member.name}
                  <button onClick={() => handleRemoveMember(family._id.toString(), member._id.toString())} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full m-1">
                    <svg className="h-2 w-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyListComponent

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
      style={{ width: '24px', height: '24px', color: 'grey', fill: 'none' }}
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  )
}