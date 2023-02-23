CREATE TABLE users(
  id INTEGER NOT NULL UNIQUE,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  rol TEXT NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE inventario(
  id INTEGER NOT NULL,
  nombre TEXT NOT NULL,
  cantidad INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT)
);

CREATE TABLE ventas(
  id INTEGER NOT NULL UNIQUE,
  user_id INTERGER NOT NULL,
  cliente TEXT NOT NULL,
  fecha DATE NOT NULL,
  total INTEGER NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

/* TODO: necesario? sino como vamos a saber los productos
 que se vendieron en cada venta? */
CREATE TABLE producto_ventas(
  id INTEGER NOT NULL UNIQUE,
  id_venta INTEGER NOT NULL,
  id_producto INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  cantidad INTEGER NOT NULL,
  PRIMARY KEY("id" AUTOINCREMENT),
  FOREIGN KEY (id_venta) REFERENCES ventas(id),
  FOREIGN KEY (id_producto) REFERENCES inventario(id)
);

