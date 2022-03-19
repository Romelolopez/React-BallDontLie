import React, { useState } from 'react'

const Player = () => {
    const [player, setPlayer] = useState("")
	const [year, setYear] = useState()
	const [playerData, setPlayerData] = useState([])
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState("")
	


	function getPlayer(e){
		e.preventDefault()

        fetch(`https://www.balldontlie.io/api/v1/players?search=${player}`)
        .then((data) => data.json())
		.then(result => {

			return fetch(`https://www.balldontlie.io/api/v1/season_averages?season=${year}&player_ids[]=${result.data[0].id}`)
			.then((data) => data.json())
			.then(res => {

				setPlayerData(res.data)
				setOpen(true)				
			})
			
		})
		.catch(() => {
			setMessage("Please enter an NBA player")
		});
    }

	return (
		<div className="player">
			<h1 className="player-h1">Individual Player Stats</h1>

			<form className="player-form">
				<label>Name:</label>
				<input type="text"  onChange={e => setPlayer(e.target.value)} /> 

				<label className="year-label">Year:</label>
				<input type="text"  onChange={e => setYear(e.target.value)} /> 

				<div className="button-stats" onClick={e => getPlayer(e)} > Submit</div>
			</form>
			{open ? 
			<div>
				
					<div>
						<table>
							<thead>
								<tr>
									<th>Category</th>
									<th>Numbers</th>
								</tr>
							</thead>
							{playerData.map((player, index)=>
							<tbody key = {index}>
							<tr className="player-table-tr">
								<td>Games Played</td>
								<td>{player.games_played}</td>
							</tr>
							<tr className="player-table-tr">
								<td>Min</td>
								<td>{player.min}</td>
							</tr>
							<tr className="player-table-tr">
								<td>Points</td>
								<td>{player.pts}</td>
								
							</tr>
							<tr className="player-table-tr">
								<td>Rebounds</td>
								<td>{player.reb}</td>
							</tr>
							<tr className="player-table-tr">
								<td>Assist</td>
								<td>{player.ast}</td>
							</tr>
							<tr className="player-table-tr">
								<td>Steals</td>
								<td>{player.stl}</td>
							</tr>
							<tr className="player-table-tr">
								<td>Blocks</td>
								<td>{player.blk}</td>
							</tr>
							<tr className="player-table-tr">
								<td>OReb</td>
								<td>{player.oreb}</td>
							</tr>
							<tr className="player-table-tr">
								<td>DReb</td>
								<td>{player.dreb}</td>
							</tr>
							<tr className="player-table-tr">
								<td>FTA</td>
								<td>{player.fta}</td>
							</tr>
							<tr className="player-table-tr">
								<td>FTM</td>
								<td>{player.ftm}</td>
							</tr>
							<tr className="player-table-tr">
								<td>FT%</td>
								<td>{player.ft_pct}</td>
							</tr>
							<tr className="player-table-tr">
								<td>FGA</td>
								<td>{player.fga}</td>
							</tr>
							<tr className="player-table-tr">
								<td>FGM</td>
								<td>{player.fgm}</td>
							</tr>
							<tr className="player-table-tr">
								<td>FG%</td>
								<td>{player.fg_pct}</td>
							</tr>

							<tr className="player-table-tr">
								<td>FG3A</td>
								<td>{player.fg3a}</td>
							</tr>
							<tr className="player-table-tr">
								<td>FG3M</td>
								<td>{player.fg3m}</td>
							</tr>
							<tr className="player-table-tr">
								<td>FG3%</td>
								<td>{player.fg3_pct}</td>
							</tr>
							<tr className="player-table-tr">
								<td>Turnovers</td>
								<td>{player.turnover}</td>
							</tr>
							</tbody>
							)}
						</table>
					</div> 
			
				
			</div> : <p>{message}</p> } 
		</div>
	);
}

export default Player;