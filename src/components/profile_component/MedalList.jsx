import React, { useState } from 'react';
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MedalTrofeo from "../../asset/medaglie/medaglia-trofeo.png";
import MedalPlayer from "../../asset/medaglie/medaglia_attivismo-removebg-preview.png";
import MedalCrafter from "../../asset/medaglie/medaglia_creatore-removebg-preview.png";
import MedalPioniere from "../../asset/medaglie/medaglia_pioniere-removebg-preview.png";
import MedalCampione from "../../asset/medaglie/medaglie_campione.png";
import MedalStar from "../../asset/medaglie/medaglie_nuovastella-removebg-preview.png";
import MedalProPlayer from "../../asset/medaglie/medaglie_proplayer.png";
import MedalTopDiGamma from "../../asset/medaglie/medaglie_topdigamma.png";
import './style.css';

export default function MedalList() {
  const profile = useSelector(state => state.user.profile);
  const [tooltips, setTooltips] = useState({
    star: '',
    crafter: '',
    player: '',
    pioniere: '',
    proPlayer: '',
    trofeo: '',
    topDiGamma: '',
    campione: ''
  });

  const handleMobileClick = (medalKey) => {
    console.log(`Medaglia ${medalKey} cliccata`);
  };

  return (
    <>
      {profile && <Row id="medal">
        <Col sm={6} md={3}>
          <div 
            onMouseEnter={() => setTooltips({ ...tooltips, star: 'Obiettivo: Nuova stella' })} 
            onMouseLeave={() => setTooltips({ ...tooltips, star: '' })}
            onClick={() => handleMobileClick('star')}
          >
            <img src={MedalStar} alt="medaglia stella" width={150} height={150} />
          </div>
          {tooltips.star && <div className="custom-tooltip">{tooltips.star}</div>}
        </Col>
        <Col sm={6} md={3}>
          <div 
            onMouseEnter={() => setTooltips({ ...tooltips, crafter: profile.createdGames >= 10 ? '' : 'Obiettivo: Crea 10 eventi' })} 
            onMouseLeave={() => setTooltips({ ...tooltips, crafter: '' })}
            onClick={() => handleMobileClick('crafter')}
          >
            <img src={MedalCrafter} alt="medaglia creatore" width={150} height={150} className={profile.createdGames >= 10 ? '' : 'unlocked'} />
          </div>
          {tooltips.crafter && <div className="custom-tooltip">{tooltips.crafter}</div>}
        </Col>
        <Col sm={6} md={3}>
          <div 
            onMouseEnter={() => setTooltips({ ...tooltips, player: profile.games >= 10 ? '' : 'Obiettivo: Partecipa a 10 eventi' })} 
            onMouseLeave={() => setTooltips({ ...tooltips, player: '' })}
            onClick={() => handleMobileClick('player')}
          >
            <img src={MedalPlayer} alt="medaglia giocatore" width={150} height={150} className={profile.games >= 10 ? '' : 'unlocked'} />
          </div>
          {tooltips.player && <div className="custom-tooltip">{tooltips.player}</div>}
        </Col>
        <Col sm={6} md={3}>
          <div 
            onMouseEnter={() => setTooltips({ ...tooltips, pioniere: profile.createdGames >= 20 ? '' : 'Obiettivo: Crea 20 eventi' })} 
            onMouseLeave={() => setTooltips({ ...tooltips, pioniere: '' })}
            onClick={() => handleMobileClick('pioniere')}
          >
            <img src={MedalPioniere} alt="medaglia pioniere" width={150} height={150} className={profile.createdGames >= 20 ? '' : 'unlocked'} />
          </div>
          {tooltips.pioniere && <div className="custom-tooltip">{tooltips.pioniere}</div>}
        </Col>
        <Col sm={6} md={3}>
          <div 
            onMouseEnter={() => setTooltips({ ...tooltips, proPlayer: profile.games >= 20 ? '' : 'Obiettivo: Partecipa a 20 eventi' })} 
            onMouseLeave={() => setTooltips({ ...tooltips, proPlayer: '' })}
            onClick={() => handleMobileClick('proPlayer')}
          >
            <img src={MedalProPlayer} alt="medaglia pro player" width={150} height={150} className={profile.games >= 20 ? '' : 'unlocked'} />
          </div>
          {tooltips.proPlayer && <div className="custom-tooltip">{tooltips.proPlayer}</div>}
        </Col>
        <Col sm={6} md={3}>
          <div 
            onMouseEnter={() => setTooltips({ ...tooltips, trofeo: profile.createdGames >= 100 ? '' : 'Obiettivo: Crea 100 eventi' })} 
            onMouseLeave={() => setTooltips({ ...tooltips, trofeo: '' })}
            onClick={() => handleMobileClick('trofeo')}
          >
            <img src={MedalTrofeo} alt="medaglia trofeo" width={150} height={150} className={profile.createdGames >= 100 ? '' : 'unlocked'} />
          </div>
          {tooltips.trofeo && <div className="custom-tooltip">{tooltips.trofeo}</div>}
        </Col>
        <Col sm={6} md={3}>
          <div 
            onMouseEnter={() => setTooltips({ ...tooltips, topDiGamma: profile.games >= 200 ? '' : 'Obiettivo: Partecipa a 200 eventi' })} 
            onMouseLeave={() => setTooltips({ ...tooltips, topDiGamma: '' })}
            onClick={() => handleMobileClick('topDiGamma')}
          >
            <img src={MedalTopDiGamma} alt="medaglia top di gamma" width={150} height={150} className={profile.games >= 200 ? '' : 'unlocked'} />
          </div>
          {tooltips.topDiGamma && <div className="custom-tooltip">{tooltips.topDiGamma}</div>}
        </Col>
        <Col sm={6} md={3}>
          <div 
            onMouseEnter={() => setTooltips({ ...tooltips, campione: profile.createdGames >= 500 ? '' : 'Obiettivo: Crea 500 eventi' })} 
            onMouseLeave={() => setTooltips({ ...tooltips, campione: '' })}
            onClick={() => handleMobileClick('campione')}
          >
            <img src={MedalCampione} alt="medaglia campione" width={150} height={150} className={profile.createdGames >= 500 ? '' : 'unlocked'} />
          </div>
          {tooltips.campione && <div className="custom-tooltip">{tooltips.campione}</div>}
        </Col>
      </Row>}
    </>
  );
}