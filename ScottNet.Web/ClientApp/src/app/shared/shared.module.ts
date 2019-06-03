import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Temperature } from "../weather";
import { SpinnerComponent } from "../spinner/spinner.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Temperature,
    SpinnerComponent
  ],
  providers: [
  ],
  exports: [
    Temperature,
    SpinnerComponent
  ]
})
export class SharedModule {
}
