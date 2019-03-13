
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