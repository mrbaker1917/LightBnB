const pg = require('pg')
const Pool = pg.Pool;
const config = {
  user: 'development',
  password: 'development',
  database: 'lightbnb',
  host: 'localhost',
  port: 5432
}
const client = new Pool(config);

client.connect(() => {
  console.log(`Successfully connected to the database!`);
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const soughtEmail = email.toLowerCase();
  const values = [soughtEmail];
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  return client.query(queryString, values)
    .then(res => {
      if (res.rows.length === 0) {
        return null;
      } else {
        return res.rows[0];
      }
    })
    .catch(e => {
      return e;
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const values = [id];
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  return client.query(queryString, values)
    .then(res => {
      if (res.rows.length === 0) {
        return null;
      } else {
        return res.rows[0];
      }
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  const { name, email, password } = user;
  const values = [name, email, password];
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING*;
  `;
  return client.query(queryString, values)
    .then(res => {
      return res.rows[0];
    });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const values = [guest_id, limit];
  const queryString = `
  SELECT properties.*, reservations.*, AVG(property_reviews.rating) AS average_rating
  FROM reservations
  JOIN properties ON (reservations.property_id = properties.id)
  JOIN property_reviews ON (property_reviews.property_id = properties.id)
  WHERE reservations.guest_id = $1 
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2;
  `;
  return client.query(queryString, values)
    .then(res => {
      return res.rows;
    });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * 
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  //const { city, owner_id, minimum_price_per_night, maximum_price_per_night, minimum_rating } = options;
  const values = [];
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating 
    FROM properties
    JOIN property_reviews ON (properties.id = property_reviews.property_id)
  `;
  if (options.city) {
    values.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${values.length} `
  }
  if (options.owner_id) {
    values.push(options.owner_id);
    queryString += `AND owner_id = $${values.length} `
  }
  if (options.minimum_price_per_night) {
    values.push(options.minimum_price_per_night);
    queryString += `AND cost_per_night/100 >= $${values.length} `
  }
  if (options.maximum_price_per_night) {
    values.push(options.maximum_price_per_night);
    queryString += `AND cost_per_night/100 < $${values.length} `
  }
  queryString += `GROUP BY properties.id `;
  if (options.minimum_rating) {
    values.push(options.minimum_rating);
    queryString += `HAVING AVG(property_reviews.rating) >= $${values.length} `
  }
  queryString += `ORDER BY cost_per_night `
  values.push(limit);
  queryString += `LIMIT $${values.length};`;

  return client.query(queryString, values)
    .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const { owner_id, title, description, thumbnail_photo_url, cover_photo_url,
    cost_per_night, street, city, province, post_code, country, parking_spaces,
    number_of_bathrooms, number_of_bedrooms } = property;
  const values = [owner_id, title, description, thumbnail_photo_url, cover_photo_url,
    cost_per_night, street, city, province, post_code, country, parking_spaces,
    number_of_bathrooms, number_of_bedrooms];
  const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, 
    cost_per_night, street, city, province, post_code, country, parking_spaces,
    number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING*;
  `;
  return client.query(queryString, values)
    .then(res => {
      console.log(res.rows[0]);
      return res.rows[0];
    });
}
exports.addProperty = addProperty;
