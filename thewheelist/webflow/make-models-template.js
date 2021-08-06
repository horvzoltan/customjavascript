//<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
//<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js" referrerpolicy="no-referrer"></script>

const selectedMakeModel = $('.selected-make-model').text();
const pageUrl = "https://" + window.location.hostname;
console.log(selectedMakeModel);
Vue.config.devtools = true;
const vue = new Vue({
    el: "#app",
    data() {
        return {
            makeModels: null,
            search: '',
            makeModelSeries: [],
            selectedSeriesCodes: [],
            selectedDriveTypes: [],
            selectedFuelTypes: [],
            selectedCylinders: [],
            selectedInductionTypes: [],
            urlBodyType: null,
            urlMake: null,
        };
    },
    methods: {
        setSessionStorageListingName: function (name, slug) {
            sessionStorage.setItem('Listing Name', name);
            sessionStorage.setItem('Listing Id', slug);
        },
        removeSelectedSeriesCode: function (item) {
            this.selectedSeriesCodes = this.selectedSeriesCodes.filter(element => element !== item);
        },
        removeSelectedDriveType: function (item) {
            this.selectedDriveTypes = this.selectedDriveTypes.filter(element => element !== item);
        },
        removeSelectedFuelType: function (item) {
            this.selectedFuelTypes = this.selectedFuelTypes.filter(element => element !== item);
        },
        removeSelectedCylinder: function (item) {
            this.selectedCylinders = this.selectedCylinders.filter(element => element !== item);
        },
        removeSelectedInductionType: function (item) {
            this.selectedInductionTypes = this.selectedInductionTypes.filter(element => element !== item);
        },
        resetFilters: function () {
            $('.filter-checkbox').prop("checked", false);
            this.selectedSeriesCodes = [];
            this.selectedDriveTypes = [];
            this.selectedFuelTypes = [];
            this.selectedCylinders = [];
            this.selectedInductionTypes = [];
        },
        openBodyUrl: function () {
            window.location = this.urlBodyType;
        },
        openMakeUrl: function () {
            window.location = this.urlMake;
        },
        openRightSideLink: function (slug) {
            window.location = pageUrl + '/car-reviews/' + slug;
        }
    },
    computed: {
        loadOtherBodyTypeCars() {
            if (this.makeModels == null) {
                return null;
            }
            const currentFilteredMakeModel = this.makeModels.filter((item) =>
                item.entityLabel == selectedMakeModel,
            )
            currentBodyType = currentFilteredMakeModel[0].fieldBodyType.entity.entityLabel;
            return this.makeModels.filter((item) => item.fieldBodyType.entity.entityLabel == currentBodyType).map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)
        },
        filteredMakeModel() {
            if (this.makeModels == null) {
                return null;
            }
            const currentFilteredMakeModel = this.makeModels.filter((item) =>
                item.entityLabel == selectedMakeModel,
            )
            let currentBodyType = 'not-set-in-database';
            let currentMake = 'not-set-in-database';

            currentBodyType = currentFilteredMakeModel[0].fieldBodyType.entity.entityLabel.toLowerCase();
            currentMake = currentFilteredMakeModel[0].fieldMake.entity.entityLabel.toLowerCase();

            this.urlBodyType = pageUrl + '/body-type/' + currentBodyType;
            this.urlMake = pageUrl + '/make/' + currentMake;
            return currentFilteredMakeModel;
        },
        filteredByMakeModel() {
            if (this.makeModelSeries == null) {
                return null;
            }
            return this.makeModelSeries.filter((item) =>
                item.makeModel.entity.entityLabel.toLowerCase() == selectedMakeModel.toLowerCase(),
            )
        },
        filteredBySearch() {
            if (this.filteredByMakeModel == null) {
                return null;
            }
            if (this.search.length == 0) {
                return this.filteredByMakeModel;
            }
            return this.filteredByMakeModel.filter((item) =>
                item.entityLabel.toLowerCase().includes(this.search.toLowerCase())
            )
        },
        filteredMakeModelSeriesBySeriesCode() {
            if (this.filteredBySearch == null) {
                return null;
            }
            if (this.selectedSeriesCodes.length == 0) {
                return this.filteredBySearch;
            }
            return this.filteredBySearch
                .filter(
                    (item) =>
                        this.selectedSeriesCodes.indexOf(item.fieldSeriesCodeMxph10r) > -1
                )
        },
        filteredMakeModelSeriesByDriveType() {
            if (this.filteredMakeModelSeriesBySeriesCode == null) {
                return null;
            }
            if (this.selectedDriveTypes.length == 0) {
                return this.filteredMakeModelSeriesBySeriesCode;
            }
            return this.filteredMakeModelSeriesBySeriesCode
                .filter(
                    (item) =>
                        this.selectedDriveTypes.indexOf(item.fieldDriveType) > -1
                )
        },
        filteredMakeModelSeriesByFuelType() {
            if (this.filteredMakeModelSeriesByDriveType == null) {
                return null;
            }
            if (this.selectedFuelTypes.length == 0) {
                return this.filteredMakeModelSeriesByDriveType;
            }
            return this.filteredMakeModelSeriesByDriveType
                .filter(
                    (item) =>
                        this.selectedFuelTypes.indexOf(item.fieldFuelType) > -1
                )
        },
        filteredMakeModelSeriesByCylinders() {
            if (this.filteredMakeModelSeriesByFuelType == null) {
                return null;
            }
            if (this.selectedCylinders.length == 0) {
                return this.filteredMakeModelSeriesByFuelType;
            }
            return this.filteredMakeModelSeriesByFuelType
                .filter(
                    (item) =>
                        this.selectedCylinders.indexOf(item.fieldCylinders) > -1
                )
        },
        filteredMakeModelSeriesByInductionType() {
            if (this.filteredMakeModelSeriesByCylinders == null) {
                return null;
            }
            if (this.selectedInductionTypes.length == 0) {
                return this.filteredMakeModelSeriesByCylinders;
            }
            return this.filteredMakeModelSeriesByCylinders
                .filter(
                    (item) =>
                        this.selectedInductionTypes.indexOf(item.fieldInductionType) > -1
                )
        },
        loadedSeriesCode() {
            const seriesCodes = new Set();
            const availableDriveTypes = new Set();
            this.filteredByMakeModel.forEach(function (item) {
                if (item.fieldSeriesCodeMxph10r != null) {
                    seriesCodes
                        .add(item.fieldSeriesCodeMxph10r);
                }
            });
            this.filteredMakeModelSeriesByInductionType.forEach(function (item) {
                if (item.fieldDriveType != null) {
                    availableDriveTypes.add(item.fieldDriveType);
                }
            });
            $('.drivetype-checkbox').each(function () {
                const currentDriveType = $(this).attr("value");
                const item = $('.drivetype-checkbox[value="' + currentDriveType + '"]');
                const itemLabel = $('.drivetype-label[value="' + currentDriveType + '"]');
                if (availableDriveTypes.has(currentDriveType) == false) {
                    item.prop('disabled', true);
                    itemLabel.addClass('disable');
                } else {
                    item.prop('disabled', false);
                    itemLabel.removeClass('disable');
                }
            });
            return seriesCodes;
        },
        loadedDriveType() {
            const driveTypes = new Set();
            const availableFuelTypes = new Set();
            this.filteredByMakeModel.forEach(function (item) {
                if (item.fieldDriveType != null) {
                    driveTypes.add(item.fieldDriveType);
                }
            });
            this.filteredMakeModelSeriesByInductionType.forEach(function (item) {
                if (item.fieldFuelType != null) {
                    availableFuelTypes.add(item.fieldFuelType);
                }
            });
            $('.fueltype-checkbox').each(function () {
                const currentFuelType = $(this).attr("value");
                const item = $('.fueltype-checkbox[value="' + currentFuelType + '"]');
                const itemLabel = $('.fueltype-label[value="' + currentFuelType + '"]');
                if (availableFuelTypes.has(currentFuelType) == false) {
                    item.prop('disabled', true);
                    itemLabel.addClass('disable');
                } else {
                    item.prop('disabled', false);
                    itemLabel.removeClass('disable');
                }
            });
            return driveTypes;
        },
        loadedFuelType() {
            const fuelTypes = new Set();
            const availableCylinders = new Set();
            this.filteredByMakeModel.forEach(function (item) {
                if (item.fieldFuelType != null) {
                    fuelTypes.add(item.fieldFuelType);
                }
            })
            this.filteredMakeModelSeriesByInductionType.forEach(function (item) {
                if (item.fieldCylinders != null) {
                    availableCylinders.add(item.fieldCylinders);
                }
            });
            $('.cylinders-checkbox').each(function () {
                const currentCylinder = $(this).attr("value");
                const item = $('.cylinders-checkbox[value="' + currentCylinder + '"]');
                const itemLabel = $('.cylinders-label[value="' + currentCylinder + '"]');
                if (availableCylinders.has(currentCylinder) == false) {
                    item.prop('disabled', true);
                    itemLabel.addClass('disable');
                } else {
                    item.prop('disabled', false);
                    itemLabel.removeClass('disable');
                }
            });
            return fuelTypes;
        },
        loadedCylinders() {
            const cylinders = new Set();
            const availableInductionTypes = new Set();
            this.filteredByMakeModel.forEach(function (item) {
                if (item.fieldCylinders != null) {
                    cylinders.add(item.fieldCylinders);
                }
            });
            this.filteredMakeModelSeriesByInductionType.forEach(function (item) {
                if (item.fieldInductionType != null) {
                    availableInductionTypes.add(item.fieldInductionType);
                }
            });
            $('.inductiontype-checkbox').each(function () {
                const currentInductionType = $(this).attr("value");
                const item = $('.inductiontype-checkbox[value="' + currentInductionType + '"]');
                const itemLabel = $('.inductiontype-label[value="' + currentInductionType + '"]');
                if (availableInductionTypes.has(currentInductionType) == false) {
                    item.prop('disabled', true);
                    itemLabel.addClass('disable');
                } else {
                    item.prop('disabled', false);
                    itemLabel.removeClass('disable');
                }
            });
            return cylinders;
        },
        loadedInductionType() {
            const inductionTypes = new Set();
            const availableSeriesCodes = new Set();
            this.filteredByMakeModel.forEach(function (item) {
                if (item.fieldInductionType != null) {
                    inductionTypes.add(item.fieldInductionType);
                }
            });
            this.filteredMakeModelSeriesByInductionType.forEach(function (item) {
                if (item.fieldSeriesCodeMxph10r != null) {
                    availableSeriesCodes.add(item.fieldSeriesCodeMxph10r);
                }
            });
            $('.seriescode-checkbox').each(function () {
                const currentSeriesCode = $(this).attr("value");
                const item = $('.seriescode-checkbox[value="' + currentSeriesCode + '"]');
                const itemLabel = $('.seriescode-label[value="' + currentSeriesCode + '"]');
                if (availableSeriesCodes.has(currentSeriesCode) == false) {
                    item.prop('disabled', true);
                    itemLabel.addClass('disable');
                } else {
                    item.prop('disabled', false);
                    itemLabel.removeClass('disable');
                }
            });
            return inductionTypes;
        }

    },
    mounted() {
        axios
            .post("https://pitwall.thewheelist.com/graphql", {
                query: `
                {
                    nodeQuery(filter: {conditions: [{field: "status", value: "1"}]}, limit: 1000000) {
                      entities {
                        ... on NodeMakeModelSeries {
                          entityLabel
                          fieldSlug
                          fieldFuelType
                          fieldCylinders
                          fieldDriveType
                          fieldInductionType
                          fieldSeriesCodeMxph10r
                          bodyType:fieldBodyType {
                            entity{
                              entityLabel
                            }
                          }
                          fieldMake{
                            entity{
                              entityLabel
                            }
                          }
                          makeModel:fieldMakeModelReference {
                            entity {
                              entityLabel 
                            }
                          }
                        }
                      }
                    }
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
                  }
                          
			`,
            })
            .then((response) => {
                this.makeModelSeries = response.data.data.nodeQuery.entities;
                this.makeModels = response.data.data.makeModelQuery.makeModelEntity;
            })
            ;
    },

});