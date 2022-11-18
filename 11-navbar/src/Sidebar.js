import React from 'react'
import { links, social } from './data'

const Sidebar = () => {
    return (
        <>
            <h4>Sidebar</h4>
            <div className='links-container show-container'>
                <ul className='links'>
                    {/* 
                    <li>
                        <a href="#">home</a>
                    </li>
                    <li>
                        <a href="#">about</a>
                    </li>
                    <li>
                        <a href="#">projects</a>
                    </li>
                    <li>
                        <a href="#">products</a>
                    </li> 
                    */}

                    {links.map((link) => {
                        const { id, url, text } = link;
                        return (
                            <li key={id}>
                                <a href={url}>{text}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}

export default Sidebar