export interface CustomWindow extends Window {
  isYTPlayerReady?: boolean
  onYouTubeIframeAPIReady?: any
  YT?: any
  onYTPlayerReady?: { (): void } []
}

declare const window: CustomWindow;

const youTubeApi = () => {
  window.isYTPlayerReady = false
  const youTubeApiScript = document.createElement('script')
  youTubeApiScript.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0]

  if (firstScriptTag && firstScriptTag.parentNode) {
    firstScriptTag.parentNode.insertBefore(youTubeApiScript, firstScriptTag)
  }

  window.onYouTubeIframeAPIReady = () => {
    window.isYTPlayerReady = true
    if (window.onYTPlayerReady && window.onYTPlayerReady.length) {
      while (window.onYTPlayerReady.length) {
        const cb = window.onYTPlayerReady.pop()
        cb?.call(this)
      }
    }
  }
}

export default () => {
  youTubeApi()
}
