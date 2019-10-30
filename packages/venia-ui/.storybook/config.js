import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { AppContextProvider } from "../lib/components/App";
import { Adapter } from '@magento/venia-drivers';
import store from './store';
import backendUrl from './backendUrl';

function loadStories() {
    const context = require.context('../lib', true, /__stories__\/.+\.js$/);
    context.keys().forEach(context);
}

const apiBase = new URL('/graphql', backendUrl).toString();

addDecorator(storyFn => (
    <Adapter
        apiBase={apiBase}
        apollo={{ link: Adapter.apolloLink(apiBase) }}
        store={store}
    >
        <AppContextProvider>
            {storyFn()}
        </AppContextProvider>
    </Adapter>
));

configure(loadStories, module);
