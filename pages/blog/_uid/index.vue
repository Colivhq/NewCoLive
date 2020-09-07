<template>
  <section class="blog">
    <div class="blog-slider slider-cms">
		<div class="slicer-image-main" ref="slicerImageMain">
            <picture>
				<source :srcset="banner.hero_image.phone.url" media="(max-width: 750px)">
				<source :srcset="banner.hero_image.tablet.url" media="(max-width: 991px)">
				<img :src="banner.hero_image.url">
            </picture>
          </div>
		<div class="inner-content-wrapper">
			<div class="blog-slider-content" ref="blogSliderContent">
				<prismic-rich-text :field="banner.title" class="blog-title"/>
				<div class="icons-details row clearfix">
					<div class="icon-1 icon col-lg-2 col-md-6 col-sm-6 ">
						<div class="icon-wrap">
							<svg class="bi bi-calendar" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" clip-rule="evenodd"/>
								<path fill-rule="evenodd" d="M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
							</svg>
						</div>
						<div class="desc">
							<p>{{ publish_date | moment }}</p>
						</div>
					</div>
					<!-- <div class="icon-2 icon col-lg-2 col-md-6 col-sm-6" v-if="modified_date != null">
						<div class="icon-wrap">
							<svg class="bi bi-calendar" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" clip-rule="evenodd"/>
								<path fill-rule="evenodd" d="M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
							</svg>
						</div>
						<div class="desc">
							<p>{{ modified_date | moment }}</p>
						</div>
					</div> -->
				</div>
				<div class="blog-topics">
					<p class="topic" v-for="topic in topics_array" :key="topic.topic">
						<a :href="topic.href">
							{{topic.data.topic}}
						</a>
					</p>
				</div>
				<prismic-rich-text  class="build-desc" :field="blog_article"/>
				<!-- <p class="location">Location: {{ fields.geoblog.latitude }}, {{ fields.geoblog.longitude }}</p> -->
			</div>
			<div class="blog-slider-content-outer">
				<!-- Sharing icons for : START -->
				<div class="social-sharing-box" v-if="blog_body != ''">
					<div class="social-share-items">
						<client-only>
							<facebook :url="meta_url" scale="3"></facebook>
							<twitter :url="meta_url"  scale="3"></twitter>
							<linkedin :url="meta_url" scale="3"></linkedin>
							<whats-app :url="meta_url" scale="3"></whats-app>
							<google :url="meta_url" scale="3"></google>
							<email :url="meta_url"  scale="3"></email>
						</client-only>
					</div>
				</div>
				<!-- Sharing icons for : END -->
				<prismic-rich-text  class="build-desc blog_body" :field="blog_body"/>
			</div>

			<!-- Author box -->
			<div v-if="author" class="author_box" :style="{'border-left': `6px solid`+ toc_accent_color, 'background-color': toc_background_color}">
				<h2>About the author</h2>
				<b-row>
					<b-col cols="12" md="2">
						<prismic-image :field="author.data.author_picture" class="author-image w-auto"/>
					</b-col>
					<b-col>
						<span class="font-weight-bold">{{author.data.author}}</span>
						<prismic-rich-text :field="author.data.author_bio" class="author_bio"/>
						<figure v-for="(item, index) in author.data.social_networks"
							:key="'social_media_links-item-' + index">  
							<prismic-link :field="item.social_links" class=" icons">
								<prismic-image :field="item.social_icon" class="w-auto"/>
							</prismic-link>
						</figure>
					</b-col>
				</b-row>
			</div>
		</div>
	</div>
    <slices-block :slices="slices"/>
  </section>
</template>

