import '../index.css';
import {
	defineRoute,
	defineErrorRoute,
	defineNotFoundRoute,
} from '../lib/router';
import { showView, goTo } from '../lib/views';
import { ActionListener } from '../lib/actionListener';
import { Player, Round } from './types';
import { addMatch, getMatches } from './storage';
import { onValueChange } from '../lib/trackVariable';

const actionListener = new ActionListener(document);

const players = onValueChange<Player[]>([], () => {
	console.log([...players]);
});

const rounds = onValueChange<Round[]>([], () => {
	console.log([...rounds]);
});

actionListener.on('newGame', 'click', () => {
	goTo('/newGame');
});

actionListener.on('viewHistory', 'click', () => {
	goTo('/history');
});

actionListener.on('addPlayer', 'click', () => {
	const name = prompt('Player name');

	if (!name) {
		return;
	}

	if (players.find((p) => p.name === name)) {
		return alert('Duplicate player name');
	}

	players.push({
		name,
		totalPoints: 0,
	});
});

actionListener.on('addRound', 'click', () => {
	if (players.length === 0) return;

	rounds.push({
		points: players.map((p) => {
			return {
				name: p.name,
				points: 0,
			};
		}),
	});

	// Add missing players to previous rounds
	rounds.forEach((round) => {
		players.forEach((player) => {
			if (!round.points.find((score) => score.name === player.name)) {
				round.points.push({
					name: player.name,
					points: 0,
				});
			}
		});
	});
});

actionListener.on('deleteRound', 'click', (event) => {
	const index = (
		event.target as HTMLDivElement
	).parentElement?.parentElement?.getAttribute('data-index');

	if (!index) return;

	delete rounds[parseInt(index)];
});

actionListener.on('saveGame', 'click', () => {
	addMatch({
		date: new Date(),
		players: [...players],
		rounds,
	});
	goTo('/history');
});

//Routes
defineRoute('/', showView);
defineRoute('/newGame', showView);
defineRoute('/history', (e) => {
	showView(e);
});

// Error routes
defineErrorRoute(() => {
	showView('/error');
});

defineNotFoundRoute(() => {
	showView('/notFound');
});
