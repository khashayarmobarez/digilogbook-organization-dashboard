'use client';
import { combineReducers } from '@reduxjs/toolkit';

import appControlReducer from './appControlStates/appSlice'
import flightFilterReducer from './flightHistoryAdvancedFilter/flightFilterSlice'



const rootReducer = combineReducers({
    appControl: appControlReducer,
    flightFilter: flightFilterReducer
});

export default rootReducer;