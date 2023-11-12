module.exports = {
    env: {
        es2020: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    // overrides: [
    //     {
    //         env: {
    //             node: true
    //         },
    //         files: [
    //             '.eslintrc.{js,cjs}'
    //         ],
    //         parserOptions: {
    //             sourceType: 'script'
    //         },
    //         rules: {
    //             indent: ['error']
    //         }
    //     }
    // ],
    ignorePatterns: ['dist', 'src/frontend/generated/*'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['tsconfig.json']
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        '@typescript-eslint/strict-boolean-expressions': [
            2,
            {
                allowString: false,
                allowNumber: false,
            }
        ],
    },
    plugins: ['@typescript-eslint'],
};
