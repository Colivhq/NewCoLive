<template>
    <section :style="{ 'background-color': slice.primary.background }">
        <div class="inner-content-wrapper" >
            <div class="cms-main-wrap blog-cms">
                <prismic-rich-text :field="slice.primary.title" class="topic-heading"/>
                <div class="blog-card row">
                    <div :class="[ topics_and_authors ? 'col-lg-9': 'col-lg-12']">
                        <div class="row">
                            <div v-for="(item, key) in blogList" :key="item.id"  v-for-callback="{key: key, array: blogListCopy, callback: callback}" class="card-main col-lg-4 col-sm-6 col-xs-12">
                                <div class="content-wrap">
                                    <n-link :to="'/blog/'+item.uid" class="card-link">
                                    <!-- <prismic-link :field="item.blog_link" class="card-link"> -->
                                        <picture>
                                            <img :src="item.data.hero_image.card.url">
                                        </picture>
                                        <div class="desc-box">
                                            <div class="desc">
                                                {{ item.data.publish_date | moment }}
                                            </div>
                                            <div class="name"> {{ item.data.page_title[0].text }} </div>
                                            <div class="desc">
                                                <p>{{ (item.data.summary[0].text.length > 170) ? item.data.summary[0].text.substring(0, 167) + '...' : item.data.summary[0].text }}</p>
                                            </div>
                                            <div class="blog-bottom-content">
                                                <div class="blog-topics">
                                                    <p class="topic" v-for="topic in item.data.topics" :key="topic.topic">
                                                        <span class="topic-content">
                                                            <a :href="topic.href">
                                                                {{topic.data.topic}}
                                                            </a>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    <!-- </prismic-link> -->
                                    </n-link>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 blog-filter-topics" v-if="topics_and_authors">
                        <h3>Topics</h3>
                        <div class="blog-topic-items">
                            <p :class="'topic ' + [(filterSel != '') ? filterSel == index ? 'filter-applied' : 'filter-applied-all' : 'no-filter-applied']" v-for="(topic, index) in topicList" :key="'fil_top_'+index" @click="topicFilter(index)">
                                <span class="topic-content">
                                    {{index}} ({{topic}})
                                </span>
                            </p>
                        </div>
                        <h3 class="filter-separate">Authours</h3>
                        <div class="blog-topic-items">
                            <p :class="'topic ' + [(athourSel != '') ? athourSel.includes(index) ? 'filter-applied' : 'filter-applied-all' : 'no-filter-applied']" v-for="(author, index) in authorList" :key="'fil_top_auth_'+index" @click="authorFilter(index)">
                                <span class="topic-content">
                                    {{index}} ({{author}})
                                </span>
                            </p>
                        </div>
                    </div>
                </div> 
                <div class="row view-more-blogs" v-if="slice.primary.blog_link.length != 0">
                    <div class="col-lg-12">
                        <prismic-link v-if="slice.primary.blog_link[0].spans.length !=0" :field="slice.primary.blog_link[0].spans[0].data" class="more-blog-link">
                            {{ slice.primary.blog_link[0].text }}
                        </prismic-link>
                    </div>
                </div>
            </div>
        </div> 
    </section>
</template>

