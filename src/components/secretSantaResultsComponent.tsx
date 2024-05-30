import { Family } from "../../types";

interface Props {
    pairings: Record<string, string>;
    pairingError: string | null;
    generatePairings: () => void;
    families: Family[];
}
const SecretSantaResultsComponent = ({ pairings, pairingError, generatePairings, families }: Props) => {
    
    return (
        <div className="">
            <button onClick={generatePairings} disabled={families.length < 2} className="mt-8 bg-green-600 text-white">Generate Secret Santa</button>
            {pairingError && <p style={{ color: 'red' }}>{pairingError}</p>}
            
            {Object.entries(pairings).map(([giver, receiver]) => (
                <ol key={giver} className="my-2 max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                    <div className="flex justify-between">
                        <GiftIcon/>
                            <strong>{giver}</strong> gives to <strong>{receiver}</strong> 
                        <GiftIcon/>
                    </div>
                </ol>
            ))}
        </div>
    )
}

export default SecretSantaResultsComponent;


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