const {PlacesClient } = require('@googlemaps/places').v1
const dotenv = require('dotenv')
dotenv.config

const places_client = new PlacesClient()


async function searchByTxt(searchVal){
    const request = {
    textQuery : searchVal
}
 const response = await places_client.searchText(request, {
    otherArgs: {
      headers: {
        'X-Goog-FieldMask': '*',
      },
    },
  });
  return response[0].places
}

module.exports = {searchByTxt }