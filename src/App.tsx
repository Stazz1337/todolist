import Body from './layout/Body';
import Layout from './layout/Layout';
import TodoList from './components/todo-list/TodoList';
import BlockWrapper from './components/common/BlockWrapper';

export default function App() {
  return (
    <Layout>
      <Body>
        <BlockWrapper title={'TODO list'}>
          <TodoList />
        </BlockWrapper>
      </Body>
    </Layout>
  );
}
