import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subcription: Subscription
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subcription = this.slService.startedEditting.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  onSubmit(form: NgForm) {
    if (form) {
      const { value } = form;
      const newIngredient = new Ingredient(value.name, value.amount);
      if (this.editMode) {
        this.slService.updateIngredient(this.editedItemIndex, newIngredient)
      } else {
        this.slService.addIngredient(newIngredient);
      }
      this.editMode = false;
      form.reset()
    }
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

}
