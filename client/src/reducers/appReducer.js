const initialState = {
    name: 'Cutt',
    baseUrl: 'https://cutt.xyz/'
}

export default function (state = initialState) {
    if (process.env.NODE_ENV === 'development') state.baseUrl = 'http://localhost:3000/';

    return {...state};
}