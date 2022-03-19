import React, { useEffect, useState } from 'react'

const Team = () => {
    const [team, setTeam] = useState("")
	const [year, setYear] = useState()
	const [teamData, setTeamData] = useState([])
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState("")
	const apiKEY = process.env.REACT_APP_RAPIDIMG
  

	function getTeam(e){

		e.preventDefault()
    	let obj ={}
		fetch("https://free-nba.p.rapidapi.com/teams?page=0", {
					"method": "GET",
					"headers": {
						"x-rapidapi-host": "free-nba.p.rapidapi.com",
						"x-rapidapi-key": apiKEY
					}
				})
				.then((data) => data.json())
				.then(res => {
					for (var i = 0; i < res.data.length; i++){
						obj = {...obj, [`${res.data[i].name}`]:res.data[i].id}
					}
					
					return fetch(`https://www.balldontlie.io/api/v1/games?seasons[]=${year}&team_ids[]=` + obj[team] + "&per_page=82&postseason=false")
					.then((data) => data.json())
					.then(result => {
						console.log(result.data)
						setTeamData(result.data)
						setOpen(true)
					})
					.catch(() => {
						setMessage("Please enter an NBA team")
						console.log("Please enter an NBA team")
					});
				})

		}
		
		useEffect(() => {
			console.log(team)
		},[team])
    

  return (
    <div className="team">
        <h1 className="player-h1">Team Season</h1>
		<form className="player-form">

			<label>Name:</label>
			<input type="text"  onChange={e => setTeam(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))} /> 

			<label className="year-label">Year:</label>
			<input type="text"  onChange={e => setYear(e.target.value)} />

			<div className="button-stats" onClick={e => getTeam(e)} > Submit</div>
			
    	</form>
		
		{open ? <div>
				<table className="team-table">
					<thead>
					<tr>
						<th className="team-table-th">Date</th>
						<th className="team-table-th">Home Team</th>
						<th className="team-table-th">Home Team Score</th>
						<th className="team-table-th">Visitor Team</th>
						<th className="team-table-th">Visitor Team Score</th>
					</tr>
					</thead>
					{teamData?.sort((a, b) => a.id - b.id).map((team, index)=> 
					<tbody key = {index} className="team-table-body">
					<tr>
						<td>{team.date.substring(0,10)}</td>
						<td>{team.home_team.name}</td>
						<td>{team.home_team_score}</td>
						<td>{team.visitor_team.name}</td>
						<td>{team.visitor_team_score}</td>
					</tr>
					</tbody>
					)}
				</table>
			</div> : <p>{message}</p>}
			
		

        
    </div>
      
    
  );
}

export default Team;