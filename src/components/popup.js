import React from "react";
import { graphql, useStaticQuery } from "gatsby";

const Popup = () => {
  // Pobieranie wszystkich plików JSON z katalogu "promotions"
  const data = useStaticQuery(graphql`
    query {
      allPromotionsJson {
        nodes {
          id
          title
          price
          image
          inPopup
        }
      }
    }
  `);

  // Łączenie danych z wszystkich plików JSON
  const promotions = data.allPromotionsJson.nodes;

  return (
    <div className="promo-boxes">
      {promotions
        .filter(promo => promo.inPopup)
        .slice(0, 4)
        .map((promo) => (
          <div key={promo.id} className="promo-one">
            <img src={promo.image} className="promo-img" alt={promo.title} />
            <p>{promo.title}</p>
            <p>{promo.price}</p>
          </div>
        ))}
    </div>
  );
};

export default Popup;
