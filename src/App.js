import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Views from './views';
import { ThemeSwitcherProvider } from 'react-css-theme-switcher';
import { THEME_CONFIG } from './configs/AppConfig';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';
import './App.css';

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeSwitcherProvider
            themeMap={themes}
            defaultTheme={THEME_CONFIG.currentTheme}
            insertionPoint="styles-insertion-point">
            <Router>
              <Routes>
                {/* Updated from component={Views} to element={<Views />} */}
                <Route path="/" element={<Views />} />
              </Routes>
            </Router>
          </ThemeSwitcherProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;