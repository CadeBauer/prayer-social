import './feed.css'
import Share from '../Share/Share'
import Post from '../Post/post'
import InfiniteSpace from '../InfiniteSpace/infiniteSpace'

export default function Feed({userID}) {
  return (
    <div className='feedArea'>
      <div className="feedWrapper">
        <InfiniteSpace userID={userID}/>
      </div>
    </div>
  )
}
