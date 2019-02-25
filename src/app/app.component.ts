import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ReactiveForm';
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {}


  ngOnInit() {
    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // })
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: [''],
      skills: this.fb.group({
        skillName: [''],
        experienceInYears: [''],
        proficiency: ['intermediate'] 
      })
    })


    // for subscribing to the experienceInYears control value change which is part of nested formGroup skills
    this.employeeForm.get('skills').get('experienceInYears').valueChanges.subscribe(value => {
      console.log(JSON.stringify(value));
    })

    // for subscribing to a value change of form
    this.employeeForm.valueChanges.subscribe(value => {
      console.log(JSON.stringify(value));
    })


  }

  onSubmit(): void {
    console.log(this.employeeForm.value)
  }

  /**
   * method for looping over all the form controls inside root form group and nested form group
   * @param group references formgroup for looping over controls and nested form group
   */
  logKeyValuePairs(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup) {
        this.logKeyValuePairs(abstractControl);
      }
      else {
        console.log("key is: "+key+" value is: "+abstractControl.value);
        //abstractControl.markAsDirty;
      }
    })
  }


/**
 * this function is useful for editing details
 */
  onLoadDataClick(): void {

    this.logKeyValuePairs(this.employeeForm);

/**
 * setValue mehod is used for updating all formControls
 */
    // this.employeeForm.setValue({

    //   fullName: "deepankar",
    //   email: "deepankarranswal@gmail.com",
    //   skills: {
    //     skillName: "C++",
    //     experienceInYears: 3,
    //     proficiency: "intermediate"
    //   }

    // })

    // patchValue method can be used for updating limited or complete number of formControls

    // this.employeeForm.patchValue({
    //   skills: {
    //     skillName: "C++",
    //     experienceInYears: 3,
    //     proficiency: "intermediate"
    //   }
    // })


  }

}
