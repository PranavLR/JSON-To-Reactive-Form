import { Component, Input, OnChanges, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Children, Control } from '../shared/types/Json-form-interface';

@Component({
  selector: 'app-josn-form-controller',
  templateUrl: './josn-form-controller.component.html',
  styleUrls: ['./josn-form-controller.component.scss']
})
export class JosnFormControllerComponent implements OnChanges {
  @Input() jsonFormData!: Control[];
  
  @ViewChild(FormGroupDirective)
  private formDir!: FormGroupDirective;
  
  private fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({});
  
  // ngOnInit(): void {
  //   const draft = localStorage.getItem('form');

  //   if (draft) {
  //     this.myForm.setValue(JSON.parse(draft))
  //   }

  //   this.myForm.valueChanges.pipe( 
  //     filter(() => this.myForm.valid) 
  //     ).subscribe((data) => 
  //       localStorage.setItem('from', JSON.stringify(data))
  //     )
  // }

  ngOnChanges(): void { 
    if(this.jsonFormData) {
      this.createForm(this.jsonFormData);
    }
  }

  createForm(controls: Control[]) {
    for(const control of controls) {
      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control?.validators)) {
        switch (key) {
          case 'min':
            if (typeof value === 'number') {
              validatorsToAdd.push(Validators.min(value));
            }
            break;
          case 'max':
            if (typeof value === 'number') {
              validatorsToAdd.push(Validators.max(value));
            }
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            if (typeof value === 'number') {
              validatorsToAdd.push(Validators.minLength(value));
            }
            break;
          case 'maxLength':
            if (typeof value === 'number') {
              validatorsToAdd.push(Validators.maxLength(value));
            }
            break;
          case 'pattern':
            if (typeof value === 'string' || value instanceof RegExp) {
              validatorsToAdd.push(Validators.pattern(value));
            }
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      if (control.controlType == 'group') {
        
        const newGroup = new FormGroup({});
        control.children?.map((child: Children) => {
          const newControl = new FormControl();
          newGroup.addControl(child.key, newControl)
        })
        this.myForm.addControl(control.key, newGroup)

      }else if(control.controlType == 'array'){

        const newArray: any = new FormArray([]);
        const oneGroup = new FormGroup({});
        control.children?.map((child: Children) => {
          oneGroup.addControl(child.key, new FormControl());
        })
        newArray.push(oneGroup);
        this.myForm.addControl(control.key, newArray)

      }else{
        this.myForm.addControl(
          control.key,
          this.fb.control(control.value, validatorsToAdd)
        );
      }

    }
  }

  addArrayGroup(arrayName: string, objectSchemaChildren: Children[]) {
    const control = this.getFormArray(arrayName);
    const oneGroup = new FormGroup({});
    objectSchemaChildren.map((child: Children) => {
      oneGroup.addControl(child.key, new FormControl());
    })
    control.push(oneGroup);
  }
  removeArrayGroup(arrayName: string, index: number) {
    const control = this.getFormArray(arrayName);
    control.removeAt(index);
  }

  getFormArray(key: string) {
    return <FormArray>this.myForm.controls[key];
  }

  checkboxChange(event: Event, key: string) {
    console.log('event: ', (event.target as HTMLInputElement).checked);
    (event.target as HTMLInputElement).checked == true
              ? this.myForm.controls[key].setValue(true) 
              : this.myForm.controls[key].setValue(false)
  }

  onSubmit() {
    this.myForm.value.rating = this.myForm.value.rating/20;
    console.log('myForm: ', this.myForm);
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
    this.formDir.resetForm();
  }

  trackLoop(index: number, data: any) {
    return index +"--"+ data
  }
}
