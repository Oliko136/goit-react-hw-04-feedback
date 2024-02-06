import PropTypes from 'prop-types';
import styles from './FeedbackOptions.module.css';

export const FeedbackOptions = ({ options = [], onLeaveFeedback }) => {
    return (
        <ul className={styles.optionsList}>
            {options.map(option =>
                <li key={option}>
                    <button className={styles.optionsButton} type="button" onClick={() => (onLeaveFeedback(option))}> {option}</button>
                </li>)}
        </ul>    
    )
}

FeedbackOptions.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onLeaveFeedback: PropTypes.func
}
