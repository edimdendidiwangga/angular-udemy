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
  subcription: Subscription
  editMode = false;
  editedItemIndex: number;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subcription = this.slService.startedEditting.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
    });
  }

  onAddItem(form: NgForm) {
    if (form) {
      const { value } = form;
      const newIngredient = new Ingredient(value.name, value.amount);
      this.slService.addIngredient(newIngredient);
    }
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

}
