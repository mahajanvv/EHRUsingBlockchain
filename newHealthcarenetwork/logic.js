'use strict';
/**
 * Write your transction processor functions here
 */



/**
 * Remove from readers of a particular medical the medical record
 * @param {org.example.healthcare.RemoveOthersToRead} removeOthersToRead
 * @transaction
 */
function removeOthersToRead(removeOthersToRead){
 	var NS = 'org.example.healthcare';
  	if(removeOthersToRead.medicalRecord.authorized){
      var index = removeOthersToRead.medicalRecord.authorized.indexOf(removeOthersToRead.UserId);
      if(index!=-1){
        removeOthersToRead.medicalRecord.authorized.splice(index, 1);
      }
    }
  	return getAssetRegistry(NS+ '.MedicalRecord')
  		.then((assets)=>{
      		return assets.update(removeOthersToRead.medicalRecord);
    	});
  
}

/**
 * Add patients or doctors to read the medical records
 * @param {org.example.healthcare.AllowOthersToRead} allowOthersToRead
 * @transaction
 */
function allowOthersToRead(allowotherstoread){
  var NS = 'org.example.healthcare';
  if(allowotherstoread.medicalRecord.authorized){
    if(allowotherstoread.medicalRecord.authorized.indexOf(allowotherstoread.UserId)==-1){
    	allowotherstoread.medicalRecord.authorized.push(allowotherstoread.UserId);  
    }
  }else{
    allowotherstoread.medicalRecord.authorized = [allowotherstoread.UserId];
  }
  
  return getAssetRegistry(NS+'.MedicalRecord').
  		then((assets)=>{
    		return assets.update(allowotherstoread.medicalRecord);
  		});
}

/**
 * Adding new Medical record to ledger
 * @param {org.example.healthcare.AddnewMedicalRecord} addnewMedicalRecord
 * @transaction
 */

function addnewMedicalRecord(record){
  var factory = getFactory();
  var NS = 'org.example.healthcare';
  
  var medicalrecord = factory.newResource(NS, 'MedicalRecord', record.transactionId);
  medicalrecord.patient = record.patient;
  medicalrecord.doctor = record.doctor;
  medicalrecord.description = record.description;
  medicalrecord.prescription = record.prescription;
  medicalrecord.encounter_time = record.timestamp;
  
  return getAssetRegistry(NS +'.MedicalRecord')
  		.then((medicalrecords)=>{
    		return medicalrecords.add(medicalrecord);
  			});
  
}

/**
 * Adding some participants and assets to the network
 * @param {org.example.healthcare.setUpDemo} setUpDemo
 * @transaction
 */ 
