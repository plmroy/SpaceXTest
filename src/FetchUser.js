import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';
function FetchUser() {
    const [posts, setPosts] = useState([])
    const [year, setYear] = useState('')
    const [launch, setLaunch] = useState(true)
    const [landing, setLanding] = useState(true)
    const apiUrl = 'https://api.spaceXdata.com/v3/launches?limit=100';
 
    useEffect(() => {
        axios.get(`${apiUrl}&launch_success=${launch}&land_success=${landing}&launch_year=${year}`)
        .then(res => {
            setPosts(res.data)
            year ? setYear(year) : setYear('');           
            setLaunch(launch);    
            setLaunch(landing);           
        })
        .catch(err =>{
        })
    },[year,launch,landing])
  
    const uniqueyear = [];
    posts.forEach((item, index) => { 
        if(!(uniqueyear.includes(item.launch_year))){
             uniqueyear.push(item.launch_year)
           }          
      })        
   return (
    <section className="wrapper">
    <h1 className="heading">SpaceX Launch Programs</h1>
    <section className="left-section"> 
    <h2 className="filter">Filters</h2>  
    <h2 className="launch-year">Launch Year</h2>
    <hr size="3" color="#ccc"  />     
   
    <ul>
        {
         uniqueyear.map(function (value) {
                return ( <li className="li-list"  onClick={e => setYear(e.target.innerText)}>{value}</li> )   
               
            })
         }
    </ul>  
    <h2 className="launch-year">Successful Launch</h2>
    <hr size="3" color="#ccc" />   
    <div className="li-list" onClick={e => setLaunch(e.target.innerText)}>true</div> 
    <div className="li-list" onClick={e => setLaunch(e.target.innerText)}>false</div> 

    <h2 className="launch-year">Successful Landing</h2>
    <hr size="3" color="#ccc" />   
    <div className="li-list" onClick={e => setLanding(e.target.innerText)}>true</div> 
    <div className="li-list" onClick={e => setLanding(e.target.innerText)}>false</div>
   
</section>
<section className="right-section">
 {
posts.map(item => {
   return (       
   <div className="right-div">
        <img className="spaceXimg" alt={item.mission_name} src={item.links.mission_patch_small}/>
        <div className="img-content">
            <h3 className="missionTitle">{item.mission_name}</h3>
            <h3>Mission ids: {item.mission_id}</h3>
            <h3>Launch Year: {item.launch_year}</h3>
            <h3>successful launch : {item.launch_success}</h3>
            <h3>successful landing :{item.land_success}</h3>
        </div>
    </div> 
   )
})
}
</section>
<div className="footer">Developed by: Poulami Roy</div> 
</section>
   )    
}

export default FetchUser