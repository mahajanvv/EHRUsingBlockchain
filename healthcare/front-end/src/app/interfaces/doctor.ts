export interface doctorID{
    $class : string,
    DoctorId : string
}

export interface Address{
    
    $class: string,
    number: string,
    street: string,
    city: string,
    country: string,
    PinCode: string
}

export interface DoctorProfile{
    $class : string,
    profile_id: string,
    Doctor: doctorID,
    firstName: string,
    lastName: string,
    EmailAddress: string,
    Dob: number,
    Qualifications: string[],
    ImageURL: string,
    address : Address
}

export class AddressClass implements Address{
    $class: string = "org.example.healthcare.Address";
    number: string;
    street: string;
    city: string;
    country: string;
    PinCode: string;
    constructor(number: string, street: string, city: string, country: string, PinCode: string){
        this.number = number;
        this.street = street;
        this.city = city;
        this.country = country;
        this.PinCode = PinCode;
    }
}

export class DoctorID implements doctorID{
    $class : string = "org.example.healthcare.Doctor";
    DoctorId : string;
    constructor(doc:string){
        this.DoctorId = doc;
    }
}
export class DoctorProfileClass{
    $class : string = "org.example.healthcare.Doctor_profile";
    profile_id: string;
    Doctor: string;
    firstName: string;
    lastName: string;
    EmailAddress: string;
    Dob: number;
    Qualifications: string[];
    ImageURL: string;
    address : Address;
    constructor(profile_id: string, Doctor: string, firstName: string, 
        lastName: string, EmailAddress: string,Dob: number, Qualifications: string[],
        ImageURL: string, address : Address){
            this.profile_id = profile_id;
            this.Doctor = Doctor;
            this.firstName = firstName;
            this.lastName = lastName;
            this.EmailAddress = EmailAddress;
            this.Dob = Dob;
            this.Qualifications = Qualifications;
            this.ImageURL = ImageURL;
            this.address = address;
    }
}