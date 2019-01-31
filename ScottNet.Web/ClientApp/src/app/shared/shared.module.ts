import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Temperature } from "../weather";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    Temperature
  ],
  providers: [
  ],
  exports: [
    Temperature
  ]
})
export class SharedModule {
}