<script>
// import moment from 'moment'
export default {
    props: ['slice'],   
    name: 'blog-cards',
    data() {
        return {
            blogList: [],
            blogListCopy: [],
            topicList:[],
            authorList:[],
            tempTopicList:[],
            tempAuthorList:[],
            topics_and_authors: false,
            filterSel: [],
            athourSel: [],
            finished: false
        }
    },
    filters: {
        moment: function (date) {
            if (date && date.length) {
                const dateParts = date.split("-")
                const aDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
                return aDate
                // return moment(date).format('DD-MM-YYYY');
            } else {
                return ''
            }
        }
    },
    async created() {
        let limit= this.slice.primary.card_limit + 1;
        this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'blogpage'), 	
        { orderings : '[my.blogpage.publish_date desc]', 'pageSize': limit }).then(async (response) => {
            //this.blogList1 = response.results
            for (let blog of Object.values(response.results)) { 
                if(blog.uid != this.slice.current_blog && this.blogList.length <= this.slice.primary.card_limit) {
                    let topicArray = await this.getTopics(blog)
                    let authorArray = []
                    if (typeof blog.data.author == 'object' && blog.data.author.id) {
                        let author = await this.$prismic.api.query(this.$prismic.predicates.at('document.id', blog.data.author.id))
                        authorArray.push(author.results[0])
                        authorArray = authorArray.map(content => content.data.author)
                        this.tempAuthorList = [...this.tempAuthorList, ...authorArray]
                        blog.data.filterathor = authorArray[0]
                    }
                    blog.data.topics = topicArray.length ? topicArray.slice(0, 3) : []
                    var filterTopics = [];
                    if(topicArray.length) {
                        filterTopics = topicArray.map(content => content.data.topic);
                        this.tempTopicList = [...this.tempTopicList, ...filterTopics]
                    }
                    blog.data.filtertopics = filterTopics;
                    this.blogList.push(blog)
                }
            }
            this.blogList = this.blogList.slice(0, this.slice.primary.card_limit)
            this.blogListCopy = this.blogList.slice(0, this.slice.primary.card_limit)
            this.tempTopicList = this.tempTopicList.reduce((a,c)=> (a[c]=++a[c]||1,a) ,{});
            this.tempAuthorList = this.tempAuthorList.reduce((a,c)=> (a[c]=++a[c]||1,a) ,{});
        });
    },
    directives: {
        forCallback(el, binding) {
            
            let element = binding.value
            var key = element.key
            var len = 0

            if (Array.isArray(element.array)) {
                len = element.array.length
            }

            else if (typeof element.array === 'object') {
                var keys = Object.keys(element.array)
                key = keys.indexOf(key)
                len = keys.length
            }
            if (key == len - 1) {
                if (typeof element.callback === 'function') {
                    element.callback()
                }
            }
        }
    },
    methods: {
        callback() {
            this.topics_and_authors = this.slice.primary.authors_and_topics;
            this.topicList = this.tempTopicList
            this.authorList = this.tempAuthorList
        },
        getContent () {
            //let topic = await this.$prismic.api.query(this.$prismic.predicates.at('document.id', blog.data.topics1[i].topic.id))
        },
        async getTopics (blog) {
            let topicArray = []
            for (let i = 0; i < blog.data.topics1.length; i++) {
                if (blog.data.topics1[i] && typeof blog.data.topics1[i].topic == 'object' && blog.data.topics1[i].topic.id) {
                    let topic = await this.$prismic.api.query(this.$prismic.predicates.at('document.id', blog.data.topics1[i].topic.id))
                    topicArray.push(topic.results[0])
                }
            }
            return topicArray
        },
        filterBlog() {
            if(this.filterSel.length > 0) {
                this.blogListCopy = this.blogList.filter((blog) => {
                    if(blog.data.filtertopics.length > 0 && this.filterSel.length > 0) {
                        for(var i=0; i<=this.filterSel.length; i++) {
                            if(blog.data.filtertopics.includes(this.filterSel[i])) {
                                return blog;
                            }
                        }
                    }
                });
            } else {
                 this.blogListCopy = this.blogList
            }
            if(this.athourSel.length > 0) {
                this.blogListCopy = this.blogListCopy.filter((blog) => {
                    if(blog.data.filterathor != undefined) {
                        if(this.athourSel.length > 0) {
                            for(var i=0; i<=this.athourSel.length; i++) {
                                if(blog.data.filterathor.includes(this.athourSel[i])) {
                                    return blog;
                                }
                            }
                        }
                    }
                });
            }
            if(this.filterSel.length == 0 && this.athourSel.length == 0) {
                this.blogListCopy = this.blogList
            }
        },
        topicFilter(topic) {
            if(this.filterSel.includes(topic)) {
                this.filterSel.splice(this.filterSel.indexOf(topic), 1);
            } else {
                this.filterSel.push(topic)
            }
            this.filterBlog()
        },
        authorFilter(topic) {
            if(this.athourSel.includes(topic)) {
                this.athourSel.splice(this.athourSel.indexOf(topic), 1);
            } else {
                this.athourSel.push(topic)
            }
            this.filterBlog()
        }
    }
}
</script>

