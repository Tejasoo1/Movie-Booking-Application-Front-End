import { Outlet } from 'react-router-dom';

function AppLayout() {
  console.log('AppLayout comp');
  return (
    <>
      <Outlet />
    </>
  );
}

export default AppLayout;
