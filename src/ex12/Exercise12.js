import Section from '../components/Section';
import Counter from './Counter';
import ControlledInput from './ControlledInput';
import ToggleVisibility from './ToggleVisibility';
import TodoList from './TodoList';
import ColorSwitcher from './ColorSwitcher';
import SearchFilter from './SearchFilter';
import DragDropList from './DragDropList';

export default function Exercise12() {
  return (
    <div className="grid">
      <Section index={1} title="Counter" description="Mỗi lần bấm nút, số tăng thêm 1.">
        <Counter />
      </Section>
      <Section index={2} title="Controlled Input Field" description="Gõ vào ô input, text hiển thị real-time.">
        <ControlledInput />
      </Section>
      <Section index={3} title="Toggle Visibility" description="Ban đầu ẩn text, chỉ có nút Show.">
        <ToggleVisibility />
      </Section>
      <Section index={4} title="Todo List" description="Thêm todo mới và xoá từng todo.">
        <TodoList />
      </Section>
      <Section index={5} title="Color Switcher" description="Chọn màu trong dropdown để đổi nền div.">
        <ColorSwitcher />
      </Section>
      <Section index={6} title="Search Filter" description="Lọc danh sách theo từ khoá.">
        <SearchFilter />
      </Section>
      <Section index={7} title="Drag and Drop List" description="Kéo thả để sắp xếp lại danh sách.">
        <DragDropList />
      </Section>
    </div>
  );
}
