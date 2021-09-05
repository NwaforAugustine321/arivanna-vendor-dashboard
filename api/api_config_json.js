const api_link = process.env.api_end_point;
var live_api = true; //This will connect to the development live api endpoint which connects to the live dev DB

if (live_api) {
    var api_ends = {
        api_end_point: `${api_link}`,
        vendor_route: 'https://vendorportal.arivanna.com/',
        checkout_route: '/account/checkout'//'/account/coming-soon',
    };
} else {
    var api_ends = {
        api_end_point: 'http://localhost:3000/api/',
        vendor_route: 'http://localhost:3004/',
        checkout_route: '/account/checkout',
    };
}

console.log('Using live Api: ', live_api);

export default api_ends;
