import axios from "axios";

const BASE_URL = 'https://atschoolapi.kbcinc.cloud/api';

export default {
  // api/LLPropertyMasterCrud
  // {
  //   "ACTION_TYPE": "CREATE",  //SELECT
  //   "PROPERTY_ID": 0,
  //   "SELLER_USER_ID": 1001,
  //   "TITLE": "Spacious 3BHK Apartment in Gurgaon",
  //   "PROPERTY_DESC": "Well-ventilated 3BHK apartment with modern amenities.",
  //   "PROPERTY_KIND": "APARTMENT",
  //   "TYPE_CODE": "APT3BHK",
  //   "PROPERTY_TYPE_ID": 1,
  //   "DIMENSIONS": "30x40 ft",
  //   "AREA": 1200.00,
  //   "AREA_UNIT": "SQFT",
  //   "BUILTUP_AREA": 1100.00,
  //   "BUILTUP_AREA_UNIT": "SQFT",
  //   "CARPET_AREA": 1000.00,
  //   "CARPET_AREA_UNIT": "SQFT",
  //   "PRICE_AMOUNT": 7500000.00,
  //   "CURRENCY_CODE": "INR",
  //   "NO_BEDROOMS": 3,
  //   "NO_BATHROOMS": 2,
  //   "FURNISHING_TYPE": "SEMI",
  //   "IS_PARKING_SPACE_AVAILABLE": 1,
  //   "BUILT_YEAR": 2019,
  //   "UNIT_NO": "A-302",
  //   "BUILDING_NAME": "Emerald Heights",
  //   "BLOCK_TOWER": "Block B",
  //   "FLOOR_NO": 3,
  //   "TOTAL_FLOORS": 12,
  //   "MAINTENANCE_FEE": 2500.00,
  //   "LAND_USE": "RESIDENTIAL",
  //   "FRONTAGE_M": 10.00,
  //   "DEPTH_M": 30.00,
  //   "ROAD_WIDTH_M": 6.00,
  //   "CORNER_PLOT": 0,
  //   "FEATURES_JSON": "{\"has_gym\": true, \"has_swimming_pool\": true, \"has_security\": true}",
  //   "LATITUDE": 28.459497,
  //   "LONGITUDE": 77.026634,
  //   "ADDRESS_LINE1": "Golf Course Road",
  //   "ADDRESS_LINE2": "Sector 54",
  //   "CITY": "Gurgaon",
  //   "STATE": "Haryana",
  //   "POSTAL_CODE": "122002",
  //   "COUNTRY": "India",
  //   "IS_ACTIVE_FLG": 1
  // }

  async LLPropertyMasterCrud(data){
    return axios.post(`${BASE_URL}/LLPropertyMasterCrud`, data)
  }
}