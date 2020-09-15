<template>
  <div class="header-wrap" :style="color">
    <header class="site-header">
      <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-4 header-logo">
          <router-link to="/" class="logo">
            <prismic-image :field="fields.logo"/>
          </router-link>
        </div>
        <div class="col-lg-10 col-md-9 col-sm-8 header-menu">
        <nav class="navbar navbar-expand-lg">
            <a class="navbar-brand title" href="#">Menu</a>
            <button
              type="button"
              :style="color"
              data-toggle="collapse"
              data-target="#navbarmenuContent"
              aria-controls="navbarmenuContent"
              aria-expanded="true"
              aria-label="Toggle navigation"
              class="navbar-toggler mb-2">
              <span class="navbar-toggler-icon">
                <i
                  :style="{'color': fields.header.text_color}"
                  class="fa fa-bars text-s"
                  aria-haspopup="true"
                  aria-expanded="false"></i>
                <!-- <img src="https://images.prismic.io/cmct-web/26783acb-d53b-4a36-ad70-d45f942fe546_Mobile+menu%402x.png?auto=compress,format" alt="Mobile menu icon"> -->
              </span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarmenuContent" :style="color">
              <ul class="navbar-nav mr-auto">
                <li v-for="(slice, index) in slices" :key="'slice-' + index" class="nav-item dropdown">
                  <template v-if="slice.slice_type === 'header'">
                    <a v-if="slice.primary.link.link_type == 'Any'"
                      :key="'nav-link-' + index"
                      :href="'javascript:void(0)'"
                      :class="'menu-maintitle nav-link'"
                      :style="{'color': fields.header.text_color}"
                      data-toggle="dropdown" >
                      <!-- {{ $prismic.asText(slice.primary.label) }} -->
                      {{slice.primary.label}}
                    </a>

                    <template v-else>        
                      <prismic-link  
                        :field="slice.primary.link" 
                        class="menu-maintitle nav-link" 
                        @click.native="closeMenu()"
                        :style="{'color': fields.header.text_color}"
                        :key="'nav-link-' + index">
                        <!-- {{ $prismic.asText(slice.primary.label) }} -->
                        {{slice.primary.label}}
                      </prismic-link>
                    </template>
                    <i
                      v-if="slice.items.length > 1"
                      :style="{'color': fields.header.text_color}"
                      class="fa fa-caret-down"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"></i>
                    <template v-if="slice.items.length >= 1">
                      <div class="dropdown-menu" aria-labelledby="navbarDropdown" :style="background">
                        <template v-for="(item, index) in slice.items">
                          <prismic-link
                            :field="item.sub_nav_link"
                            :key="'header-item-' + index"
                            @click.native="closeMenu()"
                            class="menu-subtitle dropdown-item">
                            <!-- {{ $prismic.richTextAsPlain(item.sub_nav_label) }} -->
                            {{item.sub_nav_label}}
                          </prismic-link>
                        </template>
                      </div>
                    </template>
                  </template>
                </li>
              </ul>
            </div>
          </nav>
          <prismic-link :field="fields.bolder_link" class="dashboard-btn" :style="button">
              {{ fields.bolder_link_label }}
          </prismic-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'header-prismic',
  data () {
    return {
      hovered: false,
      slices: [],
      fields: {
        header: {
          background_color: '',
          text_color: '',
          transparency: ''
        },
        logo: [],
        tagline: [],
        background: [],
        transparency: [],
        bolder_link_label: [], 
        bolder_link: [],
        mobileMenu: []
      }
    }
  },
  head () {
    return {
      meta: [
        { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" }
      ]
    }
  },
  watch: {
    "fields.logo"(newVal) {
      this.$store.commit('setHeaderLogo' ,newVal)
    }
  },
  computed:{
    color () {
      if (this.fields.header.background_color) {
        let transparency = Number(this.fields.header.transparency)/100 
              
            // If the hex value is valid. 
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.fields.header.background_color)) { 
                  
                // Getting the content after '#',
                let ret = this.fields.header.background_color.slice(1); 
                // Splitting each character 
                ret = ret.split(''); 
                  
                // Checking if the length is 3 
                // then make that 6 
                if(ret.length == 3) { 
                    var ar = []; 
                    ar.push(ret[0]);  
                    ar.push(ret[0]); 
                    ar.push(ret[1]); 
                    ar.push(ret[1]); 
                    ar.push(ret[2]); 
                    ar.push(ret[2]); 
                    ret = ar; 
                } 
                  
                // Starts with '0x'(in hexadecimal) 
                ret = '0x'+ ret.join(''); 
                  
                // Converting the first 2 characters 
                // from hexadecimal to r value 
                var r = (ret>>16)&255; 
                  
                // Converting the second 2 characters 
                // to hexadecimal to g value 
                var g = (ret>>8)&255; 
                  
                // Converting the last 2 characters 
                // to hexadecimal to b value 
                var b = ret&255; 
                  
                // Appending all of them to make 
                // the RGBA value 
                
                let color = 'rgba('+[r, g, b].join(',')+',' + transparency + ')';
                return {
                  'background-color': color,
                  'border': '1px solid ' + color,
                  'color': this.fields.header.text_color
                }
            }
        }
    },
    background(){
      if (this.fields.header.background_color) {
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(this.fields.header.background_color)) { 
          // Getting the content after '#',
          let ret = this.fields.header.background_color.slice(1); 
          // Splitting each character 
          ret = ret.split(''); 
                  
          // Checking if the length is 3 
          // then make that 6 
          if(ret.length == 3) { 
              var ar = []; 
              ar.push(ret[0]);  
              ar.push(ret[0]); 
              ar.push(ret[1]); 
              ar.push(ret[1]); 
              ar.push(ret[2]); 
              ar.push(ret[2]); 
              ret = ar; 
          } 
          ret = '0x'+ ret.join(''); 
                  
          var r = (ret>>16)&255;   
          var g = (ret>>8)&255;  
          var b = ret&255; 
          let color = 'rgba('+[r, g, b].join(',')+',' + 0.9 + ')';
          return {
            'background-color': color,
            'border': '1px solid ' + this.fields.header.text_color,
            'color': this.fields.header.text_color
          }
        }
      }
    },
    button () {
      return {
        'border': '2px solid ' + this.fields.header.text_color,
        'color':  this.fields.header.text_color
      }
    },
    hoverClass() {
      return {
        'color': 'red'
      }
    }
  },
  methods: {
    ...mapMutations('setHeaderLogo'),
    closeMenu() {
        $('#navbarmenuContent').collapse('hide');
    },
    async getMenu () {
      //Query to get menu content
      await this.$prismic.api.getSingle('menu')
        .then((menuContent) => {
          this.fields.logo = menuContent.data.logo
          this.fields.header.background_color = menuContent.data.header_color
          this.fields.header.transparency = menuContent.data.header_transparency_perc
          this.fields.header.text_color = menuContent.data.header_text_color
          this.fields.tagline = menuContent.data.brand_tag_line
          this.fields.background = menuContent.data.background_color
          this.fields.transparency = menuContent.data.transparency
          this.fields.bolder_link_label = menuContent.data.bolder_link_label
          this.fields.bolder_link = menuContent.data.bolder_link
          this.fields.mobileMenu = menuContent.data.mobile_menu
          this.slices = menuContent.data.body
          // this.slices  = menuContent.data.menu_links.filter(function(navs) {                
          //   //return navs.slice_type === 'header';
          //   return navs;
          // });
        })
    }
  },
  created () {
    this.getMenu()
  },
}
</script>

