## Secret Santa Generator

This repository contains a React application for generating Secret Santa pairings. It utilizes the Hopcroft-Karp algorithm to efficiently find valid pairings while considering restrictions on family members and past pairings.

### Requirements

* Node.js and npm
* A browser (Chrome, Firefox, Safari, etc.)

### Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/secret-santa-react.git

2. Navigate to the project directory:   
   cd secret-santa-react

3. Install dependencies:

   npm install

## Running the Application

  1.  Start the development server:
  
   npm start

  2. Open your browser and visit http://localhost:5173/ to access the application.
  
  ### Usage

  - Add Families and Members:
        In the application, you can add new families and members using the provided form.

        Enter the family name and the name of each member.

  - Generate Pairings:
        Once you have added all the families and members, click the "Generate Secret Santa" button.

        The application will generate pairings based on the following criteria:

            Members from different families are paired.

            No two members are paired together repeatedly within the last three years.

  -View Pairings:
        The generated pairings will be displayed on the screen, showing who gives a gift to whom.

  ### Testing
  To run unit tests for the application:
  -Run the following command in your terminal:
          
    npm run test

  ### Features
    Efficient Pairing Generation: Utilizes the Hopcroft-Karp algorithm for efficient pairing generation.

    Family Restrictions: Prevents pairing members from the same family.

    Past Pairing History: Prevents repeated pairings within the last three years.

    User-Friendly Interface: Provides a simple and intuitive interface for adding families, members, and generating pairings.

  ### Contribution

Feel free to contribute to the project by reporting issues, submitting pull requests, or suggesting new features.

  ### Acknowledgements

  - [Hopcroft-Karp Algorithm](https://en.wikipedia.org/wiki/Hopcroft%E2%80%93Karp_algorithm) `for efficient bipartite matching`.

  - React for building the user interface.

  - Jest for unit testing.

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
# Secret-Santa
