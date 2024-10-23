import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { userAPI } from "../../../features/users/userAPI";
import { Link } from "react-router-dom";
import { useDeleteUserMutation } from "../../../features/users/userAPI";
import { Toaster, toast } from 'sonner';

const Members = () => {
  const [loading, setLoading] = useState(true);
  const { data: users } = userAPI.useGetUsersQuery()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after delay
    }, 5000); // Simulate a 1 second delay

    return () => clearTimeout(timer);
  }, []);

  //delete user
  const [deleteUser] = useDeleteUserMutation();
  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
      toast.success('user deleted successfully');

    } catch (error) {
      alert('Failed to delete user');
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl flex justify-center text-white font-semibold mb-6">Our members</h2>
      <div className="m-10">
        <table>
          <thead>
          <tr>
              <th className="px-4 py-2 border-b">First Name</th>
              <th className="px-4 py-2 border-b">Second Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Phone Number</th>
              <th className="px-4 py-2 border-b">Id</th>
              <th className="px-4 py-2 border-b">Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
              <tr>
                <td colSpan={4} className="flex items-center ml-[200%] justify-center py-6">
                  {/* <SyncLoader size={20} aria-colspan={4} color={"#EBF4F6"} loading={loading} /> */}
                  <ClipLoader size={35} color={"#37B7C3"} loading={loading} />
                </td>
              </tr>
            ) : (
              // Display the members once the data is ready
              users?.length ?? 0 > 0 ?(
                users?.map((user) => (
                  <tr key={user.user_id} className="border-b">
                    <td className="px-4 py-2">{user.first_name} </td>
                    <td className="px-4 py-2">{user.last_name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.phone_number}</td> 
                    <td className="px-4 py-2">{user.user_id}</td>
                    <td className="px-4 py-2">
                      <img src={user.image_url }
                      className="rounded-full h-12 w-12 object-cover border-2" alt="pic" />
                      </td>
                    <td>
    <Link to='profile' className='btn btn-sm btn-primary mx-2'>
        Edit
    </Link>
    <button
     onClick={() => handleDelete(user.user_id)}
      className='btn btn-sm btn-error'>
        Delete
    </button>
</td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No System members.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Members