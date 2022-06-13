export interface Person {
  first_name: string;
  last_name: string;
  current_address: string;
}
export interface Employer {
  name: string;
  start_date: string;
  end_date: string;
}
export interface Guarantor {
  name: string;
  address: string;
  relation: string;
}
export interface DataModel {
  personal: Person;
  employer: Employer[];
  guarantor: Guarantor;
}