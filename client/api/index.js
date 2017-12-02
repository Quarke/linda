import feathers from 'feathers/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';
import feathersStorage from '@/utils/feathers-storage';
import rest from 'feathers-rest/client';
import axios from 'axios';

let rest_url;
if (process.env.PORT) {
  rest_url = 'https://blooming-badlands-21562.herokuapp.com'
} else {
  rest_url = 'http://localhost:3030'
}


const api = feathers()
  .configure( rest(rest_url).axios(axios) )
  .configure( hooks() )
  .configure( auth({ storage: feathersStorage }) )

export default api;
