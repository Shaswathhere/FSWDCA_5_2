import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [multiple, setMultiple] = useState(false)
    const [data, setData] = useState([])
    const [ID, setID] = useState(0);
    const [Name, setName] = useState("")
    const [Gender, setGender] = useState("")

    useEffect(()=>{
        fetchUser()
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            if (isRunning) {
                setTime((prevTime) => prevTime + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning]);

    const handlePause = () => {
        setIsRunning((prevState) => !prevState)
        document.cookie = `timerTime=${time}`
    }
    const handleStop = () => {
        setIsRunning(false)
        setTime(0)
        document.cookie = 'timerTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    const formatTime = (time) => {
        const min = Math.floor(time / 60)
        const sec = time % 60
        return sec
    }
    const handleMultiple = () => {
        if(time % 2 === 0){
            const style = {border: '3px solid red', color: 'red'}
            return style
        }
    }
    const fetchUser = async() => {
        try{
            const res = await fetch('http://localhost:8888/get')
            const data = await res.json()
            setData(data)
        } catch(err){
            console.log('Error',err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8888/add', {ID, Name, Gender})
        .then((res)=>{
            console.log(res)
            window.location.reload()
        }) .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
            <h1>Timer</h1>
            <div style={handleMultiple()}>
                <div id='timer'><b>{formatTime(time)}</b></div>
                <button onClick={handlePause}>{isRunning ? "Pause":"Play"}</button>
                <button onClick={handleStop}>Stop</button>
            </div>
            <div>
                {data.map((user)=>(
                    time === user.ID ? (<><h3>{user.Name}</h3></>) : null
                ))}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>ID</label>
                    <input onChange={(e)=>setID(e.target.value)}></input>
                    <label>Name</label>
                    <input onChange={(e)=>setName(e.target.value)}></input>
                    <label>Gender</label>
                    <input onChange={(e)=>setGender(e.target.value)}></input>
                    <button>Submit</button>
                </form>
            </div>
            <div>
                {data.map((user)=>{
                    <h3>{user.ID}</h3>
                })}
            </div>
        </>
    )
}

export default Timer
