CREATE TABLE products(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(80) NOT NULL,
  price varchar,
  description varchar(2000)
);


-- Insert some animals (C in CRUD - Create)
INSERT INTO products
  (name, price, description)
VALUES
  ('Green Fitness Stringer', 17.95, 'Description 1'),
  ('Pink Water Bottle', 17.95, 'Description 2'),
  ('Green Joggers', 17.95, 'Description 3'),
  ( 'Blue Joggers', 17.95, 'Description 4'),
  ('White Performance Shirt', 17.95, 'Description 5'),
  ('Grey Bag', 17.95, 'Description 6');

-- Read some animals (R in CRUD - Read)
SELECT * FROM animals;
