import { message } from 'antd';

export const success = (direc) => {
    message.success(`${direc}`);
};

export const error = (direc) => {
    message.error(`${direc}`);
};

export const warning = () => {
    message.warning('This is a warning message');
};