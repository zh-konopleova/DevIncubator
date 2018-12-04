function loadCharacter (url) {
  var data = localStorage.getItem(url);
  if (data) {
    data = JSON.parse(data);
    renderData(data);
  } else {
    $.ajax({
      url: url
    }).done(function (data) {
      localStorage.setItem(url, JSON.stringify(data));
      renderData(data);
    });
  }
}

function renderData(data) {
  var template = $("#character-template");
  var container = $(".characters__list");
  
  for (var i = 0; i < data.results.length; i++) {
    var character = data.results[i];

    template = template.clone();
    template.removeClass("hidden");

    template.find('.character__info-value--name').html(character.name);
    template.find('.character__info-value--birth').html(character.birth_year);
    template.find('.character__info-value--height').html(character.height);
    template.find('.character__info-value--mass').html(character.mass);
    
    template.find('.character').attr('data-href', character.url);
    template.find('.character').click(openCardCharacter);

    container.append(template);
  }

  if (data.next) {
    $(".characters__link").attr("href", data.next);
  } else {
    $(".characters__link").addClass("hidden");
  }
}

function clickLoadMore(event) {
  event.preventDefault();

  var url = $(this).attr("href");
  loadCharacter(url);
}

function openCardCharacter(event) {
  event.preventDefault();
  
  
  var url = $(this).attr('data-href');
  $.ajax({
    url: url
  }).done(renderCharacter);
};

function renderCharacter (data) {
  var template = $("#passport-template");
  template.removeClass("hidden");
  template.find('.passport__info-value--name').html(data.name);
  template.find('.passport__info-value--birth').html(data.birth_year);
  template.find('.passport__info-value--height').html(data.height);
  template.find('.passport__info-value--mass').html(data.mass);
  template.find('.passport__info-value--gender').html(data.gender);
  template.find('.passport__info-value--hair-color').html(data.hair_color);
  template.find('.passport__info-value--fair').html(data.fair);
  template.find('.passport__info-value--eye-color').html(data.eye_color);
};

$(".characters__link").click(clickLoadMore);
loadCharacter("https://swapi.co/api/people/?page=1");
