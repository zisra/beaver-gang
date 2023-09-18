export function showView(view: string) {
	const viewElements = document.querySelectorAll(
		'[data-view]'
	) as NodeListOf<HTMLElement>;
	for (const viewElement of viewElements) {
		viewElement.style.display = 'none';
	}

	const viewElement = document.querySelector(
		`[data-view="${view}"]`
	) as HTMLElement;
	if (viewElement) {
		viewElement.style.display = 'block';
	} else {
		console.error(`View ${view} not found`);
	}
}

export function goTo(path: string) {
	window.location.hash = path;
}
