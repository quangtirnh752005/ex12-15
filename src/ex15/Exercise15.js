import Section from '../components/Section';
import Counter from './Counter';
import QuestionBank from './QuestionBank';

export default function Exercise15() {
  return (
    <div className="grid">
      <Section
        index={1}
        title="Counter với useReducer"
        description="counterReducer xử lý các action INCREMENT / DECREMENT / RESET."
      >
        <Counter />
      </Section>
      <Section
        index={2}
        title="Question Bank"
        description="quizReducer xử lý SELECT_OPTION / NEXT_QUESTION / RESTART_QUIZ."
      >
        <QuestionBank />
      </Section>
    </div>
  );
}
