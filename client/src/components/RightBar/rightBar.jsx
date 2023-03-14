import './rightBar.css'

export default function rightBar() {
  return (
    <div className='rightBarArea'>
      <div id="dailyVersesWrapper"></div>
      <script async defer src="https://dailyverses.net/get/verse.js?language=niv"></script>
    </div>
  )
}
