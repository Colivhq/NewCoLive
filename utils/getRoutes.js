const axios = require('axios');
const appRoutes = require('../routes.json');
const Prismic = require('prismic-javascript');

module.exports = async function getAppRoutes() {
    // Fetch blogPosts as object with languages as attributes and slugs as their values
    
    // fetchBlogPosts()
    // Iterate over each blog post
    const blogPosts =  [];
    const pages =  [];
    const routes = [];
    await Prismic.getApi(process.env.PRISMIC_ENDPOINT).then((api) => {

        // Get all Pages route
        api.query('').then(function(response) {
            response.results.forEach(function(page, index) {
                if(page.type == 'page') { 
                    pages.push({ uid: page.uid})
                }
                if(page.type == 'blogpage') { 
                    blogPosts.push({ uid: page.uid})
                }
            });
            // response is the response object, response.results holds the documents
        }); 
    });
    const appartments = await axios.post('https://asia-east2-colivhq-backend.cloudfunctions.net/apiHomes', {
        //"operatorId": "HaF6mb19L6AzWVavPr5t",
        "neighborhoodId": "",
        "cityId": ""
    },{
        headers: {
            Authorization: `Bearer ${process.env.COLIV_HQ_KEY}`
        }
    })
    const homeList = [];
    appartments.data.data.forEach(function(appartment, index) {
        if(appartment.homeId != undefined) { 
            homeList.push({ uid: appartment.homeId})
        }
    });
   
    // and every route defined in routes.json
    for (let k = 0; k < appRoutes.length; k += 1) {
        let routePath = appRoutes[k];
        //const blogUid = blogPosts[k].uid;

        // replace the language placeholder with current language
        // If the route includes 'blog', iterate over all fetched posts in current language
        if (routePath.includes('/blog/')) {
            for (let postIndex = 0; postIndex < blogPosts.length; postIndex += 1) {
                routes.push(routePath.replace(/:uid/, blogPosts[postIndex].uid));
            }
        } else if (routePath.includes('/findahome/')) {
            for (let postIndex = 0; postIndex < homeList.length; postIndex += 1) {
                routes.push(routePath.replace(/:uid/, homeList[postIndex].uid));
            }
        } else if (routePath.includes('/page/')) {
            for (let postIndex = 0; postIndex < pages.length; postIndex += 1) {
                routes.push(routePath.replace(/:uid/, pages[postIndex].uid));
            }
        } else {
            routes.push(routePath);
        }
    }

    // Return all available routes
    return routes;
};
