$(function(){

  function buildHTML(message){

    image = (message.image_url) ? `<img class="lower-message__image" src="${ message.image_url }">`: "";

    var html = `<div class="message" data-message-id="${message.id}">
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
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージを送信できません');
      $('.form__submit').prop('disabled', false);
    })
  });

  // 自動更新 
  var reloadMessages = function () {
    if (location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').filter(":last").data("message-id"); 
      $.ajax({
        url: location.href,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        scroll();
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    };
  };
  setInterval(reloadMessages, 5000);
});