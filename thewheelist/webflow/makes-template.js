//<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" referrerpolicy="no-referrer"></script>
const selectedMake = $(".make-selected").text().toLowerCase();
Vue.config.devtools = true;
new Vue({
  el: "#app",
  data() {
    return {
      pageUrl: "https://" + window.location.hostname,
      makeModels: null,
      bodyTypes: null,
      selectedBodyTypeIds: []
    };
  },
  methods: {
    openLink: function (slug) {
      window.location = pageUrl + '/car-reviews/' + slug;
    }
  },
  computed: {
    filteredMakeModels() {
      if (this.makeModels == null) {
        return null;
      }
      if (this.selectedBodyTypeIds.length == 0) {
        return this.makeModels.filter(
          (item) =>
            item.fieldMake.entity.entityLabel.toLowerCase() == selectedMake
        );
      }
      return this.makeModels
        .filter(
          (item) =>
            this.selectedBodyTypeIds.indexOf(
              item.fieldBodyType.entity.entityId
            ) > -1
        )
        .filter(
          (item) =>
            item.fieldMake.entity.entityLabel.toLowerCase() == selectedMake
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
            bodyTypeQuery: taxonomyTermQuery(filter: {conditions: [{field: "vid.target_id", value: "body_type"}]},limit:10000) {
              bodyTypes: entities {
                entityId
                entityLabel
              }
            }
          }
          
			`,
      })
      .then((response) => {
        this.makeModels = response.data.data.makeModelQuery.makeModelEntity;
        this.bodyTypes = response.data.data.bodyTypeQuery.bodyTypes;
      });
  },
});

