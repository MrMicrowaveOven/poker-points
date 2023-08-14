import Ably from 'ably'

export const subscribe = async () => {
    const ably = new Ably.Realtime.Promise(process.env['REACT_APP_ABLY_AUTH_KEY']);
    await ably.connection.once('connected');
    console.log('Connected to Ably!');
    const channel = ably.channels.get('players');
}

export const approachTable = async () => {

}

export const setName = async () => {

}

export const pickNumber = async () => {

}

export const reveal = async () => {

}

export const reset = async () => {

}