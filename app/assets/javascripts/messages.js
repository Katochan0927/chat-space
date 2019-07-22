$(function(){

  function buildHTML(message){

    var image = "";

    image = (message.image_url) ? `<img class="lower-message__image" src="${ message.image_url }">`: "";

    var html = `<div class="message">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${message.user_name}
    </div>
    <div class="upper-message__date">
    ${message.created_at}
    </div>
    </div>
    <div class="lower-message">
    <p class="lower-message__content">
    ${message.content}
    </p>
    ${image}
    </div>
    </div>`
    return html;
  }

  function scroll() {

    window.scroll(0,$(document).height());
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData($(this).get(0))
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      scroll();
      $('#message_content').val('')
      $('#message_image').val('')
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージを送信できません');
      $('.form__submit').prop('disabled', false);
    })
  });
});