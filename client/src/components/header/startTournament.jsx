//
// startTournament.jsx
//
// Render the start tournament button if the
// tournament is still in registration mode and is
// allowing new players to join.
//


import React, { PropTypes } from 'react';
import '../../../public/assets/styles/main.css';

const StartTournament = (props) => {
  const initTourn = () => (
		props.startTourn(props.tournId)
	);

  return (props.invite &&
          props.tournOrganizer === props.userId ?
    <button onClick={initTourn}>
			Start Tournament
    </button> : null
	);
};

StartTournament.propTypes = {
  tournId: PropTypes.string,
  startTourn: PropTypes.func,
  tournOrganizer: PropTypes.string,
  userId: PropTypes.string,
  invite: PropTypes.bool,
};

export default StartTournament;
