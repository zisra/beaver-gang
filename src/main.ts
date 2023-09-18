import './index.css';
import { ActionListener } from './actionListener';

const actionListener = new ActionListener(document);

actionListener.on(
	{
		name: 'viewHistory',
		event: 'click',
	},
	() => {
		console.log('History clicked');
	}
);

const newGameListener = actionListener.on(
	{
		name: 'newGame',
		event: 'click',
	},
	() => {
		console.log('New game clicked');
	}
);

newGameListener.refresh();
