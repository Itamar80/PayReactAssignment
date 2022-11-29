import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; import { Home } from './pages/Home/Home';
// import { NotHome } from './pages/Home/NotHome';
import { QueryClientProvider, QueryClient } from 'react-query';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   path: "/album-info/:id",
  //   element: <AlbumInfo />,
  // },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
