const rangeInputs = document.querySelectorAll('input[type="range"]')

setInputColor()

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById(target.id)
  } 

  const min = target.min
  const max = target.max
  const val = target.value
  const diff = max - min
  const val_to_plot = ((val-min)/diff)*100
  
  target.style.background = `linear-gradient(to right, #8f16ff 0%, #8f16ff ${val_to_plot}%, white ${val_to_plot}%, white 100%)`
}

rangeInputs.forEach(input => {

    input.addEventListener('input', handleInputChange)
})

function setInputColor() {

    rangeInputs.forEach(input => {

       if (input.type == "range") {
           
        target = document.getElementById(input.id)

        const min = target.min
        const max = target.max
        const val = target.value
        const diff = max - min
        const val_to_plot = ((val-min)/diff)*100

        target.style.background = `linear-gradient(to right, #8f16ff 0%, #8f16ff ${val_to_plot}%, white ${val_to_plot}%, white 100%)`

       }
    })

}