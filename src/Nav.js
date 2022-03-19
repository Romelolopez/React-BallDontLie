import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { FiMenu, FiX } from 'react-icons/fi';

const Nav = (props) => {

	const [open, setOpen] = useState(false);

	function close(){
		setOpen(false)
		window.scrollTo(0,0)
	}

  return (

    <nav className="navbar">
    	<Link to="/Home" className="nav-logo" onClick={close}>
			BallDontLie.io
		</Link>
    	<ul className={open ? "nav-links active" : "nav-links"}>
			<li className="nav-item">
				<Link to="/Home" className="nav-link" onClick={close}>
					Home
				</Link>
			</li>
			<li className="nav-item">
				<Link to="/Team" className="nav-link" onClick={close}>
					Team
				</Link>
			</li>
			<li className="nav-item">
				<Link to="/Player" className="nav-link" onClick={close}>
					Player
				</Link>
			</li>
    	</ul>
		<div onClick={() => setOpen(!open)} className="nav-icon">
  			{open ? <FiX style={{color: "#8D2525"}}/> : <FiMenu style={{color: "#8D2525"}}/>}
		</div>
    </nav>
	
  );
}

export default Nav;