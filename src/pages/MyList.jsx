import React from 'react';
import Header from '../components/Header/Header';
import './MyList.css';

const MyList = () => {
  return (
    <div className="my-list">
      <Header />
      <div className="my-list__content">
        <h1 className="my-list__title">Ma liste</h1>
        <p className="my-list__empty">
          Votre liste est vide. Ajoutez des films et séries pour les retrouver ici.
        </p>
      </div>
    </div>
  );
};

export default MyList;
