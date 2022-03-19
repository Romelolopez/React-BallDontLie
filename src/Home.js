import React, { useEffect, useState } from 'react'
import Nav from "./Nav"
import Player from "./Player"
import Team from "./Team"
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';


const Home = () => {

    //States
    const [allPlayers, setAllPlayers] = useState([])
	//Math.floor(Math.random() * 3756)
    let [count, setCount] = useState(1)
	const [image, setImage] = useState("")
	const bingIMG = process.env.REACT_APP_RAPIDIMG

	

	function getPlayer(){
		let playerName
		fetch(`https://www.balldontlie.io/api/v1/players?page=` + count + `&per_page=1`)
        .then((data) => data.json())
		.then(result => {
			console.log(result.data)
			
			playerName = `${result.data[0].first_name} ${result.data[0].last_name}`.replace(" ", "%20")
			return fetch(`https://bing-image-search1.p.rapidapi.com/images/search?q=${playerName}&count=5`, 
			{
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
				"x-rapidapi-key": bingIMG
				}
			})
			.then((data) => data.json())
			.then(res => {
				setAllPlayers(result.data)
				setImage(res.queryExpansions[0].thumbnail.thumbnailUrl)
			})
		})
	}

    useEffect(() => {
        
		getPlayer()
		//re-render because when count changes the API link changes and we need the new info
    }, [count])


    function handleClickPlus(){
		setCount(count => count + 1)
	}
	
	function handleClickMinus(){
		if (count > 1){
			setCount(count = count - 1)
		}

	}

  return (
    
    <div className="home">
 
		<Router>
		<Nav />
		<Switch>
			<Route exact path="/"><Redirect to="/Home" /></Route>
			<Route path="/Home">

			<h1 className="home-h1">WELCOME</h1>
			<h3>Search Your favorite player and team stats!</h3>
			{allPlayers.map((player, index) =>
			
				<div key={index} className="player-card-container">
					
						<div className="player-card">
							<p>{player.first_name} {player.last_name}</p>
							<div className="landscape">	
								<img src={image}></img>
							</div>
							<p>Team: {player.team.full_name}</p>
						
						</div>
					
					<div className="buttons-container">
						<div onClick={handleClickMinus}><BsArrowLeftCircle style={{color: "#8D2525", fontSize: "2em"}}/></div>
						<div onClick={handleClickPlus}><BsArrowRightCircle style={{color: "#8D2525", fontSize: "2em"}}/></div>
					</div>

				</div>
				
			
			)}	
				
			</Route>
			<Route path="/Team" component={Team}></Route>
			<Route path="/Player" component={Player}></Route>
			
		</Switch>
		</Router>
		
    </div>
      
    
  );
}

export default Home;