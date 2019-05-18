import axios from 'axios';

export default {
  getCountries: () => {
    return axios.get(`https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes`)
  }
}