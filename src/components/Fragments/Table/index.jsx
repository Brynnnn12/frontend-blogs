export default function Table({ columns, data }) {
  // Pastikan data tidak kosong
  if (!data || data.length === 0) {
    return <div className="text-center">Tidak ada data untuk ditampilkan</div>;
  }

  // memanggil modal edit dan ambil berdasarkan id
  const handleEdit = (row) => {
    // Logika untuk mengedit data
    console.log("Edit row:", row);
    // Misalnya, Anda bisa membuka modal edit di sini
    alert(`Edit row with id: ${row.id}`);
  };
  // menghapus data berdasrkan id
  const handleDelete = (id) => {
    // Logika untuk menghapus data
    console.log("Delete row with id:", id);
    // Misalnya, Anda bisa menghapus data dari state atau memanggil API di sini
    alert(`Delete row with id: ${id}`);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-zebra ">
        <thead>
          <tr>
            <th>No</th>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {columns.map((column, cellIndex) => {
                // Konversi nama kolom ke lowercase untuk pencocokan yang lebih fleksibel
                const key = column.toLowerCase();
                return <td key={cellIndex}>{row[key] || row[column]}</td>;
              })}
              <td>
                <button
                  className="btn btn-sm btn-primary mr-2"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(row.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
