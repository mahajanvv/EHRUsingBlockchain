export interface MedicalRecord{
    $class: string,
    record_id: string,
    patient: string,
    doctor: string,
    authorized: [],
    description: string,
    prescription: string,
    encounter_time: string
}