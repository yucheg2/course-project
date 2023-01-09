import React from "react";
import PropTypes from "prop-types";

const SerchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        let phrase = `${number} `;
        if (number > 4 || number === 1) {
            phrase += "человек тусанет с тобой сегодня";
        } else if (number <= 4 && number > 1) {
            phrase += "человека тусанут с тобой сегодня";
        } else {
            phrase = "Никто с тобой не тусанет";
        }
        return phrase;
    };

    const getPhraseClass = () => {
        let classes = "badge ";
        return (classes += length !== 0 ? "text-bg-primary" : "text-bg-danger");
    };

    return (
        <h2>
            <span className={getPhraseClass()}>{renderPhrase(length)}</span>
        </h2>
    );
};

export default SerchStatus;

SerchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
