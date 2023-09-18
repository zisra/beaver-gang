import './index.css';
import {
	defineRoute,
	defineErrorRoute,
	defineNotFoundRoute,
} from './lib/router';
import { showView, goTo } from './lib/views';
import { ActionListener } from './lib/actionListener';

const actionListener = new ActionListener(document);

actionListener.on('newGame', 'click', () => {
	goTo('/newGame');
});

actionListener.on('viewHistory', 'click', () => {
	goTo('/history');
});

//Routes
defineRoute('/', showView);
defineRoute('/newGame', showView);
defineRoute('/history', showView);

// Error routes
defineErrorRoute(() => {
	showView('/error');
});

defineNotFoundRoute(() => {
	showView('/notFound');
});
