import { faker } from "@faker-js/faker";

interface Person {
  gender: string;
  prefix: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  jobTitle: string;
  bio: string;
  zodiacSign: string;
  phone: string;
  avatar: string;
  email: string;
}

interface Address {
  state: string;
  zipCode: string;
  country: string;
  streetAddress: string;
  city: string;
}

const getPersonInfo = (
  requestedFields?: (keyof Person)[]
): Person | { [key: string]: string } => {
  const gender = faker.person.sex();
  const sex = gender === "male" ? "male" : "female";
  const prefix = faker.person.prefix(sex);
  const firstName = faker.person.firstName(sex);
  const middleName = faker.person.middleName(sex);
  const lastName = faker.person.lastName(sex);
  const fullName = `${prefix} ${firstName} ${middleName} ${lastName}`;
  const jobTitle = prefix === "Dr." ? "Doctor" : faker.person.jobTitle();
  const bio = faker.person.bio();
  const zodiacSign = faker.person.zodiacSign();
  const phone = faker.phone.number();
  const avatar = faker.image.avatar();
  const email = faker.internet
    .email({
      firstName: firstName,
      lastName: lastName,
    })
    .toLowerCase();
  const person: Person = {
    gender,
    prefix,
    firstName,
    middleName,
    lastName,
    fullName,
    jobTitle,
    bio,
    zodiacSign,
    phone,
    avatar,
    email,
  };
  if (requestedFields && requestedFields.length != 0) {
    const filteredPerson: { [key: string]: string } = {};
    requestedFields.forEach((field) => {
      if (person.hasOwnProperty(field)) {
        filteredPerson[field] = person[field];
      }
    });
    return filteredPerson;
  }
  return person;
};

const getAddressInfo = (
  requestedFields?: (keyof Address)[]
): Address | { [key: string]: string } => {
  const state = faker.location.state();
  const zipCode = faker.location.zipCode("######");
  const country = faker.location.country();
  const city = faker.location.city();
  const streetAddress = faker.location.streetAddress({ useFullAddress: true });
  const address: Address = {
    state,
    zipCode,
    country,
    streetAddress,
    city,
  };
  if (requestedFields && requestedFields.length != 0) {
    const filteredAddress: { [key: string]: string } = {};
    requestedFields.forEach((field) => {
      if (address.hasOwnProperty(field)) {
        filteredAddress[field] = address[field];
      }
    });
    return filteredAddress;
  }
  return address;
};

export { getPersonInfo, getAddressInfo };
