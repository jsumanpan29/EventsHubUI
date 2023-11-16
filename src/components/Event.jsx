import React, { useState,useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie';
import { useCart } from './CartContext';
import { format } from 'date-fns'

const Event = () => {
  // const {id} = useParams();
  const { state } = useLocation();
  // const event = events.find(event => (event.id).toString() === id)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [userCookie, setUserCookie] = useState(Cookies.get('user'));
  const { cart, addToCart } = useCart();

  useEffect(() => {
    console.log('Cart Data:', cart);
}, [cart]);

  useEffect(() => {
    const getEvents = async () => {
              try { const response = await axios.get('/event/'+state.id, {
                headers: {
                    // 'Accept': 'application/json',
                }
              });
              console.log(response.data.event)
              setName(response.data.event.name);
              setDescription(response.data.event.description);
          } catch (e) {
              console.log(e);
          }
      }
      getEvents();
  }, []);
  const attendEvent = async (id,name) => {
    try {
        // console.log("attendEvent:"+JSON.parse(userCookie))
        // console.log("Name:"+name)
        await addToCart(name)
        console.log('Cart Data:', cart);
        // setTimeout(() => {
        //   console.log('Cart Data:', cart);
        // }, 3500);
    } catch (err) {
        console.log('Error: '+err.message);
    }
}
  const deleteEvent = async (id) => {
    try {
        console.log("deleteEvent:"+JSON.parse(userCookie))
        // const response = await axios.delete(`/events/${id}`,
        //     {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Authorization': `Bearer `+ userCookie.token
        //         }
        //     });
        // if (response.data.message == 'You need to be admin to enable action.') {
        //     // toast.error('You need to be admin to enable action!', {
        //     //     position: "bottom-right",
        //     //     autoClose: 5000,
        //     //     hideProgressBar: false,
        //     //     closeOnClick: true,
        //     //     pauseOnHover: true,
        //     //     draggable: true,
        //     //     progress: undefined,
        //     // });
        // } else {
        //     // toast.error('Product Deleted!', {
        //     //     position: "bottom-right",
        //     //     autoClose: 5000,
        //     //     hideProgressBar: false,
        //     //     closeOnClick: true,
        //     //     pauseOnHover: true,
        //     //     draggable: true,
        //     //     progress: undefined,
        //     // });
        //     const newProducts = products.filter((product) => product.id != id)
        //     setProducts(newProducts);
        // }
    } catch (err) {
        console.log('Error: '+err.message);
    }
}

const updateEvent = async (eventID) => {
    // if (cookies.user.user.role == '0') {
    //     // toast.error('You need to be admin to enable action!', {
    //     //     position: "bottom-right",
    //     //     autoClose: 5000,
    //     //     hideProgressBar: false,
    //     //     closeOnClick: true,
    //     //     pauseOnHover: true,
    //     //     draggable: true,
    //     //     progress: undefined,
    //     // });
    // } else {
    //     navigate('/edit', { state: { id: productId } });
    // }
    // const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    // const updatedPost = { id, title: editTitle, datetime, body: editBody}
    try{
      // const response = await api.put('/posts/'+id, updatedPost)
      // setPosts(posts.map(post => post.id === id ? { ...response.data } : post ))
      // setEditTitle('')
      // setEditBody('')
      // navigate('/')
      console.log("updateEvent:"+JSON.parse(userCookie))
    }catch(err){
      console.log('Error: '+err.message)
    }
}
  return (
    <div className="items-start min-h-screen bg-base-200">
      <div className="container w-full lg:w-3/4 xl:w-2/3 mx-auto">
        {event && 
            <>
             <div>
             <h1 className="text-5xl font-bold pt-10 pb-5">{name}</h1>
             </div>
            <img src="" className="w-full h-96 shadow-2xl" />
            <div>
              
              <p className="py-6">{description}</p>
              <button className="btn btn-primary px-8" onClick={() => attendEvent(state.id,name)}>Add</button>
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

export default Event