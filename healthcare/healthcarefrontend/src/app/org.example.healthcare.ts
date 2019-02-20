import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.healthcare{
   export class Doctor extends Participant {
      DoctorId: string;
   }
   export class Patient_profile extends Asset {
      profile_id: string;
      Patient: Patient;
      firstName: string;
      lastName: string;
      EmailAddress: string;
      Dob: number;
      address: Address;
   }
   export class Doctor_profile extends Asset {
      profile_id: string;
      Doctor: Doctor;
      firstName: string;
      lastName: string;
      EmailAddress: string;
      Dob: number;
      Qualifications: string[];
      ImageURL: string;
      address: Address;
   }
   export class Patient extends Asset {
      PatientId: string;
      authorized: string[];
      gender: string;
      age: string;
   }
   export class Medical_Record extends Asset {
      record_id: string;
      PatientId: string;
      DoctorId: string;
      version: number;
      authorized: string[];
      description: string;
      prescription: string;
      encounter_time: Date;
      location: string;
   }
   export class UpdateRecord extends Transaction {
      record_id: string;
      PatientId: string;
      DoctorId: string;
      version: number;
      authorized: string[];
      description: string;
      prescription: string;
      encounter_time: Date;
      location: string;
   }
   export class AllowOtherDoctorsRead extends Transaction {
      id: string;
      record: Medical_Record;
      doctor2: Doctor;
   }
   export class AllowAdoctorWrite extends Transaction {
      patient: Patient;
      DoctorId: string;
   }
   export class Address {
      number: string;
      street: string;
      city: string;
      country: string;
      PinCode: string;
   }
// }
