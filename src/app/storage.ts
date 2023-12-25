import { Match } from '@/app/types';

function encode(obj: Match[]) {
	const string = JSON.stringify(obj);
	return btoa(string);
}

function decode(str: string) {
	const string = atob(str);
	if (!string) throw new Error('Error decoding string');
	return JSON.parse(string);
}

export function addMatch(value: Match) {
	const localValue = localStorage.getItem('matches');

	if (!localValue) {
		return localStorage.setItem('matches', encode([value]));
	}

	const decodedLocalValue = decode(localValue);

	localStorage.setItem('matches', encode([...decodedLocalValue, value]));
}

export function getMatches() {
	const localValue = localStorage.getItem('matches');

	if (!localValue) {
		localStorage.setItem('matches', encode([]));
		return [];
	}

	return decode(localValue);
}
