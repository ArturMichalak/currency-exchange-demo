import vercelPrettierOptions from '@vercel/style-guide/prettier';

/** @type {import('prettier').Config} */
const config = {
    ...vercelPrettierOptions,
    printWidth: 120
};

export default config;
