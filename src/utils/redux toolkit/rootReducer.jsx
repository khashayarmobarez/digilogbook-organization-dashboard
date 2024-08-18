'use client';
import { combineReducers } from '@reduxjs/toolkit';

import appControlReducer from './appControlStates/appSlice'


const rootReducer = combineReducers({
    appControl: appControlReducer,
});

export default rootReducer;