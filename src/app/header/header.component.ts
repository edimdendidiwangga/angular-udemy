import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isCollapse = false;
  @Output() featuredSelected = new EventEmitter<string>()

  constructor(private dataStorageService: DataStorageService) { }

  onSelect(feature: string) {
    this.featuredSelected.emit(feature)
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
}