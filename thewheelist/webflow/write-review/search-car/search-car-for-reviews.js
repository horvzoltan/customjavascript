// Simple empty String
let textHolder = '';
// Add empty string as a choice to the brand-dropdown.
$('.brand-dropdown').append('<option value = "' + '' + '">' + '' + '</option>');
// Add every brand to brand dropdown
$('.brand-collection-select').each(function () {
  const brandId = $(this).attr('id');
  textHolder = $(this).attr('value');
  $('.brand-dropdown').append('<option id="' + brandId + '" value = "' + textHolder + '">' + textHolder + '</option>');
})

// Brand dropdown on change this function is called.
$('.brand-dropdown').on('change', function () {
  // Selected brand in the dropdown.
  const selectedBrand = $('.brand-dropdown :selected').attr('value');
  // Empty model field.
  $('.model-dropdown').empty();
  // Empty listing dropdown.
  $('.listing-dropdown').empty();
  // Add empty String to model dropdown.
  $('.model-dropdown').append('<option value = "' + '' + '">' + '' + '</option>');
  // Add each model to the model dropdown if it matches the selected brand.
  $('.model-collection-select').each(function () {
    const brandModel = $(this).text();
    const modelId = $(this).attr('id');
    if (brandModel === selectedBrand) {
      textHolder = $(this).attr('value');
      $('.model-dropdown').append('<option id="' + modelId + '" value = "' + textHolder + '">' + textHolder + '</option>');
    }
  })
});

// Model dropdown on change this function is called.
$('.model-dropdown').on('change', function () {
  // Selected model in the dropdown.
  const selectedModel = $('.model-dropdown :selected').attr('value');
  // Empty listing dropdown.
  $('.listing-dropdown').empty();
  // Add empty String to listing dropdown.
  $('.listing-dropdown').append('<option value = "' + '' + '">' + '' + '</option>');
  // Add each listing to the listing dropdown if it matches the selected model.
  $.getJSON('https://horvzoltan.github.io/data/cards.json', function (data) {
    $.each(data, function (i, item) {
      if (selectedModel == item.Model) {
        const slug = item.Slug;
        $('.listing-dropdown').append('<option id="' + slug + '" value="' + item.Name + '" >' + item.Name + '</option>');
      }
    });
  });
});

$('.listing-dropdown').on('change', function () {
  // Gets the id from the selected listing item.
  const selectedId = $('.listing-dropdown :selected').attr('id');
  // Set slug input to slug
  $('.js-listing-slug').val(selectedId);
  // Stores the id and the name in the Sessionstorage
  sessionStorage.setItem('Listing Name', this.value);
  sessionStorage.setItem('Listing Id', selectedId);
});
// Set Years
$('.year-select-item').each(function () {
  const year = $(this).text();
  $('.year-select-field').append('<option value="' + year + '" >' + year + '</option>');
})

