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
interface Finance {
  accountType: string;
  accountNumber: string;
  amount: string;
  bitcoinAddress: string;
  creditCardCVV: string;
  creditCardIssuer: string;
  creditCardNumber: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  maskedNumber: string;
  pin: string;
  routingNumber: string;
  transactionDescription: string;
  transactionType: string;
  date: string;
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
const getFinanceInfo = (
  requestedFields?: (keyof Finance)[]
): Finance | { [key: string]: string } => {
  let issuer = faker.finance.creditCardIssuer();

  const finance: Finance = {
    accountType: faker.finance.accountName(),
    accountNumber: faker.finance.accountNumber({ length: 12 }),
    amount: faker.finance.amount({
      min: 5,
      max: 10,
      dec: 5,
      symbol: "",
      autoFormat: true,
    }),
    bitcoinAddress: faker.finance.bitcoinAddress(),
    creditCardIssuer: issuer,
    creditCardCVV: faker.finance.creditCardCVV(),
    creditCardNumber: faker.finance.creditCardNumber({ issuer: issuer }),
    currencyCode: faker.finance.currencyCode(),
    currencyName: faker.finance.currencyName(),
    currencySymbol: faker.finance.currencySymbol(),
    maskedNumber: faker.finance.maskedNumber(),
    pin: faker.finance.pin(),
    routingNumber: faker.finance.routingNumber(),
    transactionDescription: faker.finance.transactionDescription(),
    transactionType: faker.finance.transactionType(),
    date: faker.date.anytime().toDateString(),
  };
  if (requestedFields && requestedFields.length != 0) {
    const filteredAddress: { [key: string]: string } = {};
    requestedFields.forEach((field) => {
      if (finance.hasOwnProperty(field)) {
        filteredAddress[field] = finance[field];
      }
    });
    return filteredAddress;
  }
  return finance;
};

export { getPersonInfo, getAddressInfo, getFinanceInfo };
