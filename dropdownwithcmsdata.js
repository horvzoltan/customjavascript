// Simple empty String
let s = '';
// Add empty string as a choice to the brand-dropdown.
$('.brand-dropdown').append('<option value = "' + '' + '">' + '' + '</option>');
// Add every brand to brand dropdown
$('.select-brand').each(function () {
    s = $(this).text();
    $('.brand-dropdown').append('<option value = "' + s + '">' + s + '</option>');
})

// Brand dropdown on change this function is called.
$('#field-make').on('change', function () {
    // Selected brand in the dropdown.
    let selectedBrand = $('#field-make :selected').text();
    // Creating empty brandModel variable.
    let brandModel = '';
    // Empty model field.
    $('#field-model').empty();
    // Empty listing field.
    $('#field-listing').empty();
    // Add empty String to model dropdown.
    $('.model-select-field').append('<option value = "' + '' + '">' + '' + '</option>');
    // Add each model to the model dropdown if it matches the selected brand.
    $('.select-models').each(function () {
        brandModel = $($(this).parent().parent().contents().get(0)).text();
        if (brandModel === selectedBrand) {
            s = $(this).text();
            $('.model-select-field').append('<option value = "' + s + '">' + s + '</option>');
        }
    })
});
// Model dropdown on change this function is called.
$('#field-model').on('change', function () {
    // Selected model in the dropdown.
    let selectedModel = $('#field-model :selected').text();
    // Creating empty listingModel variable.
    let listingModel = '';
    // Empty listing field.
    $('#field-listing').empty();
    // Add empty String to listing dropdown.
    $('.listing-select-field').append('<option value = "' + '' + '">' + '' + '</option>');
    // Add each listing to the listing dropdown if it matches the selected model.
    $('.select-listing').each(function () {
        listingModel = $($(this).parent().parent().contents().get(0)).text();
        if (listingModel === selectedModel) {
            s = $(this).text();
            $('.listing-select-field').append('<option value = "' + s + '">' + s + '</option>');
        }
    })
});