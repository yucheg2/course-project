import React,{useState} from "react";
import api from "../API/index"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers ((prevState)=>prevState.filter((user)=> user._id !== userId))        
    }

    const renderQualities = (qualities) => {
        return qualities.map((qualiti, ind) => {
            return (
            <span key={ind} className={`badge m-1 text-bg-${qualiti.color}`}>
                {qualiti.name}
            </span>)
        })
    }
    const renderPhrase = (number) => {
        let phrase = `${number} `
        if (number >4 || number === 1) {
            phrase += 'человек тусанет с тобой сегодня'
        } else if (number <= 4 && number >1) {
            phrase += 'человека тусанут с тобой сегодня'
        } else {
            phrase = 'Никто с тобой не тусанет'
        }
        return phrase
    }
    const getPhraseClass = () => {
       let classes = 'badge '
       return classes += users.length !== 0 ? 'text-bg-primary' : 'text-bg-danger'
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
                <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user.name}</td>  
                                <td>{renderQualities(user.qualities)}</td> 
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{`${user.rate}/5`}</td>
                                <td><button onClick={()=>handleDelete(user._id)} className="btn btn-danger">delete</button></td>
                            </tr>
                            )
                    })}
                </tbody>
            </table>)
            }
    }
    return (
        <>
            <h2>
                <span className={getPhraseClass()}>{renderPhrase(users.length)}</span>
            </h2>
            {renderTable()}
        </>
    )
}

export default Users