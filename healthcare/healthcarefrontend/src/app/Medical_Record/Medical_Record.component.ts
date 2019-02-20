/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Medical_RecordService } from './Medical_Record.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-medical_record',
  templateUrl: './Medical_Record.component.html',
  styleUrls: ['./Medical_Record.component.css'],
  providers: [Medical_RecordService]
})
export class Medical_RecordComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  record_id = new FormControl('', Validators.required);
  PatientId = new FormControl('', Validators.required);
  DoctorId = new FormControl('', Validators.required);
  version = new FormControl('', Validators.required);
  authorized = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  prescription = new FormControl('', Validators.required);
  encounter_time = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);

  constructor(public serviceMedical_Record: Medical_RecordService, fb: FormBuilder) {
    this.myForm = fb.group({
      record_id: this.record_id,
      PatientId: this.PatientId,
      DoctorId: this.DoctorId,
      version: this.version,
      authorized: this.authorized,
      description: this.description,
      prescription: this.prescription,
      encounter_time: this.encounter_time,
      location: this.location
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceMedical_Record.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.healthcare.Medical_Record',
      'record_id': this.record_id.value,
      'PatientId': this.PatientId.value,
      'DoctorId': this.DoctorId.value,
      'version': this.version.value,
      'authorized': this.authorized.value,
      'description': this.description.value,
      'prescription': this.prescription.value,
      'encounter_time': this.encounter_time.value,
      'location': this.location.value
    };

    this.myForm.setValue({
      'record_id': null,
      'PatientId': null,
      'DoctorId': null,
      'version': null,
      'authorized': null,
      'description': null,
      'prescription': null,
      'encounter_time': null,
      'location': null
    });

    return this.serviceMedical_Record.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'record_id': null,
        'PatientId': null,
        'DoctorId': null,
        'version': null,
        'authorized': null,
        'description': null,
        'prescription': null,
        'encounter_time': null,
        'location': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.healthcare.Medical_Record',
      'PatientId': this.PatientId.value,
      'DoctorId': this.DoctorId.value,
      'version': this.version.value,
      'authorized': this.authorized.value,
      'description': this.description.value,
      'prescription': this.prescription.value,
      'encounter_time': this.encounter_time.value,
      'location': this.location.value
    };

    return this.serviceMedical_Record.updateAsset(form.get('record_id').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceMedical_Record.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceMedical_Record.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'record_id': null,
        'PatientId': null,
        'DoctorId': null,
        'version': null,
        'authorized': null,
        'description': null,
        'prescription': null,
        'encounter_time': null,
        'location': null
      };

      if (result.record_id) {
        formObject.record_id = result.record_id;
      } else {
        formObject.record_id = null;
      }

      if (result.PatientId) {
        formObject.PatientId = result.PatientId;
      } else {
        formObject.PatientId = null;
      }

      if (result.DoctorId) {
        formObject.DoctorId = result.DoctorId;
      } else {
        formObject.DoctorId = null;
      }

      if (result.version) {
        formObject.version = result.version;
      } else {
        formObject.version = null;
      }

      if (result.authorized) {
        formObject.authorized = result.authorized;
      } else {
        formObject.authorized = null;
      }

      if (result.description) {
        formObject.description = result.description;
      } else {
        formObject.description = null;
      }

      if (result.prescription) {
        formObject.prescription = result.prescription;
      } else {
        formObject.prescription = null;
      }

      if (result.encounter_time) {
        formObject.encounter_time = result.encounter_time;
      } else {
        formObject.encounter_time = null;
      }

      if (result.location) {
        formObject.location = result.location;
      } else {
        formObject.location = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'record_id': null,
      'PatientId': null,
      'DoctorId': null,
      'version': null,
      'authorized': null,
      'description': null,
      'prescription': null,
      'encounter_time': null,
      'location': null
      });
  }

}
