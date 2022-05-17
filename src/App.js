import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { LastLocationProvider } from "react-router-last-location";
import { Routes } from "./app/router/Routes";
import { LayoutSplashScreen, ThemeProvider } from "./_metronic";

export default function App({ store, persistor, basename }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}>
                <React.Suspense fallback={<LayoutSplashScreen />}>
                    <BrowserRouter basename={basename}>
                        <LastLocationProvider>
                            <ThemeProvider>
                                <Routes />
                            </ThemeProvider>
                        </LastLocationProvider>
                    </BrowserRouter>
                </React.Suspense>
            </PersistGate>
        </Provider>
    );
}