function setUpDemo(setupdemo){
  var factory = getFactory();
  var NS = 'org.example.healthcare';
  
  //creating patients
  var patient1 = factory.newResource(NS, 'Patient', 'Pat1');
  var patient1Address = factory.newConcept(NS, 'Address');
  patient1Address.number = 'D-6 Room No:38';
  patient1Address.street = 'Vishrambag';
  patient1Address.city = 'Sangli';
  patient1Address.country = 'India';
  patient1Address.pincode = '415416';
  patient1.address = patient1Address;
  patient1.FirstName = 'Sundar';
  patient1.LastName = 'Pichai';
  patient1.EmailAddress = 'sundarpichai@gmail.com';
  patient1.Phone = '9421426366';
  patient1.Dob = '10/10/1997';
  patient1.ImageURL = '';
  patient1.authorized = [];
  patient1.gender = 'Male';
  patient1.age = '40';

  var patient2 = factory.newResource(NS, 'Patient', 'Pat2');
  var patient2Address = factory.newConcept(NS, 'Address');
  patient2Address.number = 'D-6 Room No:33';
  patient2Address.street = 'Vishrambag';
  patient2Address.city = 'Sangli';
  patient2Address.country = 'India';
  patient2Address.pincode = '415416';
  patient2.address = patient2Address;
  patient2.FirstName = 'Satya';
  patient2.LastName = 'Nadella';
  patient2.EmailAddress = 'satyanadella@gmail.com';
  patient2.Phone = '9421426366';
  patient2.Dob = '21/10/1997';
  patient2.ImageURL = '';
  patient2.authorized = [];
  patient2.gender = 'Male';
  patient2.age = '43';
  
  var patient3 = factory.newResource(NS, 'Patient', 'Pat3');
  var patient3Address = factory.newConcept(NS, 'Address');
  patient3Address.number = 'D-6 Room No:37';
  patient3Address.street = 'Vishrambag';
  patient3Address.city = 'Sangli';
  patient3Address.country = 'India';
  patient3Address.pincode = '415416';
  patient3.address = patient3Address;
  patient3.FirstName = 'Amir';
  patient3.LastName = 'Khan';
  patient3.EmailAddress = 'amirkhan@gmail.com';
  patient3.Phone = '9421426366';
  patient3.Dob = '13/10/1997';
  patient3.ImageURL = '';
  patient3.authorized = [];
  patient3.gender = 'Male';
  patient3.age = '46';
  
  
  //Creating Doctors
  var doctor1 = factory.newResource(NS, 'Doctor', 'Doc1');
  var doctor1Address = factory.newConcept(NS, 'Address');
  doctor1Address.number = 'D6 Room No:38';
  doctor1Address.street = 'Vishrambag';
  doctor1Address.city = 'Sangli';
  doctor1Address.country = 'India';
  doctor1Address.pincode = '416415';
  doctor1.address = doctor1Address;
  doctor1.FirstName = 'Vinit';
  doctor1.LastName = 'Mahajan';
  doctor1.EmailAddress = 'vinitmahajan1@gmail.com';
  doctor1.Phone = '9421426366';
  doctor1.Dob = '9/10/1997';
  doctor1.ImageURL = '';
  doctor1.Qualifications = [];
  
  var doctor2 = factory.newResource(NS, 'Doctor', 'Doc2');
  var doctor2Address = factory.newConcept(NS, 'Address');
  doctor2Address.number = 'D6 Room No:39';
  doctor2Address.street = 'Vishrambag';
  doctor2Address.city = 'Sangli';
  doctor2Address.country = 'India';
  doctor2Address.pincode = '416415';
  doctor2.address = doctor2Address;
  doctor2.FirstName = 'Kapil';
  doctor2.LastName = 'Bhalotia';
  doctor2.EmailAddress = 'kapilbhalotia@gmail.com';
  doctor2.Phone = '9421426366';
  doctor2.Dob = '30/09/1997';
  doctor2.ImageURL = '';
  doctor2.Qualifications = [];
  
  var doctor3 = factory.newResource(NS, 'Doctor', 'Doc3');
  var doctor3Address = factory.newConcept(NS, 'Address');
  doctor3Address.number = 'D3 Room No:18';
  doctor3Address.street = 'Vishrambag';
  doctor3Address.city = 'Sangli';
  doctor3Address.country = 'India';
  doctor3Address.pincode = '416415';
  doctor3.address = doctor3Address;
  doctor3.FirstName = 'Vaishnavi';
  doctor3.LastName = 'Bhonsale';
  doctor3.EmailAddress = 'vaishnavibhonsale@gmail.com';
  doctor3.Phone = '9421426366';
  doctor3.Dob = '19/10/1997';
  doctor3.ImageURL = '';
  doctor3.Qualifications = [];
  
  return getParticipantRegistry(NS+ '.Patient')
  			.then((patientRegistry)=>{
    			return patientRegistry.addAll([patient1, patient2, patient3]);
  			})
  			.then(()=>{
    			return getParticipantRegistry(NS+ '.Doctor');
  			})
  			.then((doctorRegistry)=>{
    			return doctorRegistry.addAll([doctor1, doctor2, doctor3]);
  			});
  
}