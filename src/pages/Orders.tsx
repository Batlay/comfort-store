import Loading from "../components/UI/Loading";
import Pagination from "../components/UI/Pagination";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { useFetchOrders } from "../services/api/api";
import moment from 'moment'
import { toast} from "react-toastify";
import { logoutUser } from "../services/helpers/auth";
import ErrorPage from "../components/ErrorPage";

function OrdersPage() {
  const {userToken} = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const {data: orders, isPending, error} = useFetchOrders(userToken!)

  if (isPending) {
    return <Loading />
  }

  if (error) {
    if (error.status === 403 || error.status === 401) {
      toast.error('Ваша сессия истекла')
      logoutUser(dispatch)
    } else {
      return <ErrorPage error={error} />
    }
  }

  const total = orders?.meta.pagination.total || 0
  const pageSize = orders?.meta.pagination.pageSize || 10

  return ( 
  <section className="pt-20">
    <h2 className="capitalize font-medium text-2xl tracking-wider">Total orders: {orders?.meta.pagination.total}</h2>
    <div className="divider"></div>
      
    <div className="">
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.data.map(order => 
            <tr key={order.id}>
              <td>{order.attributes.name}</td>
              <td>{order.attributes.address}</td>
              <td>{order.attributes.numItemsInCart}</td>
              <td>{order.attributes.orderTotal}</td>
              <td>{moment(order.attributes.publishedAt).format('h:mm a MMMM Do YYYY')}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <div className="flex justify-center items-end mb-10">
      <Pagination totalItems={total} itemsPerPage={pageSize} />
    </div>
  </section>
  );
}

export default OrdersPage;