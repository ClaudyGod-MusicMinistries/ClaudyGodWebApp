
import { CountryCode } from '../types/booking';

export const COUNTRY_STATE_CITY_DATA: Record<CountryCode, {
  phonePattern: RegExp;
  states: Record<string, string[]>;
}> = {
US: {
    phonePattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    states: {
      California: ['San Ramon', 'Los Angeles', 'San Francisco'],
      Texas: ['Houston', 'Austin', 'Dallas'],
      'New York': ['New York City', 'Buffalo', 'Rochester']
    }
  },
  CA: {
    phonePattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    states: {
      Ontario: ['Toronto', 'Ottawa'],
      Quebec: ['Montreal', 'Quebec City']
    }
  },
  UK: {
    phonePattern: /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
    states: {
      England: ['London', 'Manchester'],
      Scotland: ['Edinburgh', 'Glasgow']
    }
  },
  NG: {
    phonePattern: /^(\+234|0)[7-9][01]\d{8}$/,
    states: {
      Lagos: ['Lagos City', 'Ikeja'],
      Abuja: ['Abuja City', 'Garki']
    }
  }
};

export const ZIP_CODE_PATTERNS: Record<CountryCode, RegExp> = {
   US: /^\d{5}(?:[-\s]\d{4})?$/,      
  CA: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, 
  UK: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/,   
  NG: /^\d{6}$/      
};

export const MONTHS = [
   'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];