import { Family } from "../../types"

interface Props {
    families: Family[];
}
const FamilyListComponent = ({ families }: Props) => {
    return (
        <>
        <div className="families-container">
        {families.map((family) => (
          <div key={family.name} className="family-container">
            <h3 className="family-name">{family.name}</h3> 
            <ul className="family-members">
              {family.members.map((member) => (
                <li key={member.name}>{member.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
        </>
    )
}

export default FamilyListComponent