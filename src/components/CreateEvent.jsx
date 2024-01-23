import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import Cookies from 'js-cookie'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import DatePicker from 'react-date-picker';
import { format } from 'date-fns';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [estAttendants, setEstAttendants] = useState('')
  const [venue, setVenue] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  const navigate = useNavigate()
  const loc = useLocation();

  const [venueList, setVenueList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const defaultEndDate = new Date();
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultEndDate.getDate() - 1);

  const [valueDateSched, onValueDateSched] = useState([defaultStartDate, defaultEndDate]);
  const [valueRegDeadline, onValueRegDeadline] = useState(defaultStartDate);

  const handleDateRangeChange = (newValue) => {
    // Ensure the end date is always later than the start date
    if (newValue[1] < newValue[0]) {
      newValue[1] = newValue[0];
    }
    onValueDateSched(newValue);

    // Update the registration deadline if needed
    if (valueRegDeadline < newValue[0]) {
      onValueRegDeadline(newValue[0]);
    }
  };

  const handleRegDeadlineChange = (date) => {
    // Ensure the registration deadline is not later than the start date
    if (date > valueDateSched[0]) {
      date = valueDateSched[0];
    }
    onValueRegDeadline(date);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setImages(files)
    }
  };

  const eventSubmit = async(e) => {
      e.preventDefault()
      const formData = new FormData();
      formData.append('name', eventName);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('date_sched_start', format(new Date(valueDateSched[0]), "yyyy-MM-dd HH:mm:ss"));
      formData.append('date_sched_end', format(new Date(valueDateSched[1]), "yyyy-MM-dd HH:mm:ss"));
      formData.append('date_reg_deadline', format(new Date(valueRegDeadline), "yyyy-MM-dd HH:mm:ss"));
      formData.append('est_attendants', estAttendants);
      formData.append('venue_id', venue);
      formData.append('category_id', category);
      formData.append('event_status', 0);
      formData.append('user_id', JSON.parse(Cookies.get('user')).user.id);
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
      try {
        const response = await axios.post('/events', 
          formData,
            {
                headers:
                {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ` + JSON.parse(Cookies.get('user')).token
                },
            },
        );
        navigate("/dashboard", { replace: true, state: { createEventSuccess: true } });
      } catch (err) {
        console.log(err)
      }

  }

  useEffect(() => {
    if (venueList && venueList.length > 0) {
      setVenue(venueList[0].id); 
    }
  }, [venueList]);

  useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      setCategory(categoryList[0].id); 
    }
  }, [categoryList]); 

  useEffect(() => {

      const getVenueList = async () => {
          try {
            const response = await axios.get('/venues',{
                headers: {
                  'Accept':'application/json'
                }
            })
            setVenueList(response.data.venues)
          } catch (err) {
            console.log(err)
          }
          
         
      }
      getVenueList();

  }, [])

  useEffect(() => {

    const getCategoryList = async () => {
        try {
          const response = await axios.get('/categories',{
              headers: {
                'Accept':'application/json'
              }
          })
          setCategoryList(response.data.categories)
        } catch (err) {
          console.log(err)
        }
        
       
    }
    getCategoryList();

}, [])

  return (
    <div className="items-start min-h-screen bg-base-200">
       <div className="container w-full max-w-xl lg:w-3/4 xl:w-2/3 mx-auto">
        <h1 className='text-xl text-center font-semibold pt-3'>Create New Event</h1>
        <form className="card-body" onSubmit={eventSubmit}>
          <div className="form-control">
              <label className="label">
              <span className="label-text">Name of Event</span>
              </label>
              <input type="text" placeholder="Name of Event" name="event_name"  className="input input-bordered" required  value={eventName} onChange={(e) => setEventName(e.target.value)} />
          </div>
          <div className="form-control">
              <label className="label">
              <span className="label-text">Location</span>
              </label>
              <input type="text" placeholder="Location" name="location"  className="input input-bordered" required  value={location} onChange={(e) => setLocation(e.target.value)}/>
          </div>
          <div className="form-control">
              <label className="label">
              <span className="label-text">Estimated Attendants</span>
              </label>
              <input type="text" placeholder="Estimated Attendants" name="est_attendants"  className="input input-bordered" required value={estAttendants} onChange={(e) => setEstAttendants(e.target.value)}/>
          </div>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Venue</span>
            </div>
            <select class="select select-bordered" value={venue} onChange={(e) => setVenue(e.target.value)} required>
                 {venueList && venueList.length > 0 &&
                    venueList.map((venue, index) => (
                      <option key={index} value={venue.id}>{venue.name}</option>
                    ))
                  }
            </select>
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Category</span>
            </div>
            <select class="select select-bordered" value={category} onChange={(e) => setCategory(e.target.value)} required>
              {categoryList && categoryList.length > 0 &&
                categoryList.map((category, index) => (
                  <option key={index} value={category.id}>{category.name}</option>
                ))
              }
            </select>
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Description</span>
            </div>
            <textarea class="textarea textarea-bordered h-24" placeholder="Description"  value={description}  onChange={(e) => setDescription(e.target.value)} required></textarea>
            <div class="label">
              <span class="label-text-alt">Describe your Event</span>
            </div>
          </label>
          <div className='grid grid-flow-row md:grid-flow-col'>
            <div class="label grid grid-flow-row">
              <span class="label-text pb-2">Event Schedule</span>
              <DateRangePicker onChange={handleDateRangeChange} value={valueDateSched} required />
            </div>
            <div class="label grid grid-flow-row">
              <span class="label-text pb-2">Event Registration Deadline</span>
              <DatePicker onChange={handleRegDeadlineChange} value={valueRegDeadline} required/>
            </div>
          </div>
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Image Banner</span>
            </div>
            <input type="file" class="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} required/>
          </label>
          
          
          <div className="form-control mt-6 grid grid-flow-col gap-2">
              <input className='btn btn-primary' type="submit" value="Submit" />
              <input className="btn btn-neutral" type="button" value="Close" onClick={()=>{navigate(-1)}}/>
          </div>
          </form>
       </div>
    </div>
  )
}

export default CreateEvent