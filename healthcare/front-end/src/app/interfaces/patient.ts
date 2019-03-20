
export interface Patient{
    $class: string,
    PatientId: string,
    authorized: string[],
    gender: string,
    age: string
}

export interface Address{
    
    $class: string,
    number: string,
    street: string,
    city: string,
    country: string,
    PinCode: string
}

export interface PatientProfile{
    $class: string,
    profile_id: string,
    Patient: Patient,
    firstName: string,
    lastName: string,
    EmailAddress: string,
    Dob: number,
    address: Address
}

export class PatientClass implements Patient{
    $class: string = "org.example.healthcare.Patient";
    PatientId: string;
    authorized: string[];
    gender: string;
    age: string;
    constructor(PatientID:string, authorized : string[], gender: string, age: string){
        this.PatientId = PatientID;
        this.authorized = authorized;
        this.gender = gender;
        this.age  = age;
    }
}

export class AddressClass implements Address{
    $class: string  = "org.example.healthcare.Address";
    number: string;
    street: string;
    city: string;
    country: string;
    PinCode: string;
    constructor(number: string, street : string, city: string, country: string, Pincode: string){
        this.number = number;
        this.street = street;
        this.city = city;
        this.country = country;
        this.PinCode = Pincode;
    }
}

export class PatientProfileClass{
    $class: string = "org.example.healthcare.Patient_profile";
    profile_id: string;
    Patient: string;
    firstName: string;
    lastName: string;
    EmailAddress: string;
    Dob: number;
    address: Address;
    constructor(profile_id: string, Patient: string, firstName: string, lastName : string, 
        EmailAddress : string, Dob : number, address : Address){
            this.profile_id = profile_id;
            this.Patient = Patient;
            this.firstName = firstName;
            this.lastName = lastName;
            this.EmailAddress = EmailAddress;
            this.Dob = Dob;
            this.address  = address;
    }
}