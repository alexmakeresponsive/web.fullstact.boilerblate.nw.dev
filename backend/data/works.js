module.exports = [
    // item
    {
        id: 1,
        name: 'Tea Shop',
        desc: 'HTML template',
        tools: [
            {
                framework: 'Bootstrap 3',
            },
            {
                css: 'less',
                approach: 'BEM',
            },
            {
                grid: 'floating blocks',
                columns: '12',
            },
            {
                jQuery: true,
                plugins: [
                    'Carousel'
                ]
            },
            {
                js: 'custom',
                elements: [
                    'more/less button on product single page'
                ]
            }
        ],
        customer: 'Self',
        demo: [
            {
                video: 'link'
            },
            {
                web: 'link'
            }
        ],
        assets: {
            upload: {
                album: 'path to album',
                cover: 'path to cover',
            }
        }
    },
    // item
];

