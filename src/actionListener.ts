export class ActionListener {
	private watchedElements: Set<Element>;
	private container: Document | Element;

	constructor(container: Document | HTMLElement) {
		this.container = container;
		this.watchedElements = new Set();

		this.refresh();
	}

	private cleanup(
		action: { name: string; event: string },
		callback: () => void
	) {
		Array.from(this.watchedElements).forEach((element) => {
			const elementAction = element.getAttribute('data-action');
			if (elementAction === action.name) {
				element.removeEventListener(action.event, callback);
			}
		});
	}

	refresh() {
		this.watchedElements.clear();
		const elements = this.container.querySelectorAll('[data-action]');

		elements.forEach((element) => {
			const action = element.getAttribute('data-action');
			if (action) {
				this.watchedElements.add(element);
			}
		});
	}

	on(action: { name: string; event: string }, callback: () => void) {
		Array.from(this.watchedElements).forEach((element) => {
			const elementAction = element.getAttribute('data-action');
			if (elementAction === action.name) {
				element.addEventListener(action.event, callback);
			}
		});

		return {
			remove: () => {
				this.cleanup(action, callback);
			},
			refresh: () => {
				this.refresh();
				this.on(action, callback);
			},
		};
	}

	off(action: { name: string; event: string }, callback: () => void) {
		this.cleanup(action, callback);
	}
}
