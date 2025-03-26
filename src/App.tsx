import { Router } from '@/ecosystem/Routes/router';
import { DialogProvider } from '@/shared/providers/dialog/DialogProvider';
import { ReactQueryProvider } from '@/shared/providers/react-query/ReactQueryProvider';
import { store } from '@/store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <DialogProvider>
        <ReactQueryProvider>
          <Router />
        </ReactQueryProvider>
      </DialogProvider>
    </Provider>
  );
}

export default App;
