import { Component } from "react";
import { FeedbackOptions } from "./Feedback/FeedbackOptions";
import { Statistics } from "./Feedback/Statistics";
import { Section } from "./Section/Section";
import { Notification } from "./Notification/Notification";

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  countFeedback = (option) => {
    this.setState((prevState) => {
      return ({[option]: prevState[option] + 1}
      )
      ;
    })
  }

  countTotalFeedback() {
    return Object.values(this.state).reduce((acc, value) => (acc + value), 0);
  }

  countPositiveFeedbackPercentage() {
    const total = this.countTotalFeedback();

    if (!total) {
      return 0;
    }

    return Number(((this.state.good / total) * 100).toFixed(2));
  }
  
  render() {
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <>
        <Section title={'Please leave feedback'}>
          <FeedbackOptions options={Object.keys(this.state)} onLeaveFeedback={this.countFeedback} />
        </Section>
        <Section title={'Statistics'}>
          {total ?
            <Statistics good={this.state.good} neutral={this.state.neutral} bad={this.state.bad} total={total} positivePercentage={positivePercentage} />
            :
            <Notification message={'There is no feedback'}/>}
          
        </Section>
      </>
  )
  }
  
};
