import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  @Input('srvElement') element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef
  // If you DON'T use the selected element in ngOnInit, set static: false instead.
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef

  constructor() {
    console.log('constructor called!')
  }

  ngOnChanges(changes: SimpleChanges) { // componentWillUpdate
    console.log('ngOnChanges calles', changes)
  }

  ngOnInit() { // componentDidMount
    console.log('ngOnInit called!')
    console.log('header', this.header.nativeElement.textContent)
    console.log('content', this.paragraph.nativeElement.textContent)
  }

  ngDoCheck() {
    console.log('ngDoCheck called')
  }

  ngAfterContentInit() {
    console.log("ngAfterContentInit called")
    console.log('content AfterContentInit', this.paragraph.nativeElement.textContent)
  }

  ngAfterContentChecked() {
    console.log("ngAfterContentChecked called")
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit called")
    console.log('header ngAfterViewInit', this.header.nativeElement.textContent)
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked called")
  }

  ngOnDestroy() {
    console.log("ngOnDestroy called")
  }
}
