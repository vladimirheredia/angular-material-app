import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentList: AngularFireList<any>;
  array = [];

  /**
   * This service get's the department's information for
   * the dropdown
   * @param firebase 
   */
  constructor(private firebase: AngularFireDatabase) {
    this.departmentList = this.firebase.list('departments');
    this.departmentList.snapshotChanges().subscribe(
      list => {
        this.array = list.map( item => {
          return{
            $key: item.key,
            ...item.payload.val()
          };
        })
      }
    )
   }
}