<style scoped>
/* Site header  */
.site-header {
  height: 70px;
  padding: 10px 0;
}
.site-header,
.site-header a {
  /* color: darkgrey; */
  font-weight:400;
}
.site-header nav a:hover {
  color: gray;
}

/* .site-header,
.site-header a {
  color: white;
} */
.site-header nav a:hover {
  color: darkgrey;
}
.site-header .logo {
  font-size: 22px;
  font-weight: 900;  
  line-height: 20px;
}
.site-header nav {
  float: left;
}
.site-header nav ul {
  margin: 0;
}
.site-header nav li {
  margin-left: 27px;
}

/* Media Queries */
@media (max-width: 767px) {
  .site-header {
    height: auto;
  }
  .site-header {
    position: fixed;
    left: 15px;
    right: 15px;
  }
  .site-header .logo {
    display: block;
    text-align: left;
  }
  .site-header nav {
    float: none;
    text-align: center;
  }
  .site-header nav li {
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
  }
}
/* insys*/
.site-header .header-menu ul li {
  display: inline-block;
  vertical-align: middle;
}
.site-header .row {
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
}
/* header menu */
.site-header .header-menu ul li .menu-maintitle {
  font-size: 14px;
  color: #fff;
  font-weight: normal;
  padding: 0px 8px;
  position: relative;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
}
.site-header .header-menu .dashboard-btn {
  font-size: 14px;
  border: 2px solid #fff;
  padding: 0px 15px;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 38px;
  height: 40px;
  margin-left: 27px;
  text-transform: uppercase;
}
.site-header .header-menu a {
  text-decoration: none;
}
.site-header  .header-menu .dashboard-btn:hover {
  border-color: #ffffff;
  color: #72bf44;
  background-color: #ffffff;
}
.header-menu{
  display: flex;
  align-items: center;
}
.site-header .header-menu  .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle {
  color: #666;
  padding: 0 15px;
}
.site-header .header-menu .dropdown-toggle::after {
  border-top: .4em solid #72bf44;
  display: none;
}
.site-header nav {
  padding: 0;
}

