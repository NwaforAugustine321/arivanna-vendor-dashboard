import React, { useEffect } from 'react';
import DefaultLayout from '../components/layouts/DefaultLayout';
import { store, persistor } from '~/store/store';
import '~/styles/style.scss';
import 'antd/dist/antd.min.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import WidgetChatBot from "~/components/shared/widgets/WidgetChatBot"


function App({ Component, pageProps }) {
    const getLayout =
        Component.getLayout || ((page) => <DefaultLayout children={page} />);
    useEffect(() => {
        setTimeout(function () {
            document.getElementById('__next').classList.add('loaded');
        }, 100);
    }, []);
    return (
        <Provider store={ store }>
        <PersistGate loading={null} persistor={persistor}>	  
        {getLayout(<Component {...pageProps} />)}
        <WidgetChatBot />
        </PersistGate>	  
      </Provider>
    )
}

export default App;
