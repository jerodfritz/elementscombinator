$(function() {
  var doCalculation = function(container) {

    var elements = $.csv.toArrays($('#elements').val());
    var superset = [];
    for (var i = 0; i < elements.length; i++) {
      superset.push({
        element : elements[i][0],
        value : elements[i][1],
        color : '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
      });
    }

    $("#results").html("<p style='text-align:center'><img src='http://media.tumblr.com/tumblr_mdl11mGvDG1qd454s.gif'> Loading ... </p>");
    $.ajax({
      url : 'http://elementcombinator.aws.af.cm/',
      data : {
        superset : superset,
        size : $('#size').val(),
        divisor : $('#divisor').val()
      },
      success : function(response) {
        $("#results").html(data);
        var data = JSON.parse(response);
        var html = '<div class="results">';
        html += '<div id="results-total">Total Results : ' + data.length + '</div>';
        html += '<div id="results-list"><ol>';
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          var row = '<div class="row">';
          row += '<li>';
          row += '<div class="value-label">' + item.value + '</div> : ';
          for (var ii = 0; ii < item.combo.length; ii++) {
            var element = item.combo[ii];
            row += "<div class='element-button' style='background-color:" + element.color + "'>" + element.element + "</div> ";
          }
          row += "</li>";
          row += "</div>";
          html += row;
        }
        html += "</ol></div>";
        html += "</div>";
        container.html(html);
      },
    });
  }
  $("#process").click(function() {
    doCalculation($("#results"));
    return false;
  }).click();

}); 