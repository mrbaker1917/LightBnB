INSERT INTO users (name, email, password) VALUES ('Mark Baker', 'mrbaker1917@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Lily Baker-McCue', 'LilyBM1917@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Jasper Baker-McCue', 'Jasper1917@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users (name, email, password) VALUES ('Mary McCue', 'memccue1917@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1, 'Cute suite in Sidney', 'description', 'https://lightbnb.com/img/205t', 'https://lightbnb.com/img/205c', 150, 1, 1, 1, 'Canada', 'Deerbrush Crescent', 'North Saanich', 'BC', 'V8L0C5', true);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (2, 'Cute suite in Saanich', 'description', 'https://lightbnb.com/img/206t', 'https://lightbnb.com/img/206c', 155, 2, 1, 1, 'Canada', 'Deerbrush Crescent', 'North Saanich', 'BC', 'V8L0C7', true);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (3, 'Cute suite in Saanichton', 'description', 'https://lightbnb.com/img/207t', 'https://lightbnb.com/img/207c', 125, 1, 1, 1, 'Canada', 'Deerbrush Crescent', 'North Saanich', 'BC', 'V8L0C8', true);
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (4, 'Cute suite in Victoria', 'description', 'https://lightbnb.com/img/208t', 'https://lightbnb.com/img/208c', 175, 1, 1, 1, 'Canada', 'Wood Violet Crescent', 'North Saanich', 'BC', 'V8L0C3', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2020-10-28', '2020-10-31', 1, 2);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2020-11-28', '2020-11-30', 3, 4);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2020-12-28', '2020-12-31', 4, 1);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2020-09-28', '2020-09-30', 3, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (1, 2, 3, 4, 'Great place!');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (2, 3, 4, 1, 'Not bad place!');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (3, 4, 1, 2, 'Terrible place!');
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (4, 1, 2, 3, 'Amazing place!');