<style scoped>
.filter-separate { 
    margin-top: 50px;
}
.blog-filter-topics {
    text-align: left;
}
.blog-filter-topics h3{
    margin-bottom: 0px;
    font-weight: bold;
    color: #000;
}
.no-filter-applied.topic {
    background-color: rgb(114 191 68 / 12%);
    border: 1px solid rgba(114,191,68,.75);
}
.filter-applied.topic {
    background-color: rgb(114 191 68 / 12%);
    border: 1px solid rgba(114,191,68,.75);
}
.filter-applied-all.topic {
    background-color: #feefef !important;
    border: 1px solid #ef5357 !important;
}
.blog-filter-topics .blog-topic-items .topic {
    height: auto !important;
    font-size: 14px !important;
    font-weight: normal !important;
    text-align: left !important;
    cursor: pointer;
    padding: 3px !important;
    line-height: normal;

    color: #000;
    font-size: 10px;
    font-weight: 600;
    padding: 0 4px;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
    margin-right: 7px;
    min-width: 35px;
    margin-top: 5px;
    text-align: center;
    height: 20px;
}
.view-more-blogs a{ 
    font-size: 28px;
    text-decoration: underline;
}
.view-more-blogs {
    padding-top: 50px;
    padding-bottom: 50px;
    text-align: left;
}
.topic-heading {
    margin-bottom: 50px;
    text-align: left;
}
.section-main-title .cms-title >>> :first-child {
    color: #222222;
    margin-bottom: 40px;
    text-align: left;
}
.blog-cms {
    text-align: center;
    position: relative;
    padding: 50px 15px;
}
.blog-cms .blog-card .name   {
    font-size: 18px;
    color: #000;
    font-weight: 600;
    text-decoration: none;
    margin: 5px 0;
    display: block;
    line-height:22px;
}
.blog-cms  .left-content {
    position: relative;
    background-color: #fff;
    z-index: 9;
}
.blog-cms .blog-card .title >>> :first-child ,
.blog-cms .blog-card .desc >>> :first-child ,
.blog-cms .blog-card .price >>> :first-child ,
.blog-cms .blog-card .address >>> :first-child {
    color: #000;
    margin-bottom: 0;
    line-height: normal;
}
.blog-cms .blog-card .price >>> :first-child,
.blog-cms .blog-card .title >>> :first-child {
    margin-top: 6px;
}
.blog-cms .blog-card .desc >>> :first-child {
    margin-top: 20px;
    line-height: 22px;
}
.blog-cms .blog-card .blog-topics .topic {
    background-color: #feefef;
    border: 1px solid #ef5357;
    color: #000;
    font-size: 10px;
    font-weight: 600;
    padding: 0 4px;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    min-width: 35px;
    margin-top: 5px;
    text-align: center;
    height: 20px;
}
.blog-card .card-main {
    position: relative;
}
.blog-card .card-main .blog-bottom-content .blog-topics {
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 5px;
}
.blog-card .card-main .blog-bottom-content .blog-topics .topic-content {
    position: relative;
    top: -5px;
}

.blog-card .card-main .blog-bottom-content .blog-topics .topic-content a {
    text-decoration: none;
}

.blog-bottom-content .price >>> p { 
    font-weight: bold;
}
.blog-card .card-main .blog-bottom-content .price {
    left: 0;
    right: 0;
    bottom: 30px;
}
.blog-cms .blog-card .content-wrap .desc-box{
    transition: 0.3s;
    /*border: 1px solid #ccc;*/
    padding: 20px 30px;
    /*border-top: none;*/
    /*-webkit-box-shadow: 0 8px 6px -6px rgba(0,0,0,0.2);*/
    /*-moz-box-shadow: 0 8px 6px -6px rgba(0,0,0,0.2);*/
    /*box-shadow: 0 8px 6px -6px rgba(0,0,0,0.2);*/
    margin-top: -10px;
    background-color: #fff;
}
.blog-card .card-main .card-link {
    display: block;
}
.blog-cms .blog-card .card-main:nth-child(n+4) {
    margin-top: 15px;
}
.blog-card .card-main .card-link:hover {
    color: #72767B;
}
.blog-card .card-main .card-link .desc {
    color: #222;
}
.blog-card .card-main .content-wrap {
    height: 100%;
    border: 1px solid #ccc;
    background: #fff;
    /* border-top: none; */
    -webkit-box-shadow: 0 8px 6px -6px rgba(0,0,0,0.2);
    -moz-box-shadow: 0 8px 6px -6px rgba(0,0,0,0.2);
    box-shadow: 0 8px 6px -6px rgba(0,0,0,0.2);
}
@media(max-width: 991px){
    .blog-cms .blog-card .card-main:nth-child(n+3) {
        margin-top: 15px;
    }
}
@media (max-width: 767px) {
    .blog-cms .blog-card .col-lg-6.col-md-12 {
        flex: 0 0 50%;
        max-width: 50%;
    } 
    .blog-card  {
        padding-right: 0;
        /*margin-left: 0;*/
        /*margin-right: 0;*/
    }
    .build-page .blog-card {
        padding-top: 0;
    }
    .view-more-blogs {
        text-align: center;
    }
    .view-more-blogs a{ 
        font-size: 26px;
    }
}
@media (max-width: 575px) {
    .blog-cms .blog-card .col-lg-6.col-md-12 {
        flex: 0 0 100%;
        max-width: 100%;
    }   
    .section-main-title .cms-title >>> :first-child {
        font-size: 18px;
    }
    .blog-cms .blog-card .card-main:nth-child(n+2) {
        margin-top: 15px;
    }
}
@media (max-width: 991px) and (min-width: 684px) {
    .blog-card .card-main {
        max-width: 330px;
        /* margin: 0 auto; */
    }
}
@media (max-width: 575px) {
    .blog-card .card-main {
        max-width: 330px;
        margin: 0 auto;
    }
}
</style>
