import React from 'react'
export const MentionBody = (props) => {
    return (
        <>
            <div className="border-2 border-gray-300 block text-left p-6 m-10 text-black shadow-2xl bg-white">
                <p className="">RESULT</p>
                <ul>
                <li className="mt-5"><strong>DateTime:</strong>{props.date}</li>
                <li className="mt-5"><strong>Body:</strong>{props.text}</li>
                {
                    props.mentions && props.mentions.length > 0 &&
                    <li className="mt-5"><strong>Mentions:</strong>[{props.mentions.map((mention, key) =>
                    <span key={key}>'{mention}' {((key + 1) < props.mentions.length) ? ',' : ''}</span>
                    )}]</li>
                }

                </ul>
            </div>
        </>
    )
}

export default MentionBody;
