## Angular - Subscription decorator for pros 🐙

### Method decorator that will automatically call method with subscription and unsubscribe after component have destroyed.

# Installation

`npm install ngx-subscription-observer --save`

## Idea
The main idea of this library is remove useless subscription properties from class.
You must not call your methods and make your init method dirty, just use decorator and dont think about subscription destroyed

## Usage

```js
  import { SubscriptionObserver } from "ngx-subscription-observer";
  
  @Component({
    selector: 'app-component'
  })
  class AppComponent implements OnInit, OnDestroy {
  
    constructor(
      private readonly userService: UserService
    ) {}

    // Need to implement, library use it for call your methods
    ngOnInit() {}
    
    // Need to implement, library use it for unsubscribe your subscriptions
    ngOnDestroy() {}
    
    @SubscriptionObserver() // This decorator will automatically call your method and remove subscription after component have destroyed
    initUserSubscription(): Subscription {
      return this.userService.data$.subscribe(console.log)
    }
  }
```

