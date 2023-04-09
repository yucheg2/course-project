import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import UserPageLayout from "../../../layouts/userPageLayout";
import { MeetingsCard, QualitiesCard, UserCard } from "../../ui/userInfoCards/index";
import CommentsListComponent from "../../ui/comments/commentsListComponent";
import { useUsers } from "../../../hooks/useUsers";
import CommentProvider from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const { getUserById } = useUsers();
    const user = getUserById(userId);
    const history = useHistory();

    const handleUsers = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        user
            ? (
                <UserPageLayout>
                    <div className="col-md-4 mb-3">
                        <UserCard
                            user={user}
                            onClick={handleUsers}
                        />
                        <QualitiesCard qualities={user.qualities}/>
                        <MeetingsCard meetings={user.completedMeetings}/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <CommentProvider>
                            <CommentsListComponent userID={userId}/>
                        </CommentProvider>
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