<script>
// Imports for Prismic Slice components
import SlicesBlock from '~/components/SlicesBlock.vue'
import moment from 'moment'
export default {
	name: 'blog-page',
	layout: 'homepage',
	components: {
		SlicesBlock
	},
	data() {
		return {
			socialShareStickyHeight: 0,
			author: null
		}
	},
	head () {
		return {
			title: this.meta_title,
			htmlAttrs: {
				lang: 'en'
			},
			link: [
				{ rel: 'canonical', href: this.meta_url },
			],
			meta: [
				{ hid: 'author', name: 'author', content: this.meta_author },
				{ hid: 'description', name: 'description', content: this.meta_description },
				{
					hid: 'ogtitle',
					property: 'og:title',
					content: this.meta_title
				},
				{
					hid: 'ogdescription',
					property: 'og:description',
					content: this.meta_description
				},
				{
					hid: 'ogimage',
					property: 'og:image',
					content: this.meta_image
				},
				{
					hid: 'ogurl',
					property: 'og:url',
					content: this.meta_url
				},
				{
					hid: 'ogtype',
					property: 'og:type',
					content: 'Website'
				},
				{
					hid: 'ogsite_name',
					property: 'og:site_name',
					content: this.meta_site_name
				},
				{
					hid: 'twittertitle',
					name: 'twitter:title',
					content: this.meta_title
				},
				{
					hid: 'twitterdescription',
					name: 'twitter:description',
					content: this.meta_description
				},
				{
					hid: 'twitter:card',
					name: 'twitter:card',
					content: 'summary'
				},
				{
					hid: 'twittercreator',
					name: 'twitter:creator',
					content: this.twitter_handle
				},
				{
					hid: 'twitterimage',
					name: 'twitter:image',
					content: this.meta_image
				},
			],
			script: [{ type: 'application/ld+json', json: this.structuredData }]
		}
	},
  	async asyncData({ $prismic, params, error, store }) {
		try{
		// Query to get post content
			const document = (await $prismic.api.getByUID('blogpage', params.uid)).data
			let author = await store.dispatch('fetchAuthor', document.author.type)
			let topic = (await store.dispatch('fetchAuthor', 'topics')).results
			const selSlice = document.body.filter(function(slice) {                
				if(slice.slice_type == 'blog_cards') {
					Object.assign(slice, { current_blog: params.uid })
				}
				return slice;
			});

			const header_logo_url = store.state.headerLogo ? store.state.headerLogo.url : ''
			console.log('selSlice: ', selSlice);
			return {
				// Page content
				document: document,
				banner: {
					hero_image: document.hero_image,
					title: document.page_title,
					title_color: document.title_color
				},

				// topics
				topics_array: topic,

				// author
				author: author.results[0],
				// Set slices as variable
				slices: document.body,
				
				//Blog
				author_image: document.author_image,
				autor: document.autor,
				publish_date: document.publish_date,
				modified_date: document.modified_date,
				topics: document.topics,
				summary: document.summary,
				blog_article: document.blog_article,
				blog_body: document.blog_body,

				// TOC
				toc_accent_color: document.toc_accent_color,
				toc_background_color: document.toc_background_color,

				//SEO
				meta_title: (document.page_title.length) ? document.page_title[0].text : '',
				meta_description: (document.seo_description[0].text != null &&  document.seo_description[0].text.length > 170) ?  document.seo_description[0].text.substring(0, 167) + '...' :  document.seo_description[0].text,
				meta_image: (document.meta_image.url) ? document.meta_image.url : '',
				meta_site_name: '',
				meta_url: process.env.baseUrl+'/blog/'+params.uid,
				twitter_handle: (document.twitter_handle) ? document.twitter_handle : '',

				structuredData: {
					"@context": "https://schema.org",
					"@type": "NewsArticle",
					"mainEntityOfPage":{
						"@type":"WebPage",
						"@id": process.env.baseUrl+'/blog/'+params.uid,
					},
					"headline": (document.page_title.length) ? document.page_title[0].text : '',
					"image": {
						"@type": "ImageObject",
						"url": (document.meta_image.url) ? document.meta_image.url : '',
						"height": 1080,
						"width": 1920
					},
					"datePublished": document.publish_date,
					"dateModified": document.modified_date,
					"author": {
						"@type": "Person",
						"name": author.results[0].data.author
					},
					"publisher": {
						"@type": "Organization",
						"name": JSON.stringify(process.env.COMPANY_NAME),
						"logo": {
							"@type": "ImageObject",
							"url": header_logo_url,
							"width": 550,
							"height": 60
						}
					}
				}
			}
		} catch (e) {
			// Returns error page
			error({ statusCode: 404, message: 'Page not found' })
		}
	},
	filters: {
        moment: function (date) {
			return moment(date).format('DD-MM-YYYY');
        }
	}
}
</script>
<style>
/* Slider Bottom */
.blog .blog-slider .blog-title h1 {
	font-weight: bold;
    font-size: 38px;
}
.blog .blog-slider .blog-slider-content {
	margin-top: -300px;
	background-color: rgba(244, 244, 245, 0.9);
	z-index: 99;
	position: relative;
	padding: 20px 70px 35px 70px;
}

