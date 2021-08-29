import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export class Stroe<T> {

  private store: BehaviorSubject<T>;
  store$: Observable<T>;


  constructor(insitalStore:T) {
    this.store = new BehaviorSubject<T>(insitalStore);
    this.store$ = this.store.asObservable();
  }

  get storeValue():T {
    return this.store.getValue();
  }

  nextValue(newValue:T) {
    this.store.next(newValue)
  }
}
