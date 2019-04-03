export interface Patient{
    $class : string,
    UserId : string,
    FirstName : string,
    LastName: string,
    EmailAddress : string,
    Phone : string,
    Dob : string,
    ImageURL : string,
    address : Address,
    authorized : string[],
    gender : string,
    age : string
}

export interface Address{
    
    $class: string,
    number: string,
    street: string,
    city: string,
    country: string,
    pincode: string
}

export class PatientClass implements Patient{
    $class : string = "org.example.healthcare.Patient";
    UserId : string;
    FirstName : string;
    LastName: string;
    EmailAddress : string;
    Phone : string;
    Dob : string;
    ImageURL : string;
    address : Address;
    authorized : string[];
    gender : string;
    age : string;
    constructor(UserId: string, FirstName: string, LastName: string, EmailAddress : string,
         Phone: string, Dob : string, ImageURL : string, address : Address,
          authorized : string[], gender : string, age : string){
        this.UserId = UserId;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.EmailAddress = EmailAddress;
        this.Phone = Phone;
        this.Dob = Dob;
        this.ImageURL = ImageURL;
        this.address = address;
        this.authorized = authorized;
        this.gender = gender;
        this.age = age;
    }
}

export class AddressClass implements Address{
    $class: string  = "org.example.healthcare.Address";
    number: string;
    street: string;
    city: string;
    country: string;
    pincode: string;
    constructor(number: string, street : string, city: string, country: string, pincode: string){
        this.number = number;
        this.street = street;
        this.city = city;
        this.country = country;
        this.pincode = pincode;
    }
}

