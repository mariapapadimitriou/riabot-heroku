plotResponse()

function getResponse() {

  if (localStorage.getItem("prompt_to_response") != null) {
  
    prompt_response_map = JSON.parse(localStorage.getItem("prompt_to_response"))
    prompt_id_map = JSON.parse(localStorage.getItem("prompt_to_id"))
  }
  
  else {

    var prompt_response_map = {}
    var prompt_id_map = {}

  }

  const p = document.getElementById('prompt').value;

  document.getElementById('prompt').value = ""

  var temp = parseInt(document.getElementById('temperature').value)
  var max_words = parseInt(document.getElementById('maxwords').value)
  var top = parseInt(document.getElementById('top_p').value)
  var freq_pen = parseInt(document.getElementById('freq_pen').value)
  var pres_pen = parseInt(document.getElementById('pres_pen').value)
  
  var engine = document.getElementById('engineselect').value

  const data = {
      "prompt": p,
      "temperature": temp,
      "max_tokens": max_words,
      "top_p": top,
      "frequency_penalty": freq_pen,
      "presence_penalty": pres_pen,
      "engine": engine,
  };

  $.ajax({
    type: "POST",
    url: "/getResponse",
    data: data,
    dataType: 'json',
    success: function(result) {
        storeResponse(p, result.response.choices[0].text, result.response.id)
    }
  }); 
}

function storeResponse(prompt, response, id) {

  if (localStorage.getItem("prompt_to_response") != null) {
  
    prompt_response_map = JSON.parse(localStorage.getItem("prompt_to_response"))
    prompt_id_map = JSON.parse(localStorage.getItem("prompt_to_id"))
  }
  
  else {

    var prompt_response_map = {}
    var prompt_id_map = {}

  }

    prompt_response_map[prompt] = response
    prompt_id_map[prompt] = id
  
    localStorage.setItem("prompt_to_response", JSON.stringify(prompt_response_map))
    localStorage.setItem("prompt_to_id", JSON.stringify(prompt_id_map))
  
    plotResponse()
  }
  
  function plotResponse() {

    if (localStorage.getItem("prompt_to_response") != null) {
  
      prompt_response_map = JSON.parse(localStorage.getItem("prompt_to_response"))
      prompt_id_map = JSON.parse(localStorage.getItem("prompt_to_id"))
    }
    
    else {
  
      var prompt_response_map = {}
      var prompt_id_map = {}
  
    }
  
    if (JSON.parse(localStorage.getItem("prompt_to_response"))) {
  
      var responses = JSON.parse(localStorage.getItem("prompt_to_response"))
      var ids = JSON.parse(localStorage.getItem("prompt_to_id"))
  
      var return_string = ``
    
      for (i=0; i<Object.keys(responses).length; i++) {
  
        var p = Object.keys(responses)[i]
        var r = responses[p]
        var ind = ids[p]
  
        return_string += `<div class=\"response\"><div><b>Prompt: </b> ${p} <br><hr><b>Response:</b> ${r}</div><div class=\"icons\"><button class=\"actionbtns\" onclick=\"deletePrompt(\'${ind}\');\"><h2><i class=\"fa-solid fa-circle-xmark fa-gradient\"></i></h2></button></div></div>`
    
      }
    
      document.getElementById("responses").innerHTML = return_string
  
    }
  
    updateInstructions()
  }
  
  function deletePrompt(id) {
  
    var prompt_response_map = JSON.parse(localStorage.getItem("prompt_to_response"))
    var prompt_id_map = JSON.parse(localStorage.getItem("prompt_to_id"))
  
    var prompt = getKeyByValue(prompt_id_map, id)
  
    delete prompt_response_map[prompt]
    delete prompt_id_map[prompt]
  
    localStorage.setItem("prompt_to_response", JSON.stringify(prompt_response_map))
    localStorage.setItem("prompt_to_id", JSON.stringify(prompt_id_map))
  
    plotResponse()
  }
  
  function fillPrompt() {
    var p = document.getElementById("purposepicker").value
  
    if (p == "Default") {
      document.getElementById("prompt").value = ""
    }
    else if (p == "Classification") {
      document.getElementById("prompt").value = "Classify the following into cats or dogs"
    }
    else if (p == "Generation") {
      document.getElementById("prompt").value = "Brainstorm some ideas involving"
    }
  }
  
  function updateInstructions() {
    if (document.getElementById("responses").innerHTML == "") {
      document.getElementById("responseempty").innerHTML = "Responses will appear below once the user enters prompts in the input above."
    }
    else {
      document.getElementById("responseempty").innerHTML = ""
    }
  }
  
  function getKeyByValue(object, value) {
      return Object.keys(object).find(key => object[key] === value);
  }
  