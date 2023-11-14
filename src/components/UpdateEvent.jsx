import React from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const UpdateEvent = ({
    events, updateEvent, editName, setEditName, editDescription, setEditDescription, editDate, setEditDate, editLocation, setEditLocation, editCategory, setEditCategory, editVenue, setEditVenue, editUser, setEditUser
}) => {
    const {id} = useParams()
    const event = events.find(event => (event.id).toString() === id)


    useEffect(() => {
        if (event) {
            setEditName(event.name)
            setEditDescription(event.description)
        }
    }, [post, setEditTitle, setEditBody])
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        {event && 
            <>
            <h2>Edit Event</h2>
            <img src="/images/stock/photo-1635805737707-575885ab0820.jpg" className="max-w-sm h-96 w-96 rounded-lg shadow-2xl" />
            <div>
              <h1 className="text-5xl font-bold">{event.name}</h1>
              <p className="py-6">{event.description}</p>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                    id = "postTitle" 
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea 
                        id=""
                        required 
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)} />
                    <button type="submit" onClick={() => updateEvent(post.id)}> Submit </button>
                </form>
            </div>
            </>
        }
        {!event && 
            <>
            
            <div>
              <h1 className="text-5xl font-bold">Oops! Event not found</h1>
            </div>
            </>
        }
        
      </div>
    </div>
  )
}

export default UpdateEvent