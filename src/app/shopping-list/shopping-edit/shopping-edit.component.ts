import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  @Output() ingredientAdded  = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    const ingName = this.nameInputRef && this.nameInputRef.nativeElement ? this.nameInputRef.nativeElement.value : '';
    const amount = this.amountInputRef && this.amountInputRef.nativeElement ? this.amountInputRef.nativeElement.value : '';
    const newIngredient = new Ingredient(ingName, amount);
    this.ingredientAdded.emit(newIngredient)
  }

}
