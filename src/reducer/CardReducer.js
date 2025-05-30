import React from 'react'

const CardReducer = (state, action) => {
    switch (action.type) {
        case 'Add_Card':
            return [...state, action.payload]

        case 'Delete_Card':
            return state.filter((_, index) => index !== action.payload)

        case 'Edit_Card':
            return state.map((card, index) =>
                index === action.payload.index ? action.payload.newTitle : card
            );
        default:
            return state;
    }
    };

    export default CardReducer
