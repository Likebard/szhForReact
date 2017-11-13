import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
//用AppContainer包裹的组件，都有HMR能力
import { AppContainer } from 'react-hot-loader'
import App from "./components/App"

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(App);

if(module.hot) {
    module.hot.accept('./components/App', () => { render(App) })
}
