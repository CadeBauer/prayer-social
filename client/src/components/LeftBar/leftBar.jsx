import './leftBar.css'
import RssFeedIcon from '@mui/icons-material/RssFeed';
import HelpIcon from '@mui/icons-material/Help';
import ChatIcon from '@mui/icons-material/Chat';

export default function leftBar() {
  return (
    <div className='leftBar'>
      <div className="leftBarWrapper">
        <ul className="leftBarList">
          <li className="leftBarListItem">
            <RssFeedIcon className='leftBarIcon'/>
            <span className="leftBarListItemText">Feed</span>
          </li>
          <li className="leftBarListItem">
            <ChatIcon className='leftBarIcon'/>
            <span className="leftBarListItemText">Chat</span>
          </li>
          <li className="leftBarListItem">
            <HelpIcon className='leftBarIcon'/>
            <span className="leftBarListItemText">Help</span>
          </li>
        </ul>
        <button className='leftBarButton'>Show More</button>
        <hr className='leftBarLine'></hr>
        <ul className="leftBarFriendList">
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
          <li className='leftBarFriendItem'>
            <img className='leftBarFriendPicture' src="/assets/Person/Tony Stark.jpg" alt="" />
            <span className="leftBarFriendName">Name</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
