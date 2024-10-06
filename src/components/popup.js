import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby";
import { Link } from "gatsby"

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

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hasSeenPopup")

    if (!hasSeenPopup) {
      setIsVisible(true)
    }
  }, [])

  const closePopup = () => {
    setIsVisible(false)
    sessionStorage.setItem("hasSeenPopup", "true")
  }

  const handleSeeMoreClick = () => {
    sessionStorage.setItem("hasSeenPopup", "true")
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="popup-backdrop" onClick={closePopup}>
    <div className="popup-content" onClick={(e) => e.stopPropagation()}>
      <h3>HITY CENOWE</h3>
      <p className="avail">Dostępne do wyczerpania zapasów.</p>
      <p className="buytel">
        Zakup i rezerwacja{" "}
        <a href="tel:+48857474947">tel: 85 74 74 947</a>
      </p>
      <div className="promo-boxes">
        <div className="promo-img-boxes">
          {promotions
            .filter((promo) => promo.inPopup)
            .slice(0, 4)
            .map((promo) => (
              <div key={promo.id} className="promo-one">
                <img src={promo.image} className="promo-img" alt={promo.title} />
                <p>{promo.title}</p>
                <p>{promo.price}</p>
              </div>
            ))}
        </div>
        <Link
          to="/hity-cenowe"
          className="seemorehits"
          onClick={handleSeeMoreClick}
        >
          Zobacz więcej...
        </Link>
      </div>
      <button className="popup-close" onClick={closePopup}>
        X
      </button>
    </div>
  </div>
  );
};

export default Popup;
