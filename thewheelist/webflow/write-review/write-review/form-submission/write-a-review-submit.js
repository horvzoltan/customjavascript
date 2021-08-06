//<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" referrerpolicy="no-referrer"></script>

let data = null;
let slug = sessionStorage.getItem('Listing Id');
let doneFetching = false;
var currentUUID = "";
axios
    .post("https://pitwall.thewheelist.com/graphql", {
        query: `
        {
            nodeQuery(filter: {conditions: [{field: "status", value: "1"}]}, limit: 1000000) {
              entities {
                ... on NodeMakeModelSeries {
                  uuid
                  entityLabel
                  fieldSlug
                }
              }
            }
          }
			`,
    })
    .then((response) => {
        data = response.data.data.nodeQuery.entities;
        doneFetching = true;
        if (doneFetching) {
            let temp = data.filter((obj) => {
                return obj.fieldSlug === slug
            })
            currentUUID = temp[0].uuid;
            console.log(currentUUID);
        }
    })


$(document).ready(function () {
    $('#review-form').submit(function (event) {
        event.preventDefault()
        let element = document.getElementById('review-form');
        let dataForm = new FormData(element);
        let config = {
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        }
        let defaultJson = {
            "data": {
                "type": "comment--car_reviews",
                "attributes": {
                    "subject": "test from API",
                    "name": "My Name",
                    "mail": "my@email.com",
                    "field_daily_score": 1,
                    "field_exterior_design_score": 1,
                    "field_family_score": 1,
                    "field_interior_design_score": 1,
                    "field_offroad_score": 1,
                    "field_performance_score": 1,
                    "field_reliability_score": 1,
                    "field_review_body": "anonymous review\r\nsecond line",
                    "field_road_trip_score": 1,
                    "field_technology_score": 1,
                    "field_work_score": 1,
                    "entity_type": "node",
                    "field_name": "comment"
                },
                "relationships": {
                    "field_photo": {
                        "data": {
                            "type": "file--file",
                            "id": "58789ea9-5c5d-47a9-8e5e-a1e08999e21e"
                        }
                    },
                    "entity_id": {
                        "data": {
                            "type": "node--make_model_series",
                            "id": "6e0771b5-0c33-417a-87d2-b00d104a6558"
                        }
                    }
                }
            }
        }
        defaultJson.data.attributes.field_daily_score = parseInt(dataForm.get('field_daily_score'));
        defaultJson.data.attributes.field_exterior_design_score = parseInt(dataForm.get('field_exterior_design_score'));
        defaultJson.data.attributes.field_family_score = parseInt(dataForm.get('field_family_score'));
        defaultJson.data.attributes.field_interior_design_score = parseInt(dataForm.get('field_interior_design_score'));
        defaultJson.data.attributes.field_offroad_score = parseInt(dataForm.get('field_offroad_score'));
        defaultJson.data.attributes.field_performance_score = parseInt(dataForm.get('field_performance_score'));
        defaultJson.data.attributes.field_reliability_score = parseInt(dataForm.get('field_reliability_score'));
        defaultJson.data.attributes.field_review_body = dataForm.get('field_review_body');
        defaultJson.data.attributes.field_road_trip_score = parseInt(dataForm.get('field_road_trip_score'));
        defaultJson.data.attributes.field_technology_score = parseInt(dataForm.get('field_technology_score'));
        defaultJson.data.attributes.field_work_score = parseInt(dataForm.get('field_work_score'));
        defaultJson.data.relationships.entity_id.data.id = currentUUID;
        defaultJson.data.attributes.subject = dataForm.get('field_review_title');
        defaultJson.data.attributes.name = dataForm.get('field_author');
        defaultJson.data.relationships.field_photo.data.id = dataForm.get('field_image_id');
        axios.post('https://pitwall.thewheelist.com/jsonapi/comment/car_reviews', defaultJson, config)
    })
});
