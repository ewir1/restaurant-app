import React, { useContext, useEffect, useState } from 'react';

import { FirebaseContext } from '../../firebase';
import { Link } from 'react-router-dom';
import Platillo from '../ui/Platillo';

const Menu = () => {
  const { firebase } = useContext(FirebaseContext);
  const [platillos, guardarPlatillos] = useState([]);

  useEffect(() => {
    const obtenerPlatillos = () => {
      firebase.db.collection('productos').onSnapshot(manejarSnapshot);
    };

    obtenerPlatillos();
  }, [firebase]);

  // snapshot permite utilizar la db en tiempo real
  function manejarSnapshot(snapshot) {
    const platillos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    guardarPlatillos(platillos);
  }

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Desde Menu</h1>
      <Link
        to="/nuevo-platillo"
        className="bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Agregar Platillo
      </Link>

      {platillos.map((platillo) => (
        <Platillo key={platillo.id} platillo={platillo} />
      ))}
    </>
  );
};

export default Menu;
