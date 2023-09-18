export class ActionListener {
	private watchedElements: Set<Element>;
	private container: Document | Element;

	constructor(container: Document | HTMLElement) {
		this.container = container;
		this.watchedElements = new Set();

		this.refresh();
	}

	private cleanup(
		name: string,
		event: string,
		callback: (event?: Event) => void
	) {
		Array.from(this.watchedElements).forEach((element) => {
			const elementAction = element.getAttribute('data-action');
			if (elementAction === name) {
				element.removeEventListener(event, callback);
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

	on<K extends keyof HTMLElementEventMap>(
		name: string,
		event: K,
		callback: (event: HTMLElementEventMap[K]) => void
	) {
		Array.from(this.watchedElements).forEach((element) => {
			const elementAction = element.getAttribute('data-action');
			if (elementAction === name) {
				element.addEventListener(event, (event) => {
					callback(event as HTMLElementEventMap[K]);
				});
			}
		});

		return {
			remove: () => {
				this.cleanup(name, event, callback as () => void);
			},

			refresh: () => {
				this.refresh();
				this.on(name, event, callback);
			},
		};
	}

	off(name: string, event: string, callback: () => void) {
		this.cleanup(name, event, callback);
	}
}