.site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle:hover,
.site-header .header-menu .navbar-expand-lg .navbar-nav .menu-subtitle.dropdown-item:focus, 
.site-header .header-menu .navbar-expand-lg .navbar-nav .menu-subtitle.dropdown-item:hover {
  background-color: #72bf44;
  color: #fff;
}
.site-header .header-menu ul li i {
  color: #72bf44; 
  font-size: 16px;
  cursor: pointer;
}
.site-header nav li:first-child {
  margin-left: 0;
}
.site-header .header-menu .dashboard-btn:hover {

}

.text-s {
  font-size: 35px;
}
@media(min-width: 992px){
  .site-header .header-menu .navbar-brand {
    display: none;
  }
  .site-header .header-menu  .navbar-expand-lg .navbar-nav .dropdown-menu{
    background-color: rgb(236, 245, 228,0.9);
    color: #fff;
    border-radius: 0;
    border: none;
    min-width: 8rem;
    margin-top: 0px;
  }
  .site-header .header-menu {
    -webkit-box-pack: flex-end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: flex-end;
    justify-content: flex-end;
  }  
  .site-header .header-menu ul li .menu-maintitle::before {
    content: '';
    position: absolute;
    bottom: 0;
    background-color: #fff;
    width: 0%;
    height: 1px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  .site-header .header-menu ul li .menu-maintitle:hover::before {
    width: 85%;
  }
}
@media(max-width:991px) {
  .site-header .header-menu,
  .site-header .header-menu.navbar {
    -webkit-box-pack: flex-end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: flex-end;
    justify-content: flex-end;
  }
  .site-header .header-menu .navbar-brand.title {
    color: #fff;
    font-size: 18px;
    display: none;
  }
  .site-header .header-menu .navbar-toggler {
    background-color: #e4f3db;
    padding: 3px 8px;
    border: 2px solid #72bf44;
  }
  .site-header .header-menu .navbar-collapse {
    position: absolute;
    top: 100%;
    margin-top: 18px;
    width: 50%;
    right: 15px;
    background-color: rgba(34, 34, 34, 0.8);
    padding: 15px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }
  .site-header nav{
    position: initial;
  }
  .site-header .header-menu  i.fa-caret-down {
    position: absolute;
    top: 10px;
    right: 0;
    left: auto;
    width: 20px;
    line-height: 20px;
    height: 20px;
    text-align: center;
  }
  .site-header .header-menu ul li .menu-maintitle {
    text-align: left;
    font-size: 13px;
    color:#fff;
    padding: 5px 8px;
  }  
  .site-header .header-menu .dashboard-btn {
    margin-left: 0;
  }
  .site-header .header-menu ul li {
    margin-left: 0;
    text-align: left;
  }
  .site-header .header-menu .navbar-nav .dropdown-menu {
    border: none;
    border-top: 1px solid #b5b5b5;
    border-radius: 0;
  }
  .site-header .header-menu .navbar-nav .dropdown-menu {
    background-color: transparent;
    border: none  !important;
  }
  .site-header .header-menu .navbar-expand-lg .navbar-nav .dropdown-menu .menu-subtitle {
    color: #ddd;
  }
  .site-header .header-menu .dashboard-btn {
    position: absolute;
    right: 78px;
    left: auto;
    height: 40px;
    line-height: 38px;
  }
  .site-header .header-menu ul li a:hover {
    color: #72bf44;
  }
}
@media(max-width:767px) {
  .site-header .header-menu .navbar-collapse {
    width: 70%;
  }
}
@media(max-width:575px) {

  .site-header .header-menu {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%); 
    -o-transform: translateY(-50%); 
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    width: 100%;
    right: -15px;
  }
  .site-header .header-menu .navbar-collapse {
    margin-top: 22px;
    width: 90%;
  }
  .site-header .logo {
    position: relative;
    z-index: 9999;
    display: inline-block;
    vertical-align: middle;
  }  
}
@media (max-width: 480px) { 
  .site-header .logo img {
    max-width: 80%;
    /* margin: 5px 0 0 0; */
  }
  .site-header .header-menu .dashboard-btn {
    font-size: 12px;
    padding: 0px 10px;
  }
  .site-header .header-menu .navbar-collapse {
    margin-top: 24px;
  }
}
</style>