.blog .blog-slider .blog-slider-content-outer {
	z-index: 99;
	position: relative;
	padding: 20px 70px 35px 70px;
	margin-bottom: 100px;
	color: #000;
	display: flex;
}
.blog-slider-content-outer h2, .blog-slider-content-outer h3 {
    color: #000;
}

.icons {
	height: 100px;
}

@media(min-width: 992px){
	.blog .blog-slider .blog-slider-content-outer {
		padding: 20px 70px 35px 0px;
	}
	.blog .blog-slider .blog-slider-content-outer .build-desc {
		padding-left: 90px;
	}
}
.icons-details .icon-wrap svg{
	color: rgb(114, 191, 68);
}
.blog .blog-slider .blog-slider-content .blog-topics {
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 20px;
    min-height: 70px;
}
.blog .blog-slider .blog-slider-content .blog-topics .topic {
    background-color: #feefef;
    border: 1px solid #ef5357;
    color: #000;
    font-size: 12px;
    font-weight: 600;
    padding: 0 4px;
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    min-width: 80px;
    margin-top: 5px;
    text-align: center;
}

.blog .blog-slider .blog-slider-content .blog-topics .topic a {
	text-decoration: none;
}

.blog .blog-slider .blog-title > :first-child {
	margin-bottom: 10px;
	color: #222;
}
.blog .blog-slider .icons-details p {
	margin-bottom: 0;
	margin-right: 5px;
}
.blog .blog-slider .icons-details .icon ,
.blog .blog-slider .icons-details .desc {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
}
.blog .blog-slider .icons-details .icon-3 .desc {
	display: block;
}
.blog .blog-slider .icons-details .desc {
	margin-left: 10px;
}
.blog .blog-slider .icons-details  {
	margin-top: 25px;
}
.blog .blog-slider .build-desc p {
	margin-bottom: 0;
    /* margin-top: 30px; */
}
.blog .blog-slider .icons-details .icon:nth-child(n+5) {
	margin-top: 15px;
}
.blog .blog-slider .slider-item .slider-img {
    overflow: hidden;
    width: 100%;
    display: block;
}
.blog .blog-slider-content .build-desc a, .blog .blog-slider-content-outer .build-desc a {
	font-size: 16px;
}
.blog .blog-slider-content-outer .build-desc a, .blog .blog-slider-content-outer .build-desc h3, .blog .blog-slider-content-outer .build-desc h2 {
	color: #000;
}
/* 27/07/20 -DAB */
.social-share-items span {
    display: block;
	cursor: pointer;
	width: 46px;
    height: 46px;
    margin-bottom: 5px;
}
.social-share-items span svg.fa-icon {
    width: 46px;
    height: 46px;
}
.social-share-items {
    position:sticky;
    top:100px;
    z-index:100;
}

.author-image {
	height: 100px;
}

.author_box {
	padding: 50px;
	margin-bottom: 50px;
}

.author_bio p {
	margin-bottom: 1rem;
}

@media(max-width: 1024px){
	.blog .blog-slider .blog-slider-content-outer {
    	padding-left: 15px;
	}
}
@media(max-width: 991px){
	.social-share-items span {
		margin-right: 4px;
		margin-bottom: 0;
	}
	.social-share-items {
		display: flex;
	}
	.blog .blog-slider .blog-slider-content-outer {
		display: block;
		position: relative;
   		padding-bottom: 60px;
	}
	.blog .blog-slider .blog-slider-content-outer .social-sharing-box {
		position: absolute;
		top: auto;
    	bottom: 0;
	}
}
</style>	