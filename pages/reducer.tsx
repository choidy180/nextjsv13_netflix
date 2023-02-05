import React from 'react'

function Reducer() {
    const [event, updateEvent] = React.useReducer(
        (prev:any, next:any) => {
            return { ...prev, ...next }
        },
        { title: '', description: '', attendees: [] }
    )
    return (
        <>
            <div className='w-full min-h-screen flex flex-col justify-center items-center space-y-10'>
                <div className='flex flex-col items-start'>
                    <h1 className='text-white'>TITLE</h1>
                    <input 
                        type="text" 
                        className='bg-slate-600 py-2 px-3 text-xl'
                        value={event.title}
                        onChange={(e) => updateEvent({title: e.target.value})}
                    />
                    <h4>{event.title}</h4>
                </div>
                <div className='flex flex-col items-start'>
                    <h1 className='text-white'>DESCRIPTION</h1>
                    <input 
                        type="text" 
                        className='bg-slate-600 py-2 px-3 text-xl'
                        value={event.description}
                        onChange={(e) => updateEvent({description: e.target.value})}
                    />
                    <h4>{event.description}</h4>
                </div>
            </div>
        </>
    )
}

export default Reducer