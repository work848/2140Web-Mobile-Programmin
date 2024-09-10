// comments are genereated by chatGPT, checked by shijie yang
const APIKEY = 'zeQsx3zqSy';

const baseURL = 'https://comp2140.uqcloud.net/api/';

/**
 * Fetches all available samples.
 * @returns {Array} An array of samples.
 */
export async function getSamples() {
    const url = `${baseURL}sample/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

/**
 * Fetches a specific sample by ID.
 * @param {number|string} id - The ID of the desired sample.
 * @returns {Object} The sample object.
 */
export async function getSample(id) {
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

/**
 * Fetches all available locations.
 * @returns {Array} An array of locations.
 */
export async function getlocations() {
    const url = `${baseURL}location/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

/**
 * Fetches a specific location by ID.
 * @param {number|string} id - The ID of the desired location.
 * @returns {Object} The location object.
 */
export async function getlocation(id) {
    const url = `${baseURL}location/${id}/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
}
/**
 * Fetches all sample-to-location mappings.
 * @returns {Array} An array of sample-to-location objects.
 */

export async function getSampleToLocations() {
    const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

/**
 * Creates a new sample.
 * @param {Array} recording_data - The recording data of the sample.
 * @param {string} type - The type of the sample.
 * @param {string} inputValue - The name of the sample.
 * @returns {Object} The created sample object.
 */
export async function Createsample(recording_data, type, inputValue) {

    const url = `${baseURL}sample/?api_key=${APIKEY}`;

    const data = {
                    'api_key': APIKEY,
                    'name': inputValue, 
                    'recording_data': JSON.stringify(recording_data),
                    'type': String(type),
                 }

    const response = await fetch(url, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
  });
  const json = await response.json();
  return json;
}

/**
 * Updates an existing sample by ID.
 * @param {string} id - The ID of the sample to be updated.
 * @param {Array} recording_data - The new recording data of the sample.
 * @param {string} type - The new type of the sample.
 * @param {string} inputValue - The new name of the sample.
 * @returns {Object} The updated sample object.
 */
export async function Updatesample(id,recording_data, type, inputValue) {

      const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
  
      const data = {
                      "id":id,
                      "api_key": "zeQsx3zqSy",
                      "name": inputValue,
                      'recording_data': JSON.stringify(recording_data),
                      "type": type,
                      "datetime": null
                   }
  
      const response = await fetch(url, {
          method: "PUT",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}

/**
 * Links a sample to a location.
 * @param {number} Sample_id - The ID of the sample.
 * @param {number} location_id - The ID of the location.
 * @returns {Object} The created sample-to-location object.
 */
export async function SampleLocation(Sample_id,location_id) {

      const url = `${baseURL}sampletolocation/?api_key=${APIKEY}`;
  
      const data = {
          "api_key": APIKEY,
          "sample_id": Sample_id,
          "location_id": location_id
      }
  
      const response = await fetch(url, {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}
/**
 * Deletes a sample-to-location instance by its ID.
 * @param {number} id - The ID of the sample-to-location mapping.
 */
export async function SampleLocationDelete(id) {

    const url = `${baseURL}sampletolocation/${id}/?api_key=${APIKEY}`;
      const response = await fetch(url, {
          method: "DELETE",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
        
          
    });
  }
