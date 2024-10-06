import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Header from "../components/header";
import Seo from "../components/seo";

const Hits = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Pobieranie wszystkich plików JSON z katalogu "promotions"
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "promotions" }, extension: { eq: "json" } }) {
        nodes {
          childDataJson {
            id
            title
            price
            image
            inPopup
          }
        }
      }
    }
  `);

  // Łączenie danych z wszystkich plików JSON
  const promotions = data.allFile.nodes.map(node => node.childDataJson);

  // Filtracja promocji, które są wyświetlane w popupie
  const popupPromotions = promotions.filter(promo => promo.inPopup);

  // Pozostałe promocje (nie wyświetlane w popupie)
  const remainingPromotions = promotions.filter(promo => !promo.inPopup);

  return (
    <div className="wrapper">
      <Seo title="Ceramika Białystok - Hity cenowe" description="Najlepsze promocje w Białymstoku" />
      <Header onMenuToggle={isOpen => setIsMenuOpen(isOpen)} />

      <section className={isMenuOpen ? "blurred" : ""} id="hits">
        <h3>HITY CENOWE</h3>
        <p className="avail">Dostępne do wyczerpania zapasów</p>
        <p className="buytel">
          Zakup i rezerwacja <a href="tel:+48857474947">tel: 85 74 74 947</a>
        </p>

        {/* Promocje wyświetlane w popupie (maksymalnie 4) */}
        <div className="promo-boxes">
          {popupPromotions.map((promo) => (
            <div key={promo.id} className="promo-one">
              <img src={promo.image} className="promo-img" alt={promo.title} />
              <p>{promo.title}</p>
              <p>{promo.price}</p>
            </div>
          ))}
        </div>

        <hr />

        {/* Pozostałe promocje */}
        <div className="promo-boxes">
          {remainingPromotions.map((promo) => (
            <div key={promo.id} className="promo-one">
              <img src={promo.image} className="promo-img" alt={promo.title} />
              <p>{promo.title}</p>
              <p>{promo.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hits;
