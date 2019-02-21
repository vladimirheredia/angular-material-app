import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firebase: AngularFireDatabase) { }

  employeList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });

  /**
   * Initialize the form with default values
   */
  initializeFormGroup(){
    this.form.setValue(
      {
        $key: null,
        fullName: '',
        email: '',
        mobile: '',
        city: '',
        gender: 1,
        department: 0,
        hireDate: '',
        isPermanent: false
      }
    );
  }

  /**
   * Get all employees from the DB
   */
  getEmployees(){
    this.employeList = this.firebase.list('employees');
    return this.employeList.snapshotChanges();
  }

  /**
   * Create new employee in the DB
   * @param employee 
   */
  insertEmployee(employee){
    this.employeList.push({
      fullName: employee.fullName,
      email: employee.email,
      mobile: employee.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate: employee.hireDate,
      isPermanent: employee.isPermanent
    });
  }

  /**
   * Updates employee in DB
   * @param employee 
   */
  updateEmplohyee(employee){
    this.employeList.update(employee.$key, 
      {
        fullName: employee.fullName,
        email: employee.email,
        mobile: employee.mobile,
        city: employee.city,
        gender: employee.gender,
        department: employee.department,
        hireDate: employee.hireDate,
        isPermanent: employee.isPermanent
      });
  }

  /**
   * Delete employee in DB
   * @param $key 
   */
  deleteEmployee($key: string){
    this.employeList.remove($key);
  }
}
