export interface Doctor{
    $class : string,
    UserId : string,
    FirstName : string,
    LastName: string,
    EmailAddress : string,
    Phone : string,
    Dob : string,
    ImageURL : string,
    address : Address,
    Qualifications: string[]
}

export interface Address{
    
    $class: string,
    number: string,
    street: string,
    city: string,
    country: string,
    pincode: string
}


export class AddressClass implements Address{
    $class: string = "org.example.healthcare.Address";
    number: string;
    street: string;
    city: string;
    country: string;
    pincode: string;
    constructor(number: string, street: string, city: string, country: string, pincode: string){
        this.number = number;
        this.street = street;
        this.city = city;
        this.country = country;
        this.pincode = pincode;
    }
}

export class DoctorClass implements Doctor{
    $class : string = "org.example.healthcare.Doctor";
    UserId : string;
    FirstName : string;
    LastName: string;
    EmailAddress : string;
    Phone : string;
    Dob : string;
    ImageURL : string;
    address : Address;
    Qualifications: string[]
    constructor(UserId: string, FirstName: string, LastName: string, EmailAddress: string,
         Phone: string, Dob : string, ImageURL : string, address : Address, Qualifications: string[]) {
             this.UserId = UserId;
             this.FirstName = FirstName;
             this.LastName = LastName;
             this.EmailAddress = EmailAddress;
             this.Phone = Phone;
             this.Dob = Dob;
             this.ImageURL = ImageURL;
             this.address = address;
             this.Qualifications = Qualifications;
         }
}
