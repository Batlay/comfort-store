import { AxiosError } from "axios";

function ErrorPage({error, refetch}: {error: AxiosError, refetch?: any}) {
  return ( 
    <div className="flex justify-center mt-10">
      <div className="text-center px-10 py-5 rounded">
        <p className="text-xl mb-3">Oops, something went wrong...</p>
        {error.status === 404 &&  <p className="text font-bold">Couldn't find the data</p>}
        {error.status === 500 &&  <p className="text-sm font-bold">SOMEONE KILLED OUR SERVERS!!!</p>}
        {refetch && <button className="mx-auto btn btn-outline btn-sm capitalize mt-3" onClick={refetch}>try again</button>}
      </div>
    </div>
  );
}

export default ErrorPage;