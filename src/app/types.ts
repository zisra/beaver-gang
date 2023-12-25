export type Player = {
	name: string;
	totalPoints: number;
};

export type Round = {
	points: {
		name: string;
		points: number;
	}[];
};

export type Match = {
	date: Date;
	players: Player[];
	rounds: Round[];
};
