import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubcription: Subscription

  constructor() { }

  ngOnInit() {
    // this.firstObsSubcription = interval(1000).subscribe((count) => {
    //   console.log(count)
    // })
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'))
        }
        count++
      }, 1000)
    });

    this.firstObsSubcription = customIntervalObservable.subscribe(data => {
      console.log(data)
    }, error => { // handle error,
      alert(error)
      console.log('eer', error) // observer error not complete it
    }, () => { // handle complete,
      console.log('Completed') // observer isComplete not need unsubscribe
    });
  }

  ngOnDestroy() {
    this.firstObsSubcription.unsubscribe();
  }
}
