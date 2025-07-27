import { Skeleton } from "@/components/ui/skeleton"

const SkeletonDemo = ( {params} ) => {
 
  return (
    <>
      {/* Sidebar */}
      
      <div className='w-[25vw] h-[90.8vh] bg-#09090b top-[55px] sticky rounded-md m-1 flex flex-col items-center gap-3 p-1 border-zinc-800 border-[0.5px]'>
        <div className='h-auto px-[1px] py-[10px] bg-#18181b w-[90%] rounded-md flex flex-col gap-2 justify-center items-center'>
          <h3 className='text-2xl font-bold text-white'>Loading</h3>
          <div className='w-[21vw] h-[0.5px] bg-zinc-700'></div>
          <div className="h-[71vh] overflow-y-scroll bg-#09090b">
            <div className="flex flex-col">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            </div>
          </div>
        </div>
        <div className='fixed bottom-4'>
        {/* <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div> */}
        </div>
      </div>

      {/* My Page */}
      <div className='h-auto w-auto bg-#09090b m-2 flex flex-col items-start gap-6 pt-[50px]'>
      <div className='h-auto w-auto bg-#09090b m-2 flex flex-col items-start gap-6 pt-[50px]'>
      {/* <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div> */}
</div>

      </div>

      {/* Task Detail */}
      {/* <div className='h-[90.8vh] w-[35vw] rounded-md bg-#09090b top-[55px] left-[10px] sticky m-2 flex flex-col border border-zinc-800'>
        <div onClick={handleDelete} className='text-white flex justify-between m-1 p-3 cursor-pointer'>
          <Trash2 />
          <Menu />
        </div>
        <div className='h-[1px] w-full bg-zinc-800'></div>
        {task && (
          <>
            <div className='flex flex-row p-1 justify-between'>
              <div className='flex flex-row p-0'> */}
                {/* <img src={session?.user?.image || "default-image.jpg"} alt="User" className='cardimg m-2 rounded-full' /> */}
                {/* <h1 className='text-2xl font-semibold text-white flex p-2 items-center'>{task.title}</h1>
              </div>
              <div className='text-white font-thin text-xs flex m-2 items-end'>
                <p>{task.start_d.split(' ')[0]}</p>
              </div>
            </div>
            <div className='h-[1px] w-full bg-zinc-800'></div>
            <div className='h-[40vh] text-sm font-inter font-poppins text-white flex p-3'>
              <span>{task.descrption}</span>
            </div>
            <div className='h-[1px] w-full bg-zinc-800'></div>
            <div className='p-3 text-white flex flex-row'>
              <div className='w-auto flex flex-row gap-5 justify-center text-white'>
                {task.priority === 1 && <span className="flex flex-row">Priority : Low <ArrowDown /></span>}
                {task.priority === 2 && <span className="flex flex-row">Priority : Mid <ArrowRight /></span>}
                {task.priority === 3 && <span className="flex flex-row">Priority : High <ArrowUp /></span>}
              </div>
            </div>
            <div className='h-[1px] w-full bg-zinc-800'></div>
            <div className='p-3 text-white flex flex-col items-center'>
              <p>Assigned To</p>
              <div className='h-[1px] w-[50%] bg-zinc-800'></div>
            </div>
          </>
        )}
      </div>
      <Create userMail={session?.user?.email} listId={params.listId} /> */}
    </>
  );
}

export default SkeletonDemo;
