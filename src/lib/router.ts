import { match } from 'path-to-regexp';

const routes: {
	path: string;
	callback: (path: string, params?: Record<any, any>) => void;
}[] = [];

let errorRoute: () => void;
let notFoundRoute: () => void;

export function defineRoute(
	path: string,
	callback: (path: string, params?: Record<any, any>) => void
) {
	routes.push({
		path,
		callback,
	});
}

export function defineErrorRoute(callback: () => void) {
	errorRoute = callback;
}

export function defineNotFoundRoute(callback: () => void) {
	notFoundRoute = callback;
}

function checkState() {
	const currentPath = decodeURIComponent(
		new URL(document.URL).hash.replace('#', '')
	).split('?')[0];

	if (currentPath === '') {
		window.location.hash = '/';
		return;
	}

	try {
		for (const route of routes) {
			const matchResult = match(route.path, { decode: decodeURIComponent })(
				currentPath
			);
			if (matchResult) {
				route.callback(currentPath, matchResult.params);
				break;
			}
		}
	} catch (err) {
		console.error(err);
		errorRoute();
	}

	if (!routes.some((route) => match(route.path)(currentPath))) {
		notFoundRoute();
	}
}

window.addEventListener('hashchange', checkState);
window.addEventListener('load', checkState);
