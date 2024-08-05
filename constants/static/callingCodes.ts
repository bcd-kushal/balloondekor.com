type CountryCodeType = {
  name: string;
  dialCode: string;
};

type CountryCodeOptionType = {
  name: string;
  code: string;
  label: string;
};

const COUNTRY_CODES = [
  { name: "India", dialCode: "+91" },
  { name: "Argentina", dialCode: "+54" },
  { name: "Australia", dialCode: "+61" },
  { name: "Brazil", dialCode: "+55" },
  { name: "Canada", dialCode: "+1" },
  { name: "China", dialCode: "+86" },
  { name: "Colombia", dialCode: "+57" },
  { name: "France", dialCode: "+33" },
  { name: "Germany", dialCode: "+49" },
  { name: "Japan", dialCode: "+81" },
  { name: "Mexico", dialCode: "+52" },
  { name: "New Zealand", dialCode: "+64" },
  { name: "South Africa", dialCode: "+27" },
  { name: "South Korea", dialCode: "+82" },
  { name: "Spain", dialCode: "+34" },
  { name: "UK", dialCode: "+44" },
  { name: "USA", dialCode: "+1" }
];

const getCountryCodeOptions = (
  countryCodes: CountryCodeType[]
): CountryCodeOptionType[] => {
  return countryCodes.map((countryCode) => ({
    name: countryCode.name,
    code: countryCode.dialCode,
    label: `${countryCode.name} (${countryCode.dialCode})`
  }));
};

const COUNTRY_CODE_OPTIONS =
  getCountryCodeOptions(COUNTRY_CODES);

export default COUNTRY_CODE_OPTIONS;
