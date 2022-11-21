import { FormBuilder, ControlValueAccessor } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
  providers: [],
})
export class CategorySelectorComponent {
  @Input('form') form: any;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.form);
  }
}
