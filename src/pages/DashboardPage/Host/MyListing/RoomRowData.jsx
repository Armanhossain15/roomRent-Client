import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useState } from 'react'
import DeleteModal from '../../../../components/Modal/DeleteModal'
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast'
import { axiosSecure } from '../../../../hooks/useAxiosSecure';

const RoomRowData = ({ room, refetch }) => {
  //for delete Modal
  let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/room/${id}`)
      return data
    },
    onSuccess: data=>{
      console.log(data);
      toast.success('data delete successfully')
      refetch()
    }
  })

  const handleDelete = async (id) => {
    console.log(id);
    try{
     await mutateAsync(id)

      setIsOpen(false)
    } catch (err) {
      console.log(err);
      toast.error(err.message)
    }

  }

  //for update modal

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={room?.image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
          <div className='ml-3'>
            <p className='text-gray-900 whitespace-no-wrap'>{room?.title}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{room?.location}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>${room?.price}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(room?.from), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
          {format(new Date(room?.to), 'P')}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => setIsOpen(true)} className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Delete</span>
        </button>
        {/* Delete modal */}
        <DeleteModal closeModal={closeModal} isOpen={isOpen} handleDelete={handleDelete} id={room?._id} />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update</span>
        </span>
        {/* Update Modal */}
      </td>
    </tr>
  )
}

RoomRowData.propTypes = {
  room: PropTypes.object,
  refetch: PropTypes.func,
}

export default RoomRowData