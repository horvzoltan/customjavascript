// <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" referrerpolicy="no-referrer"></script>




const selectedBodyType = $(".bodytype-selected").text().toLowerCase();
Vue.config.devtools = true;
new Vue({
  el: "#app",
  data() {
    return {
      pageUrl: "https://" + window.location.hostname,
      makeModels: null,
      makes: null,
      selectedMakes: [],
    };
  },
  methods: {
    openLink: function (slug) {
      window.location = pageUrl + '/car-reviews/' + slug;
    }
  },
  computed: {
    loadMakes() {
      const makes = new Set();
      if (this.makeModels == null) {
        return null;
      }
      this.makeModels.forEach(item => {
        makes.add(item.fieldMake.entity.entityLabel)
      });
      return makes;
    },
    filteredMakeModels() {
      if (this.makeModels == null) {
        return null;
      }
      if (this.selectedMakes.length == 0) {
        return this.makeModels.filter(
          (item) => (item.fieldBodyType.entity.entityLabel).toLowerCase() == selectedBodyType
        );
      }
      return this.makeModels
        .filter(
          (item) =>
            this.selectedMakes.indexOf(item.fieldMake.entity.entityLabel) > -1
        )
        .filter(
          (item) => (item.fieldBodyType.entity.entityLabel).toLowerCase() == selectedBodyType
        );
    },
  },
  mounted() {
    axios
      .post("https://pitwall.thewheelist.com/graphql", {
        query: `
      {
        makeModelQuery: taxonomyTermQuery(filter: {conditions: [{field: "vid.target_id", value: "make_model"}]},limit:10000) {
          makeModelEntity: entities {
            ... on TaxonomyTermMakeModel {
              entityLabel
              fieldMake {
                entity {
                    entityId
                    entityLabel
                }
              }
              fieldBodyType {
              	entity {
                    entityId
                    entityLabel
                }
              }
              fieldSlug
            }
          }
        }
        makeQuery: taxonomyTermQuery(filter: {conditions: [{field: "vid.target_id", value: "make"}]},limit:10000) {
            makes: entities {
                entityId
                entityLabel
            }
          }
      }
			`,
      })
      .then((response) => {
        console.log(response);
        this.makeModels = response.data.data.makeModelQuery.makeModelEntity;
        this.makes = response.data.data.makeQuery.makes;
      });
  },
});
