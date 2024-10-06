import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Header from "../components/header"
import Seo from "../components/seo"
import promo1 from "/static/images/promo11.webp"
import promo2 from "/static/images/promo22.webp"
import promo3 from "/static/images/promo33.webp"
import promo4 from "/static/images/promo44.webp"
import promo5 from "/static/images/promo55.webp"
import promo6 from "/static/images/promo66.webp"
import promo7 from "/static/images/promo77.webp"
import promo8 from "/static/images/promo88.webp"

const Hits = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
  `)

  const promotions = data.allPromotionsJson.nodes
  const popupPromotions = promotions.filter(promo => promo.inPopup)
  const remainingPromotions = promotions.filter(promo => !promo.inPopup)

  return (
    <div className="wrapper">
      <Seo title="Ceramika Białystok - Hity cenowe" description="ee" />
      <Header onMenuToggle={isOpen => setIsMenuOpen(isOpen)} />

      <section className={isMenuOpen ? "blurred" : ""} id="hits">
        <h3>HITY CENOWE</h3>
        <p className="avail">Dostępne do wyczerpania zapasów</p>
        <p className="buytel">
          Zakup i rezerwacja <a href="tel:+48857474947">tel: 85 74 74 947</a>
        </p>

        <div className="promo-boxes">
          <div className="promo-img-boxes">
            {popupPromotions.map(promo => (
              <div key={promo.id} className="promo-one">
                <img
                  src={promo.image}
                  className="promo-img"
                  alt={promo.title}
                />
                <p>{promo.title}</p>
                <p>{promo.price}</p>
              </div>
            ))}
          </div>

          <hr></hr>

          <div className="promo-img-boxes">
            {remainingPromotions.slice(0, 4).map(promo => (
              <div key={promo.id} className="promo-one">
                <img
                  src={promo.image}
                  className="promo-img"
                  alt={promo.title}
                />
                <p>{promo.title}</p>
                <p>{promo.price}</p>
              </div>
            ))}
          </div>

          <hr></hr>
        </div>

        {/* <div className="promo-boxes">
          <div className="promo-img-boxes">
            <div className="promo-one">
              <img src={promo5} className="promo-img" alt="PORTLAND" />
              <p>PORTLAND DRĄŻONA LDF10 290x115x52mm</p>
              <p>4,50 zł/szt</p>
            </div>
            <div className="promo-one">
              <img src={promo6} className="promo-img" alt="STRATFORD" />
              <p>STRATFORD PEŁNA VNF81 240x115x71mm</p>
              <p>6,40 zł/szt</p>
            </div>
          </div>

          <hr></hr>

          <div className="promo-img-boxes">
            <div className="promo-one">
              <img src={promo7} className="promo-img" alt="VICTORIA" />
              <p>VICTORIA PEŁNA VNF57 240x115x71mm</p>
              <p>6,40 zł/szt</p>
            </div>
            <div className="promo-one">
              <img src={promo8} className="promo-img" alt="PRADO" />
              <p>PRADO RĘCZNIE FORMOWANA 215x100x65mm</p>
              <p>3,99 zł/szt</p>
            </div>
          </div>
        </div> */}
      </section>

      <section
        className={`${isMenuOpen ? "blurred contactmaps" : "contactmaps"}`}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d38298.791121565555!2d23.138007774676755!3d53.13398941076129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ffedad7d8a0fb%3A0xadd01a635f0ed3b3!2sCERAMIKA%20HMB%20-%20Ceg%C5%82y%20klinkierowe!5e0!3m2!1spl!2spl!4v1720721145919!5m2!1spl!2spl"
          height="400"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className={`${isMenuOpen ? "blurred" : ""}`} id="footer">
        <div className="logo-footer">
          <img src={promo1} />
        </div>
        <div className="medium-flex">
          <div className="partners">
            <Link to="/producenci">Producenci</Link>
            <Link to="/partnerzy">Partnerzy</Link>
          </div>
          <div className="contact-footer">
            <a>Viber: +48857474947</a>
            <a
              href="https://www.facebook.com/profile.php?id=100054375226875&ref=embed_page"
              target="_blank"
            >
              <img src={promo2} alt="Facebook" /> Facebook
            </a>
          </div>
        </div>
        <div className="partnersd">
          <Link to="/producenci">Producenci</Link>
          <Link to="/partnerzy">Partnerzy</Link>
        </div>
        <div className="contact-footerd">
          <a>Viber: +48857474947</a>
          <a
            href="https://www.facebook.com/profile.php?id=100054375226875&ref=embed_page"
            target="_blank"
          >
            <img src={promo2} alt="Facebook" /> Facebook
          </a>
        </div>
      </section>
    </div>
  )
}

export default Hits
