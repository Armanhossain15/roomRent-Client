import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../../../../hooks/useAxiosCommon";
import LoadingSpinner from "../../../../components/Shared/LoadingSpinner";
import useAuth from "../../../../hooks/useAuth";
import RoomRowData from "./RoomRowData";


const MyListing = () => {
    const {user} = useAuth()
    // console.log(user?.email);
    const {
        data: rooms = [],
        isLoading,
        refetch
      } = useQuery({
        queryKey: ['my-listings', user?.email],
        queryFn: async () => {
          const { data } = await axiosCommon.get(`/my-listings/${user?.email}`)
    
          return data
        },
      })
    // console.log(rooms);
      if (isLoading) return <LoadingSpinner />
    return (
        <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Guest Info
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      From
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      To
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {rooms?.map(room=> <RoomRowData key={room._id} room={room} refetch={refetch}></RoomRowData>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default MyListing;