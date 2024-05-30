import { Family } from "../../types";

interface Props {
    pairings: Record<string, string>;
    pairingError: string | null;
    generatePairings: () => void;
    families: Family[];
}
const SecretSantaResultsComponent = ({ pairings, pairingError, generatePairings, families }: Props) => {
    
    return (
        <>
            <button onClick={generatePairings} disabled={families.length < 2}>Generate Secret Santa</button>
            {pairingError && <p style={{ color: 'red' }}>{pairingError}</p>}
            
            {Object.entries(pairings).map(([giver, receiver]) => (
                <li key={giver}>
                    {giver} gives to {receiver}
                </li>
            ))}
        </>
    )
}

export default SecretSantaResultsComponent;