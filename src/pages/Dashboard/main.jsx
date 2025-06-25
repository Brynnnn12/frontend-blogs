export default function DashboardMain() {
  const countBlog = 10; // Example count of blogs

  const countCategory = 5; // Example count of categories

  return (
    //card
    <>
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <div className="bg-blue-500 p-4 rounded shadow">
          <h2 className="text-xl  font-bold mb-2">Total Blogs</h2>
          <p className="text-2xl ">{countBlog}</p>
        </div>

        <div className="bg-blue-500 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Total Categories</h2>
          <p className="text-2xl ">{countCategory}</p>
        </div>
      </div>
    </>
  );
}
