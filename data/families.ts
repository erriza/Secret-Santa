import { Family } from "../types";

const exampleFamilyData : Family[] = [
    {
      name: "The Smiths",
      members: [
        { name: "John Smith", familyId: 1 },
        { name: "Jane Smith", familyId: 1 }, 
        { name: "Emily Smith", familyId: 1 }, 
        { name: "Pedro Smith", familyId: 1 },
      ],
    },
    {
      name: "The Jones",
      members: [
        { name: "David Jones", familyId: 2 },
        { name: "Pedro Jones", familyId: 2 },
      ],
    },
    {
      name: "The Millers",
      members: [
        { name: "Robert Miller", familyId: 3 },
        { name: "Susan Miller", familyId: 3 },
        { name: "Tom Miller", familyId: 3 },
        { name: "Lisa Miller", familyId: 3 }, 
      ],
    },
    // ... Add more families 
  ];

  export default exampleFamilyData;