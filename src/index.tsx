import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import App from './App';
import { register } from './serviceWorker';
import i18next from 'i18next';



const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const render = (Component :any) => {
	const rootElement = document.getElementById('root');
	ReactDom.render(
		<AppContainer>
			<LocaleProvider >
				<Component />
			</LocaleProvider>
		</AppContainer>,
		rootElement,
	);
};


render(App);

