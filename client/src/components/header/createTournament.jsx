//
// createTournament.jsx
//
// Render the buttons in the header to create/submit a new tournament.
// When the create button is pressed, the app mode is changed to 'Edit'
// where the user can edit tourn name and rules before hitting submit.
//


import React, { PropTypes } from 'react';
import '../../../public/assets/styles/main.css';

const CreateTournament = (props) => {
  const onCancelClick = () => {
    props.changeMode('LoggedIn');
  };

  const onCreateClick = () => {
    props.changeMode('Edit');
  };

  if (props.mode === 'Edit') {
    return (<li className="flexLeft">
      <img
        onClick={onCancelClick}
        className="header-icons"
        src="./assets/img/cancel.png" alt="Cancel New Tournament"
      >
      </img>
      &nbsp;
      <img
        onClick={onCreateClick}
        className="header-icons"
        src="./assets/img/check-mark-32.png" alt="Submit New Tournament"
      >
      </img>
    </li>);
  }

  return (
    <li className="flexLeft">
      <img
        onClick={onCreateClick}
        className="header-icons"
        src="./assets/img/plus.png" alt="Create New Tournament"
      ></img>
    </li>
  );
};

CreateTournament.propTypes = {
  mode: PropTypes.string,
  changeMode: PropTypes.func,
  submitNewTourn: PropTypes.func,
  tournInfo: PropTypes.object,
};

export default CreateTournament;
