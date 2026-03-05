import { AbstractControl } from "@angular/forms";

export class fileValidator {

  static fileRequired(abstractControl: AbstractControl) {
    console.log(abstractControl);
    if (abstractControl) { return null; }
    let file = null;
    if (abstractControl.get('file')) {
      let file = abstractControl.get('file').value
    } 
    console.log(JSON.stringify(file));
    if (file == null) {
      abstractControl.get('file').setErrors({
        NoFile: true
      })
    } else {
      return null;
    }
  }

}
