export const Config = {
  // API_URL: 'http://tpp-dev-api.makesol.no',
  //API_URL: 'http://api.transportør.no',
  API_URL: 'http://tpp-api.makesol.no',
  // API_URL: 'https://localhost:7236',
  CLIENT_ID: 'MobileApp',
  CLIENT_SECRET: '123@abc',
  APP_VERSION: '1.0.1',
  KEYS: {
    USER_NAME: 'user_name',
    USER_ID: 'user_id',
    ACCESS_TOKEN: 'token',
    REFRESH_TOKEN: 'refresh_token',
    SHIFT_INFO: 'shift_info',
    // API_KEY: 'AIzaSyD4o5C69BSd9JUSHqyUHnT9HkgRdS__eb8',
    // BASE_URL: 'https://maps.googleapis.com/maps/api/geocode/json',
    API_KEY:
      'pk.eyJ1IjoianVuYWlkYnV0dDMwIiwiYSI6ImNsY290MWY1bDBjZG0zcmxhY2tkdm15OG8ifQ.UlY2lgvhe5XSGvPvWVENuQ',
    BASE_URL: 'https://api.mapbox.com/geocoding/v5/',
  },
  ACCESSIBILIY_HEIGHT: 44,
  ACCESSIBILIY_WIDTH: 44,

  ACCESSIBILIY_HEIGHT_AA: 24,
  ACCESSIBILIY_WIDTH_AA: 24,
  WORKLOAD_STATUS: {
    NEW: 1,
    PENDING: 2,
    LOADED: 3,
    STARTED: 4,
    COMPLETED: 5,
  },
  STATUS: [
    {
      Id: 1,
      Title: 'New ',
      Selected: false,
    },
    {
      Id: 3,
      Title: 'Loaded',
      Selected: false,
    },
    {
      Id: 4,
      Title: 'Started',
      Selected: false,
    },
    {
      Id: 5,
      Title: 'Completed',
      Selected: false,
    },
  ],
  FILTER_TYPE: [
    {
      Id: 1,
      Title: 'Delivery ',
      Selected: false,
    },
    {
      Id: 2,
      Title: 'Pickup',
      Selected: false,
    },
    {
      Id: 3,
      Title: 'Service',
      Selected: false,
    },
  ],
  FILTER_SERVICE: [
    {
      Id: 1,
      Title: ' Damage ',
      Selected: false,
    },
    {
      Id: 2,
      Title: 'Maintenance',
      Selected: false,
    },
    {
      Id: 3,
      Title: '  Wash  ',
      Selected: false,
    },
    {
      Id: 4,
      Title: '  Gas  ',
      Selected: false,
    },
  ],
  FILTER_SORT: [
    {
      Id: 1,
      Title: 'Name A-Z ',
      SortBy: 'Name',
      SortOrder: 'asc',
    },
    {
      Id: 2,
      Title: 'Name Z-A',
      SortBy: 'Name',
      SortOrder: 'desc',
    },
    {
      Id: 3,
      Title: 'Address A-Z',
      SortBy: 'Address',
      SortOrder: 'asc',
    },
    {
      Id: 4,
      Title: 'Address Z-A',
      SortBy: 'Address',
      SortOrder: 'desc',
    },
  ],
  WORKLOAD_TYPE: [
    {
      Name: 'Delivery',
      value: 1,
    },
    {
      Name: 'Pickup',
      value: 2,
    },
    {
      Name: 'Service',
      value: 3,
    },
  ],
};
