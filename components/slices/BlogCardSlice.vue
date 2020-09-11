<template>
    <section :style="{ 'background-color': slice.primary.background }">
        <div class="inner-content-wrapper" >
            <div class="cms-main-wrap blog-cms">
                <prismic-rich-text :field="slice.primary.title" class="topic-heading"/>
                <div class="blog-card row">
                    <div v-for="item in blogList" :key="item.id" class="card-main col-lg-4 col-sm-6 col-xs-12">
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
import moment from 'moment'
export default {
    props: ['slice'],   
    name: 'blog-cards',
    data() {
        return {
            blogList: []
        }
    },
    filters: {
        moment: function (date) {
            return moment(date).format('DD-MM-YYYY');
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
                    blog.data.topics = topicArray.length ? topicArray.slice(0, 3) : []
                    this.blogList.push(blog)
                }
            }
            this.blogList = this.blogList.slice(0, this.slice.primary.card_limit)
        });
    },
    methods: {
        async getTopics (blog) {
            let topicArray = []
            for (let i = 0; i < blog.data.topics1.length; i++) {
                if (blog.data.topics1[i] && typeof blog.data.topics1[i].topic == 'object' && blog.data.topics1[i].topic.id) {
                    let topic = await this.$prismic.api.query(this.$prismic.predicates.at('document.id', blog.data.topics1[i].topic.id))
                    topicArray.push(topic.results[0])
                }
            }
            return topicArray
        }
    }
}
</script>

<style scoped>
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
