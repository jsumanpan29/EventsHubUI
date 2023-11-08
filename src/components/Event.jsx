import React from 'react'

const Event = () => {
  return (
    <tr>
        <td>
        <div className="flex items-center space-x-3">
            <div className="avatar">
            <div className="mask w-44 h-28">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="Event Image Here" />
            </div>
            </div>
        </div>
        </td>
        <td>
        Zemlak, Daniel and Leannon
        <br/>
        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>
        Zemlak, Daniel and Leannon
        <br/>
        <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <th>
        <button className="btn btn-ghost btn-xs">details</button>
        </th>
    </tr>
  )
}

export default Event