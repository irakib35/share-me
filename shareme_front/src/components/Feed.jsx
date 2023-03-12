import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

export default function Feed() {
    const [loading, setLoading] = useState(false);
    const categoryId = useParams();
    const [pins, setPins] = useState(null);

    useEffect(() => {
        setLoading(true);        
        if(Object.keys(categoryId).length === 0){
            const query = searchQuery(categoryId);

            client.fetch(query)
                    .then((data) =>{
                        setPins(data);
                        setLoading(false);                        
                    })
        } else{
            client.fetch(feedQuery)
                .then((data) =>{
                    setPins(data);
                    setLoading(false);                    
                })
        }
      
    }, [categoryId])
    
    useEffect(() => {
        setLoading(true);        
        client.fetch(feedQuery)
            .then((data) =>{
                setPins(data);
                setLoading(false);                    
            })        
    }, [])


    if(loading) return <Spinner message='Lastest feed fetching...' />
    return (
        <div>           
            { pins && <MasonryLayout pins={pins} /> }
        </div>
    )
}
