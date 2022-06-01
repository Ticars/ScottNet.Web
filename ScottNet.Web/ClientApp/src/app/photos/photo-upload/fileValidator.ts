import { AbstractControl } from "@angular/forms";

export class fileValidator {

  static fileRequired(abstractControl: AbstractControl) {
    let file = abstractControl.get('file').value;
    console.log(JSON.stringify(file));
    alert(JSON.stringify(file));
    if (file == null) {
      abstractControl.get('file').setErrors({
        NoFile: true
      })
    } else {
      return null;
    }
  }

}
