import React from "react";
import PlayerImage from "./PlayerImage";

const PlayerShowcase = ({ listPlayers }) => {
	return (
		<div className='grid grid-cols-2 mx-auto text-center player-grid'>
			{listPlayers.map((player, index) => {
				const names = player.name.split(" ").map((name) => name.toLowerCase());
				return <PlayerImage key={index} names={names} index={index} />;
			})}
		</div>
	);
};

export default PlayerShowcase;
