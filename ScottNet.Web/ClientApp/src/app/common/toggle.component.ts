import { Component, Input, Output, EventEmitter } from "@angular/core";


@Component({
  templateUrl: './toggle.component.html',
  selector: 'toggle',
  styleUrls: ['./toggle.component.css']
})
export class Toggler {
  @Input() checked: boolean
//  checked:boolean
  @Input() text: string
  @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>()

  toggled(value) {
    this.changed.emit(value);
  }
}
