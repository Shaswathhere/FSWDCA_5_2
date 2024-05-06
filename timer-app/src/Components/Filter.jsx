import React, { useEffect, useState } from 'react';

function Filter() {
    const [data, setData] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await fetch('http://localhost:8888/get');
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            setData(data);
        } catch (err) {
            console.log('Error', err);
        }
    };

    const handleSelectedGenderChange = (e) => {
        setSelectedGender(e.target.value);
    };

    const filteredData = selectedGender ? data.filter(user => user.Gender === selectedGender) : data;

    return (
        <>
            <div>
                <select onChange={handleSelectedGenderChange} value={selectedGender}>
                    <option value="">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <div className='data'>
                {filteredData.map((user) => (
                    <div className='lists'>
                            <h3>ID: {user.ID}</h3>
                            <h3>Name: {user.Name}</h3>
                            <h3>Gender: {user.Gender}</h3>
                    </div>
                ))}
                </div>
            </div>
        </>
    );
}

export default Filter;
