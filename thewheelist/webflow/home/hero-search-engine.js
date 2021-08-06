// Simple empty String
let textHolder = '';
// Add empty string as a choice to the brand-dropdown.
$('.make-dropdown').append('<option value = "' + '' + '">' + '' + '</option>');
// Add every brand to brand dropdown
$('.make-collection-select').each(function () {
    const brandId = $(this).attr('id');
    textHolder = $(this).attr('value');
    $('.make-dropdown').append('<option id="' + brandId + '" value = "' + textHolder + '">' + textHolder + '</option>');
});

// Brand dropdown on change this function is called.
$('.model-dropdown').on('change', function () {
    // Selected brand in the dropdown.
    const selectedMake = $('.make-dropdown :selected').attr('value');
    // Empty model field.
    $('.model-dropdown').empty();
    // Add each model to the model dropdown if it matches the selected brand.
    $('.model-collection-select').each(function () {
        const makeModel = $(this).text();
        const modelId = $(this).attr('id');
        if (makeModel === selectedMake) {
            textHolder = $(this).attr('value');
            $('.model-dropdown').append('<option id="' + modelId + '" value = "' + textHolder + '">' + textHolder + '</option>');
        }
    })
});



// Simple empty String
let textHolder = '';
// Add every make
$('.make-collection-select').each(function () {
    const brandId = $(this).attr('id');
    textHolder = $(this).attr('value');
    $('.make-dropdown').append('<option id="' + brandId + '" value = "' + textHolder + '">' + textHolder + '</option>');
});

// Make dropdown on change this function is called.
$('.make-dropdown').on('change', function () {
    // Selected Make in the dropdown.
    const selectedMake = $('.make-dropdown :selected').attr('value');
    // Empty model field.
    $('.model-dropdown').empty();
    $('.model-dropdown').append('<option value = "' + '' + '">' + 'Select Model' + '</option>');
    // Add each model to the model dropdown if it matches the selected brand.
    $('.model-collection-select').each(function () {
        const makeModel = $(this).text();
        const modelId = $(this).attr('id');
        if (makeModel === selectedMake) {
            textHolder = $(this).attr('value');
            $('.model-dropdown').append('<option id="' + modelId + '" value = "' + textHolder + '">' + textHolder + '</option>');
        }
    })
});

let selectedMakeId = '';
let selectedModelId = '';
let slug = '';
let pageUrl = '';
$('.model-dropdown').on('change', function () {
    selectedMakeId = $('.make-dropdown :selected').attr('id');
    selectedModelId = $('.model-dropdown :selected').attr('id');
    slug = selectedMakeId + '-' + selectedModelId;
    pageUrl = "https://" + window.location.hostname + '/car-reviews/' + slug;
    $('.button-search').click(function () {
        window.location = pageUrl;
    });
});


