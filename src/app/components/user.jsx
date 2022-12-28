import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";


const User = ({name,qualities,profession,completedMeetings,rate,onDelete,id}) => {
    return (
        <tr>
            <td>{name}</td>  
            <td>{qualities.map((qualiti) => {
                return <Qualitie 
                name={qualiti.name} 
                key={qualiti._id} 
                color = {qualiti.color}/>
            })}</td> 
            <td>{profession}</td>
            <td>{completedMeetings}</td>
            <td>{`${rate}/5`}</td>
            <td><Bookmark/></td>
            <td><button onClick={()=>onDelete(id)} className="btn btn-danger">delete</button></td>
        </tr>
    )
}

export default User