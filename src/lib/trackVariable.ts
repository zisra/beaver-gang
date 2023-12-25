export function onValueChange<T>(value: any, callback: (target: T) => void): T {
	return new Proxy(value, {
		set(target, prop, newValue) {
			if (target[prop] !== newValue) {
				target[prop] = newValue;
				callback(target);
			}
			return true;
		},
		get(target, prop) {
			return target[prop];
		},
	});
}
