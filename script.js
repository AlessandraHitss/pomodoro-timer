let action = document.querySelector("#action");
let pause = document.querySelector("#pause");
let longPause = document.querySelector("#long_pause");
let section = document.querySelector("#section");

let sec;
let title;
var min;

let bell = new Audio("./audios/audio_bell.mp3");
let back = new Audio("./audios/audio_volta.mp3");
let final = new Audio("./audios/audio_final.mp3");

let music = document.querySelector("#music");
let iconPlay = document.querySelector("#icon-play");
let iconPause = document.querySelector("#icon-pause");



function start() {
    if (action.value == 0) {
        document.querySelector('#error-action').innerHTML= 'Adicione os minutos'
        action.focus();
      } else if (pause.value == 0) {
        document.querySelector('#error-pause').innerHTML ='Adicione a pausa'
        pause.focus();
      }else if (longPause.value == 0) {
        document.querySelector('#error-long-pause').innerHTML ='Adicione a pausa longa'
        pause.focus();
      }else if (section.value == 0) {
        document.querySelector('#error-section').innerHTML ='Adicione as sessões'
        section.focus();
      } else {
        // music.play()
        iconPause.style.setProperty('display', 'block', 'important')

        localStorage.setItem('action', String(action.value))
        localStorage.setItem('pause', String(pause.value))
        localStorage.setItem('long_pause', String(longPause.value))
        localStorage.setItem('section', String(section.value))

        document.querySelector('#config').style.setProperty('display', 'none', 'important')
        document.querySelector('#timer').style.setProperty('display', 'flex', 'important')

        momentAction()
      }
}



function momentAction () {
  let value_sections = localStorage.getItem('section')
  let title_section = document.querySelector('#title_section')
  if( value_sections != '1') {
    title_section.innerHTML =  `${value_sections} sessões restantes`
  } else {
    title_section.innerHTML = `${value_sections} sessão restante`
  }

  title = document.querySelector('#title_timer')
  title.innerHTML= 'WORK'


  title.style.fontSize = '25px'
  title.style.fontWeight = 'bold'
  title.style.setProperty('color', '#28a745', 'important')

 min = Number(localStorage.getItem('action'))

  min -= 1
  sec = 59

  document.querySelector('#minutes').innerHTML = min
  document.querySelector('#seconds').innerHTML = sec

  var minInterval = setInterval(minTimer, 60000)
  var secInterval = setInterval(secTimer, 1000)

    function minTimer() {
      min -= 1
      document.querySelector('#minutes').innerHTML = min
    }

    function secTimer() {
      sec -= 1
      document.querySelector('#seconds').innerHTML = sec

      if(sec <= 0 ) {
        if(min <= 0) {
          clearInterval(minInterval)
          clearInterval(secInterval)

          if(value_sections > 1) {
            bell.play()

            momentPause()
          } else {
            momentLongPause()
          }

         
        }
        sec = 60
      }

     
    }

}




function momentPause() {
title = document.querySelector('#title_timer')
  title.innerHTML= 'PAUSE'

  title.style.fontSize = '25px'
  title.style.fontWeight = 'bold'
  title.style.setProperty('color', '#dc3543', 'important')

  min_pause = Number(localStorage.getItem('pause'))


  min_pause -= 1
  sec_pause = 59

  document.querySelector('#minutes').innerHTML = min_pause
  document.querySelector('#seconds').innerHTML = sec_pause

  var minInterval = setInterval(minTimer, 60000)
  var secInterval = setInterval(secTimer, 1000)

  function minTimer() {
    min_pause -= 1
    document.querySelector('#minutes').innerHTML = min_pause
  }

  function secTimer() {
    sec_pause -= 1
    document.querySelector('#seconds').innerHTML = sec_pause

    if(sec_pause <= 0 ) {
      if(min_pause <= 0) {
        total_sections = Number(localStorage.getItem('section'))
        total_sections-= 1
        localStorage.setItem('section', String(total_sections))

        clearInterval(minInterval)
        clearInterval(secInterval)

        back.play()
        momentAction()
      }
      sec_pause = 60
    }
  }

}


function momentLongPause () {

  title = document.querySelector('#title_timer')
  title.innerHTML= 'LONG'

  title.style.fontSize = '25px'
  title.style.fontWeight = 'bold'
  title.style.setProperty('color', '#28a745', 'important')

  min_long = Number(localStorage.getItem('long_pause'))


  min_long -= 1
  sec_long = 59

  document.querySelector('#minutes').innerHTML = min_long

  document.querySelector('#seconds').innerHTML = sec_long

  var minInterval = setInterval(minTimer, 60000)
  var secInterval = setInterval(secTimer, 1000)

    function minTimer() {
      min_long -= 1
      document.querySelector('#minutes').innerHTML = min_long
    }

    function secTimer() {
      sec_long -= 1
      document.querySelector('#seconds').innerHTML = sec_long

      if(sec_long <= 0 ) {
        if(min_long <= 0) {
          clearInterval(minInterval)
          clearInterval(secInterval)

          final.play()
          localStorage.clear()

          document.querySelector('#config').style.setProperty('display', 'none', 'important')
          document.querySelector('#timer').style.setProperty('display', 'none', 'important')
          document.querySelector('#end').style.setProperty('display', 'flex', 'important')
        }
        sec_long = 60
      }
    }

}


function resetTimer () {

  // let teste = document.querySelector('#title_timer')
  // console.log(teste)

  // if(title === 'WORK' ) {
  //   console.log('entrou')

    // min = Number(localStorage.getItem('action'))

    // min -= 1
    // sec = 59
  
    // document.querySelector('#minutes').innerHTML = min
    // document.querySelector('#seconds').innerHTML = sec
  // }
}
