import { Provider } from "react-redux";
import { store } from "./store";
import { ArticleList } from "./article-list";
function App() {
  return (
    <Provider store={store}>
      <ArticleList />
    </Provider>
  );
}

export default App;
