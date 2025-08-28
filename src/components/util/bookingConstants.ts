import { CountryCode } from '../types/booking';

export const COUNTRY_STATE_CITY_DATA: Record<CountryCode, {
  phonePattern: RegExp;
  states: Record<string, string[]>;
}> = {
  US: {
    phonePattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,  
    states: {
      Alabama: ['Birmingham', 'Montgomery'],
      Alaska: ['Anchorage', 'Juneau'],
      Arizona: ['Phoenix', 'Tucson'],
      Arkansas: ['Little Rock', 'Fayetteville'],
      California: ['San Ramon', 'Los Angeles', 'San Francisco'],
      Colorado: ['Denver', 'Boulder'],
      Connecticut: ['Hartford', 'New Haven'],
      Delaware: ['Dover', 'Wilmington'],
      Florida: ['Miami', 'Orlando', 'Tampa'],
      Georgia: ['Atlanta', 'Savannah'],
      Hawaii: ['Honolulu'],
      Idaho: ['Boise'],
      Illinois: ['Chicago', 'Springfield'],
      Indiana: ['Indianapolis', 'Fort Wayne'],
      Iowa: ['Des Moines'],
      Kansas: ['Wichita', 'Topeka'],
      Kentucky: ['Louisville', 'Lexington'],
      Louisiana: ['New Orleans', 'Baton Rouge'],
      Maine: ['Portland', 'Augusta'],
      Maryland: ['Baltimore', 'Annapolis'],
      Massachusetts: ['Boston', 'Cambridge'],
      Michigan: ['Detroit', 'Ann Arbor'],
      Minnesota: ['Minneapolis', 'Saint Paul'],
      Mississippi: ['Jackson'],
      Missouri: ['Kansas City', 'St. Louis'],
      Montana: ['Billings'],
      Nebraska: ['Omaha', 'Lincoln'],
      Nevada: ['Las Vegas', 'Reno'],
      'New Hampshire': ['Manchester'],
      'New Jersey': ['Newark', 'Jersey City'],
      'New Mexico': ['Albuquerque'],
      'New York': ['New York City', 'Buffalo', 'Rochester'],
      'North Carolina': ['Charlotte', 'Raleigh'],
      'North Dakota': ['Fargo'],
      Ohio: ['Columbus', 'Cleveland'],
      Oklahoma: ['Oklahoma City', 'Tulsa'],
      Oregon: ['Portland', 'Salem'],
      Pennsylvania: ['Philadelphia', 'Pittsburgh'],
      'Rhode Island': ['Providence'],
      'South Carolina': ['Charleston', 'Columbia'],
      'South Dakota': ['Sioux Falls'],
      Tennessee: ['Nashville', 'Memphis'],
      Texas: ['Houston', 'Austin', 'Dallas'],
      Utah: ['Salt Lake City'],
      Vermont: ['Burlington'],
      Virginia: ['Richmond', 'Virginia Beach'],
      Washington: ['Seattle', 'Spokane'],
      'West Virginia': ['Charleston'],
      Wisconsin: ['Milwaukee', 'Madison'],
      Wyoming: ['Cheyenne']
    }
  },
  CA: {
    phonePattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,  
    states: {
      Alberta: ['Calgary', 'Edmonton'],
      BritishColumbia: ['Vancouver', 'Victoria'],
      Manitoba: ['Winnipeg'],
      'New Brunswick': ['Fredericton'],
      'Newfoundland and Labrador': ['St. John\'s'],
      'Nova Scotia': ['Halifax'],
      Ontario: ['Toronto', 'Ottawa', 'Mississauga'],
      'Prince Edward Island': ['Charlottetown'],
      Quebec: ['Montreal', 'Quebec City', 'Laval'],
      Saskatchewan: ['Regina', 'Saskatoon']
    }
  },
  UK: {
    phonePattern: /^(?:\+44\s?7\d{3}|07\d{3})\s?\d{3}\s?\d{3}$/,  
    states: {
      England: ['London', 'Manchester', 'Birmingham', 'Liverpool'],
      Scotland: ['Edinburgh', 'Glasgow', 'Aberdeen'],
      Wales: ['Cardiff', 'Swansea', 'Newport'],
      'Northern Ireland': ['Belfast', 'Derry']
    }
  },
  NG: {
    phonePattern: /^(?:\+234|0)[7-9][01]\d{8}$/,  
    states: {
      Abia: ['Umuahia', 'Aba'],
      Adamawa: ['Yola'],
      AkwaIbom: ['Uyo'],
      Anambra: ['Awka'],
      Bauchi: ['Bauchi'],
      Bayelsa: ['Yenagoa'],
      Benue: ['Makurdi'],
      Borno: ['Maiduguri'],
      CrossRiver: ['Calabar'],
      Delta: ['Asaba'],
      Ebonyi: ['Abakaliki'],
      Edo: ['Benin City'],
      Ekiti: ['Ado Ekiti'],
      Enugu: ['Enugu'],
      Gombe: ['Gombe'],
      Imo: ['Owerri'],
      Jigawa: ['Dutse'],
      Kaduna: ['Kaduna'],
      Kano: ['Kano'],
      Katsina: ['Katsina'],
      Kebbi: ['Birnin Kebbi'],
      Kogi: ['Lokoja'],
      Kwara: ['Ilorin'],
      Lagos: ['Lagos Mainland', 'Ikeja'],
      Nasarawa: ['Lafia'],
      Niger: ['Minna'],
      Ogun: ['Abeokuta'],
      Ondo: ['Akure'],
      Osun: ['Oshogbo'],
      Oyo: ['Ibadan'],
      Plateau: ['Jos'],
      Rivers: ['Port Harcourt'],
      Sokoto: ['Sokoto'],
      Taraba: ['Jalingo'],
      Yobe: ['Damaturu'],
      Zamfara: ['Gusau'],
      FCT: ['Abuja City', 'Garki']
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
