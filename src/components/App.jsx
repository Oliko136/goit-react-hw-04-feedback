import { useState } from "react";
import { FeedbackOptions } from "./Feedback/FeedbackOptions";
import { Statistics } from "./Feedback/Statistics";
import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification";

export const App = () => {
  const [options, setOptions] = useState({
      good: 0,
      bad: 0,
      neutral: 0
  });

  const countFeedback = (option) => {
    setOptions((prevState) => {
      return ({
        ...prevState,
        [option]: prevState[option] + 1
      });
    })
  }

  const countTotalFeedback = () => {
    return Object.values(options).reduce((acc, value) => (acc + value), 0);
  }

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();

    if (!total) {
      return 0;
    }

    return Number(((options.good / total) * 100).toFixed(2));
  }
  
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <>
        <Section title={'Please leave feedback'}>
          <FeedbackOptions options={Object.keys(options)} onLeaveFeedback={countFeedback} />
        </Section>
        <Section title={'Statistics'}>
          {total ?
            <Statistics good={options.good} neutral={options.neutral} bad={options.bad} total={total} positivePercentage={positivePercentage} />
            :
            <Notification message={'There is no feedback'}/>}
          
        </Section>
    </>)
}