import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  errorMessage = "";
  form: FormGroup;
  employees: any;  // 1.a HTMLs *ngFor
  // 1.b lisa column avatarile

  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
    this.employeeService.getEmployees().subscribe(employeesFromBackend => {
      this.employees = employeesFromBackend.data;
    })
  }

  private initForm(): void {
    this.form = this.fb.group({ // TODO: Add validations
      id: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      name: ['', [Validators.required, Validators.pattern(/^[a-züõöäA-ZÜÕÖÄ_]+( [a-züõöäA-ZÜÕÖÄ_]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      avatar: ['', Validators.required]
    });
  }

  // 2.a
  addEmployee(): void {
    if (this.form.invalid) {
      // this.errorMessage = "Not all fields are filled";
      if (this.form.controls.id.status === "INVALID") {
        this.errorMessage = "ID is invalid";
      } else if (this.form.controls.name.status === "INVALID") {
        this.errorMessage = "Name is invalid";
      } else if (this.form.controls.email.status === "INVALID") {
        this.errorMessage = "Email is invalid";
      } else if (this.form.controls.avatar.status === "INVALID") {
        this.errorMessage = "Avatar is invalid";
      }
      return;
    }
    this.errorMessage = "";
    const newEmployee = {
      id: this.form.value.id,
      first_name: this.form.value.name.split(" ")[0],
      last_name: this.form.value.name.split(" ")[1],
      email: this.form.value.email,
      avatar: this.form.value.avatar
    }
    this.employees.push(newEmployee);
    // TODO: Add an employee to the table this.employees.push()
  }

  deleteEmployee(employee): void {
    // TODO: Delete an employee from the table this.employees.splice()
    const index = this.employees.indexOf(employee);
    this.employees.splice(index,1);
  }
}
