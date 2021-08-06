//<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" referrerpolicy="no-referrer"></script>


Vue.config.devtools = true
new Vue({
  el: '#app',
  data() {
    return {
      bodyTypes: null,
      makes: null
    }
  },
  mounted() {
    axios.post('https://pitwall.thewheelist.com/graphql', {
      query: `
      {
        bodyTypeQuery: taxonomyTermQuery(filter: {conditions: [{field: "vid.target_id", value: "body_type"}]}) {
          bodytypes: entities {
            entityId
            entityLabel
            ... on TaxonomyTermBodyType {
              fieldImage {
                url
              }
            }
          }
        }
        makeQuery: taxonomyTermQuery(filter: {conditions: [{field: "vid.target_id", value: "make"}]}) {
          makes: entities {
            entityId
            entityLabel
            ... on TaxonomyTermMake {
              fieldLogo {
                width
                url
                height
              }
            }
          }
        }
      }      
			`
    })
      .then(response => {
        this.bodyTypes = response.data.data.bodyTypeQuery.bodytypes
        this.makes = response.data.data.makeQuery.makes
      })
  }
})