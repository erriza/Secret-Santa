import { Family } from "../types";
import { Types } from 'mongoose'; 

const exampleFamilyData : Family[] = [
    {
      name: "The Smiths",
      _id: new Types.ObjectId(), // Add _id
      familyId: '6658dc3348f8c70aaee1cf2e', // Use a string here
      members: [
        { name: "John Smith", familyId: '6658dc3348f8c70aaee1cf2e', _id: new Types.ObjectId() }, // Add _id
        { name: "Jane Smith", familyId: '6658dc3348f8c70aaee1cf2e', _id: new Types.ObjectId() }, 
        { name: "Emily Smith", familyId: '6658dc3348f8c70aaee1cf2e', _id: new Types.ObjectId() }, 
        { name: "Pedro Smith", familyId: '6658dc3348f8c70aaee1cf2e', _id: new Types.ObjectId() },
      ],
    },
    {
      name: "The Jones",
      _id: new Types.ObjectId(), // Add _id
      familyId: '6658dc3348f8c70aaee1cf2f', // Use a string here
      members: [
        { name: "David Jones", familyId: '6658dc3348f8c70aaee1cf2f', _id: new Types.ObjectId() }, // Add _id
        { name: "Pedro Jones", familyId: '6658dc3348f8c70aaee1cf2f', _id: new Types.ObjectId() }, // Add _id
      ],
    },
    {
      name: "The Millers",
      _id: new Types.ObjectId(), // Add _id
      familyId: '6658dc3348f8c70aaee1cf30', // Use a string here
      members: [
        { name: "Robert Miller", familyId: '6658dc3348f8c70aaee1cf30', _id: new Types.ObjectId() }, // Add _id
        { name: "Susan Miller", familyId: '6658dc3348f8c70aaee1cf30', _id: new Types.ObjectId() }, // Add _id
        { name: "Tom Miller", familyId: '6658dc3348f8c70aaee1cf30', _id: new Types.ObjectId() }, // Add _id
        { name: "Lisa Miller", familyId: '6658dc3348f8c70aaee1cf30', _id: new Types.ObjectId() }, 
      ],
    },
  ];

  export default exampleFamilyData;