const initialState = {
    name: 'Shxrt',
    domain: 'https://shxrt.xyz/'
}

export default function (state = initialState) {
    if (process.env.NODE_ENV === 'development') state.domain = 'http://localhost:3000/';

    return {...state};
}