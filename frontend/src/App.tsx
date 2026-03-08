import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useActor } from './hooks/useActor';
import Layout from './components/Layout';
import Home from './pages/Home';
import IslandDetail from './pages/IslandDetail';

function AppInitializer({ children }: { children: React.ReactNode }) {
  const { actor } = useActor();

  useEffect(() => {
    if (actor) {
      actor.initializeIslands().catch(() => {
        // Islands may already be initialized
      });
    }
  }, [actor]);

  return <>{children}</>;
}

const rootRoute = createRootRoute({
  component: () => (
    <AppInitializer>
      <Layout>
        <Outlet />
      </Layout>
    </AppInitializer>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const islandDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/island/$name',
  component: IslandDetail,
});

const routeTree = rootRoute.addChildren([homeRoute, islandDetailRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
