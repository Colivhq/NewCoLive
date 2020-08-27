<template>
    <div class="inner-content-wrapper px-3" id="features-table">
        <prismic-rich-text :field="slice.primary.title" class="description"/>
        <prismic-rich-text :field="slice.primary.text" class="details"/>
        <b-table-simple class="text-center" responsive>
            <b-thead>
                <b-tr>
                    <b-th v-for="(header, index) in tHead" :key="index"><prismic-rich-text :field="header.cell"/></b-th>
                </b-tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="(body, index) in tBody" :key="'data-' + index">
                    <b-th class="text-left"><prismic-rich-text :field="body[0].cell"/></b-th>
                    <b-td v-for="indexCol in columnLength" :key="indexCol + 'col'">
                        <prismic-rich-text v-if="indexCol <= columnLength" :field="body[indexCol].cell"/>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
    </div>
</template>

<script>
export default {
  props: ['slice'],
  name: 'table-slice',
  data() {
    return {
      custFullWidth: 'inner-content-wrapper',
      tHead: {},
      columnLength: 0,
      tBody: {},
    }
  },
  beforeMount() {
      var arr = this.slice.items;
    var size = this.slice.primary.columns;
    var data = this.chunk(arr, size);
    this.tHead = data.slice(0, 1)[0];
    this.tBody = data.slice(1, data.length);
    this.columnLength = Object.keys(this.tHead).length - 1
    console.log(this.columnLength);
  },
  methods: {
      chunk(features, chunk_size){
          var index = 0;
          var arrayLength = features.length;
          var featuresArray = [];
          for (index = 0; index < arrayLength; index += chunk_size) {
              var myChunk = features.slice(index, index+chunk_size);
              featuresArray.push(myChunk);
          }
          return featuresArray;
      }
  }
}
</script>

<style>
/************ Begin Feature-list-css ***********/
#features-table .description h3 {
    margin-bottom: 90px;
}
#features-table p {
    margin: 0;
}
#features-table .table-responsive {
    margin-top: 30px;
}
#features-table table {
    color: #000000;
}
#features-table table thead th, #features-table table tbody th, #features-table table tbody td {
    border: 1px solid #d4d9de;
}
#features-table table tbody th, #features-table table tbody td {
    border-bottom: none;
    border-top: none;
}
#features-table table tbody tr:last-child th, #features-table table tbody tr:last-child td {
    border-bottom: 1px solid #d4d9de;
}
#features-table table thead th:nth-child(1), #features-table table tbody th:nth-child(1), #features-table table thead th:nth-child(2), #features-table table tbody td:nth-child(2) {
    border-right-color: #70c242;
}
#features-table table thead th:nth-child(2) {
    border-top-color: #70c242;
    border-bottom-color: #70c242;
}
#features-table table tbody tr:last-child td:nth-child(2) {
    border-bottom-color: #70c242;
}
#features-table table th, #features-table table td {
    padding: 1rem 0.75rem;
}
#features-table table thead th {
    text-align: center;
    vertical-align: middle;
    font-size: 13px;
    width: 180px;
}
#features-table table thead th:first-child {
    text-align: left;
    padding: 1rem 0.75rem 1rem 2rem;
}
#features-table table thead th img {
    width: 50px;
}
#features-table table tbody th {
    font-weight: bold;
    font-size: 12px;
    padding: 1rem 0.75rem 1rem 2rem;
}
#features-table table tbody td {
    vertical-align: middle;
}
#features-table table tbody img {
    width: 16px;
}
#features-table table p {
    font-size: inherit;
}
@media only screen and (min-width: 768px) and (max-width: 991px), only screen and (min-device-width: 768px) and (max-device-width: 991px) {
    #features-table table thead th:first-child {
        padding: 0rem 0.2rem 0rem 1.5rem;
    }
    #features-table table thead th {
        width: 20%;
        font-size: 65%;
        padding: 0.5rem 0.2rem;
    }
    #features-table table thead th img {
        width: 25px;
    }
    #features-table table tbody th {
        font-size: 65%;
        padding: 0.5rem 0.75rem 0.5rem 1.5rem;
    }
    #features-table table th, #features-table table td {
        padding: 0.5rem 0.75rem;
    }
    #features-table table tbody img {
        width: 15px;
    }
}
@media only screen and (min-width: 542px) and (max-width: 767px), only screen and (min-device-width: 542px) and (max-device-width: 767px) {
    #features-table table thead th:first-child {
        padding: 0rem 0.2rem 0rem 1rem;
    }
    #features-table table thead th {
        /* width: auto;
        font-size: 60%; */
        width: 20%;
        font-size: 75%;
        padding: 0rem 0.2rem;
    }
    #features-table table thead th img {
        width: 20px;
    }
    #features-table table tbody th {
        /* font-size: 60%; */
        font-size: 45%;
        padding: 0.5rem 0.75rem 0.5rem 1rem;
    }
    #features-table table th, #features-table table td {
        padding: 0.5rem 0.75rem;
    }
    #features-table table tbody img {
        width: 10px;
    }
}
@media only screen and (max-width: 541px), only screen and (max-device-width: 541px) {
  #features-table table tr {
    display: table;
    table-layout: fixed;
    width: 100%;
  }
  #features-table table thead th, #features-table table tbody th, #features-table table tbody td {
      display: table-cell;
  }
}
/************ End Feature-list-css ***********/
</style>
