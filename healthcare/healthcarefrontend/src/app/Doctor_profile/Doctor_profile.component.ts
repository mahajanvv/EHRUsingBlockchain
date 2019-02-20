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
import { Doctor_profileService } from './Doctor_profile.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-doctor_profile',
  templateUrl: './Doctor_profile.component.html',
  styleUrls: ['./Doctor_profile.component.css'],
  providers: [Doctor_profileService]
})
export class Doctor_profileComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  profile_id = new FormControl('', Validators.required);
  Doctor = new FormControl('', Validators.required);
  firstName = new FormControl('', Validators.required);
  lastName = new FormControl('', Validators.required);
  EmailAddress = new FormControl('', Validators.required);
  Dob = new FormControl('', Validators.required);
  Qualifications = new FormControl('', Validators.required);
  ImageURL = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);

  constructor(public serviceDoctor_profile: Doctor_profileService, fb: FormBuilder) {
    this.myForm = fb.group({
      profile_id: this.profile_id,
      Doctor: this.Doctor,
      firstName: this.firstName,
      lastName: this.lastName,
      EmailAddress: this.EmailAddress,
      Dob: this.Dob,
      Qualifications: this.Qualifications,
      ImageURL: this.ImageURL,
      address: this.address
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDoctor_profile.getAll()
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
      $class: 'org.example.healthcare.Doctor_profile',
      'profile_id': this.profile_id.value,
      'Doctor': this.Doctor.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'EmailAddress': this.EmailAddress.value,
      'Dob': this.Dob.value,
      'Qualifications': this.Qualifications.value,
      'ImageURL': this.ImageURL.value,
      'address': this.address.value
    };

    this.myForm.setValue({
      'profile_id': null,
      'Doctor': null,
      'firstName': null,
      'lastName': null,
      'EmailAddress': null,
      'Dob': null,
      'Qualifications': null,
      'ImageURL': null,
      'address': null
    });

    return this.serviceDoctor_profile.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'profile_id': null,
        'Doctor': null,
        'firstName': null,
        'lastName': null,
        'EmailAddress': null,
        'Dob': null,
        'Qualifications': null,
        'ImageURL': null,
        'address': null
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
      $class: 'org.example.healthcare.Doctor_profile',
      'Doctor': this.Doctor.value,
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'EmailAddress': this.EmailAddress.value,
      'Dob': this.Dob.value,
      'Qualifications': this.Qualifications.value,
      'ImageURL': this.ImageURL.value,
      'address': this.address.value
    };

    return this.serviceDoctor_profile.updateAsset(form.get('profile_id').value, this.asset)
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

    return this.serviceDoctor_profile.deleteAsset(this.currentId)
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

    return this.serviceDoctor_profile.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'profile_id': null,
        'Doctor': null,
        'firstName': null,
        'lastName': null,
        'EmailAddress': null,
        'Dob': null,
        'Qualifications': null,
        'ImageURL': null,
        'address': null
      };

      if (result.profile_id) {
        formObject.profile_id = result.profile_id;
      } else {
        formObject.profile_id = null;
      }

      if (result.Doctor) {
        formObject.Doctor = result.Doctor;
      } else {
        formObject.Doctor = null;
      }

      if (result.firstName) {
        formObject.firstName = result.firstName;
      } else {
        formObject.firstName = null;
      }

      if (result.lastName) {
        formObject.lastName = result.lastName;
      } else {
        formObject.lastName = null;
      }

      if (result.EmailAddress) {
        formObject.EmailAddress = result.EmailAddress;
      } else {
        formObject.EmailAddress = null;
      }

      if (result.Dob) {
        formObject.Dob = result.Dob;
      } else {
        formObject.Dob = null;
      }

      if (result.Qualifications) {
        formObject.Qualifications = result.Qualifications;
      } else {
        formObject.Qualifications = null;
      }

      if (result.ImageURL) {
        formObject.ImageURL = result.ImageURL;
      } else {
        formObject.ImageURL = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
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
      'profile_id': null,
      'Doctor': null,
      'firstName': null,
      'lastName': null,
      'EmailAddress': null,
      'Dob': null,
      'Qualifications': null,
      'ImageURL': null,
      'address': null
      });
  }

}
