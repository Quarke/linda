import feathers from 'feathers/client';
import auth from 'feathers-authentication-client';
import hooks from 'feathers-hooks';
import feathersStorage from '@/utils/feathers-storage';
import rest from 'feathers-rest/client';
import axios from 'axios';

const api = feathers()
  .configure( rest('http://localhost:3030').axios(axios) )
  .configure( hooks() )
  .configure( auth({ storage: feathersStorage }) )

export default api;
