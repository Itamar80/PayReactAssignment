import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
} from "react-router-dom"; import { Home } from './pages/Home/Home';
import { NotHome } from './pages/Home/NotHome';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/not-home",
    element: <NotHome />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
