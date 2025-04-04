import { Router } from '@/ecosystem/Routes/router';
import { DialogProvider } from '@/providers/dialog/DialogProvider';
import { ReactQueryProvider } from '@/providers/react-query/ReactQueryProvider';
import { TenantProvider } from '@/providers/tenant/TenantProvider';
import { persistor, store } from '@/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DialogProvider>
          <TenantProvider>
            <ReactQueryProvider>
              <Toaster />
              <Router />
            </ReactQueryProvider>
          </TenantProvider>
        </DialogProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
