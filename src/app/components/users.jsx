import React,{useState} from "react";
import api from "../API/index"
import SerchStatus from "./serchStatus";
import User from "./user";

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers ((prevState)=>prevState.filter((user)=> user._id !== userId))        
    }

    const renderTable = () => {
        if(users.length !== 0){
            return (
            <table className="table">
                <thead>
                <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Провфессия</th>
                <th scope="col">Встретился раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <User 
                            key={user._id}
                            name = {user.name} 
                            qualities = {user.qualities}
                            profession = {user.profession.name}
                            completedMeetings = {user.completedMeetings}
                            rate = {user.rate}
                            onDelete = {handleDelete}
                            id={user._id}/>
                            )
                    })}
                </tbody>
            </table>)
            }
    }
    return (
        <>
            <SerchStatus length={users.length}/>
            {renderTable()}
        </>
    )
}

export default Users