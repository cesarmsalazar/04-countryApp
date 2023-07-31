import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder : string = ''

  @Input()
  public initialValue : string = ''

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      //console.log('debouncer value', value);
      this.onDebounce.emit(value)
    } )
  }

  ngOnDestroy():void {
    //console.log('destuido');
    this.debouncerSuscription?.unsubscribe()
  }

  emitValue( value: string ):void{
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ) {
    //console.log(searchTerm)
    this.debouncer.next( searchTerm );
  }



}
