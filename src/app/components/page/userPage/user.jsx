import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../API/index";
import PropTypes from "prop-types";
import UserPageLayout from "../../../layouts/userPageLayout";
import { MeetingsCard, QualitiesCard, UserCard } from "../../ui/userInfoCards/index";
import CommentsListComponent from "../../ui/comments/commentsListComponent";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((user) => {
            setUser(user);
        });
    }, []);

    const handleUsers = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        user
            ? (
                <UserPageLayout>
                    <div className="col-md-4 mb-3">
                        <UserCard
                            name={user.name}
                            rate={user.rate}
                            profession={user.profession.name}
                            onClick={handleUsers}
                        />
                        <QualitiesCard qualities={user.qualities}/>
                        <MeetingsCard meetings={user.completedMeetings}/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <CommentsListComponent userID={userId}/>
                    </div>
                </UserPageLayout>
            )
            : "Loading..."
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
