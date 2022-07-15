

const getBaseUrl = () => {
  let url;
  switch(process.env.NODE_ENV) {
    case 'production':
      url = 'https://coffee--link.herokuapp.com/';
      break;
    case 'development':
    default:
      url = 'http://localhost:5000/';
  }

  return url;
}

export default axios.create({
  baseURL: getBaseUrl(),
});