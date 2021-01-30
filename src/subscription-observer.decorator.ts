export function SubscriptionObserver() {
	return function (target: any,  method: string, decorator: PropertyDescriptor): void {
		const defaultMethod: Function = decorator.value;
		const defaultNgOnInit: Function = target.ngOnInit;
		const defaultNgOnDestroy: Function = target.ngOnDestroy;
		let subscription: any;

		target.ngOnInit = function() {
			subscription = defaultMethod.apply(this);

			defaultNgOnInit.apply(this);
		}
 
		target.ngOnDestroy = function() {
			subscription.unsubscribe();
			defaultNgOnDestroy.apply(this);
		}
	}
}

