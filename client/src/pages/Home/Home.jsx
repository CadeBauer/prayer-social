import React from 'react';
import Feed from '../../components/Feed/feed';
import './home.css'
import Share from '../../components/Share/Share'


export default function Home() {
    return (
        <div className="background">
            <div className="homeContainer">
                <Share/>
                <Feed userID="0"/>
            </div>
        </div>
    )
}