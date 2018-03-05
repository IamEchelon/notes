import './styles/main.sass'
import Elm from '../elm/Main.elm'
import { chooseSynth } from './js/synths'
import { browser } from './js/browser'

// Set and initialize constants
const node = document.getElementById('main')
const elmApp = Elm.Main.embed(node)
const context = new AudioContext()
const android = browser.android()
const iphone = browser.iphone()
const ipad = browser.ipad()
let synth = chooseSynth('duosynth')

// elm callbacks
const triggerNote = elmNote => synth.triggerAttack(elmNote)

const stopNote = noop => synth.triggerRelease()

const synthSelection = elmSynth => (synth = chooseSynth(elmSynth))

const setMobileContext = noop => StartAudioContext(Tone.context, '#playButton')

// elm subscriptions
if (android || iphone || ipad) {
  elmApp.ports.initMobile.subscribe(setMobileContext)
}

elmApp.ports.synthToJS.subscribe(synthSelection)
elmApp.ports.noteToJS.subscribe(triggerNote)
elmApp.ports.stopNote.subscribe(stopNote)

console.log('Initialized app')
