import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { LuTag,LuUser2,LuNavigation } from "react-icons/lu";
import axios from '../../api/axios'
import Cookies from 'js-cookie'

const EventPreview = ({}) => {
    const {eId} = useParams();
    const loc = useLocation();
    const navigate = useNavigate();
    // const { id } = useParams();
    // const event = products.find((p) => p.id === parseInt(id));

    const [eventID, setEventID] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [estAttendants, setEstAttendants] = useState('');
    const [venueName, setVenueName] = useState('');
    const [imageFileName, setImageFileName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventSchedStart, setEventSchedStart] = useState(new Date());
    const [eventSchedEnd, setEventSchedEnd] = useState(new Date());
    const [eventRegDeadline, setEventRegDeadline] = useState(new Date());

    useEffect(() => {
        const getEvents = async () => {
                  // try { const response = await axios.get('/event/'+state.id, {  
                  try { const response = await axios.get('/event/'+eId+'/auth', {  
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token 
                    }
                  });
                  if(response.data){
                    // console.log(response.data)
                    setEventID(response.data.event.id)
                    setName(response.data.event.name);
                    setDescription(response.data.event.description);
                    setCategoryName(response.data.event.category_id.name);
                    setEstAttendants(response.data.event.est_attendants);
                    setVenueName(response.data.event.venue_id.name);
                    setEventLocation(response.data.event.location);
                    setEventSchedStart(response.data.event.date_sched_start);
                    setEventSchedEnd(response.data.event.date_sched_end);
                    setEventRegDeadline(response.data.event.date_reg_deadline);
                    
                    // console.log(JSON.stringify(response.data.media))
                    if (response.data.media.length > 0) {
                      setImageFileName(response.data.media[0].file_name);
                      setImageUrl(response.data.media[0].url);
                    }
                  }
              } catch (e) {
                  console.log(e);
              }
          }
          getEvents();
      }, []);
  return (
    <div className="items-start min-h-screen bg-base-200">
      <div className="container w-full lg:w-3/4 xl:w-2/3 mx-auto">
        {eId && 
            <>
             <div className="flex justify-between items-center">
             <h1 className="text-5xl font-bold pt-10 pb-5">{name}</h1>
             {/* <button class="btn btn-error" onClick={()=>{<Navigate to={-1} replace />}}> */}
             <button class="btn btn-error" onClick={()=>{navigate(-1, { state: { from: loc } })}}>

                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                Close Preview
            </button>
             </div>
            <img src={imageUrl} alt={imageFileName} className="w-full h-128 shadow-2xl" />
            <div className='grid grid-cols-5 py-4 gap-12 place-items-center px-6'>
              
              <div className='text-sm flex '><LuTag size={18} className='mr-1.5' />{categoryName}</div>
              <div className='text-sm flex'><LuUser2 size={18} className='mr-1.5' />{estAttendants + '+'}</div>
              <div className='text-sm flex'>{format(new Date(eventSchedStart), 'MMM dd - ') + format(new Date(eventSchedEnd), 'MMM dd, yyyy') }</div>
              <div className='text-sm flex'><LuNavigation size={18} className='mr-1.5' />{venueName + ", " + eventLocation}</div>
              <div className='text-sm flex'>
                  {' Reg. Deadline: '+ format(new Date(eventRegDeadline), 'MMM dd, yyyy') }
              </div>
              
            </div>
            <div className='grid grid-cols-5 h-80'>
              <div className='col-span-4 px-10'>
                <h1 className="text-3xl font-bold pb-3">About this Event</h1>
                <p>{description}</p>
              </div>
              <div className='flex justify-center'>
                 
              <button className="btn btn-primary px-0 sm:px-4 md:px-8">Attend</button>
              
                
                  
              </div>
            </div>
            </>
        }
      </div>
    </div>
  )
}

export default EventPreview