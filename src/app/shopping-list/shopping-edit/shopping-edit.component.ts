import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredients.model';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subcription: Subscription
  editMode = false;
  editedItem: Ingredient;

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit() {
    this.subcription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      } else {
        this.editMode = false
      }
    });
    // this.subcription = this.slService.startedEditting.subscribe((index: number) => {
    //   this.editMode = true;
    //   this.editedItemIndex = index;
    //   this.editedItem = this.slService.getIngredient(index);
    //   this.slForm.setValue({
    //     name: this.editedItem.name,
    //     amount: this.editedItem.amount
    //   })
    // });
  }

  onSubmit(form: NgForm) {
    if (form) {
      const { value } = form;
      const newIngredient = new Ingredient(value.name, value.amount);
      if (this.editMode) {
        // this.slService.updateIngredient(this.editedItemIndex, newIngredient)
        this.store.dispatch(
          new ShoppingListActions.UpdateIngredient(newIngredient)
        )
      } else {
        // this.slService.addIngredient(newIngredient);
        this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      }
      this.editMode = false;
      form.reset()
    }
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
