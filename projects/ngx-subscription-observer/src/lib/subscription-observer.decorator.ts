import { Subscription } from 'rxjs';

export function SubscriptionObserver() {
	return function (target: any,  method: string, decorator: PropertyDescriptor): void {
		const defaultMethod: Function = decorator.value;
		const defaultNgOnInit: Function = target.ngOnInit;
		const defaultNgOnDestroy: Function = target.ngOnDestroy;
		let subscription: Subscription;

		target.ngOnInit = function() {
			subscription = defaultMethod.apply(this);
			checkIfSubscriptionHasReturned(defaultMethod.name, subscription)

			defaultNgOnInit.apply(this);
		}
 
		target.ngOnDestroy = function() {
			subscription.unsubscribe();
			defaultNgOnDestroy.apply(this);
		}
	}
}

function checkIfSubscriptionHasReturned(methodName: string, functionResult: Subscription | any): void {
	if (!(functionResult instanceof Subscription)) {
		throw new Error(`${methodName} uses @SubscriptionObserver and must return Subscription object`);
	}
}

