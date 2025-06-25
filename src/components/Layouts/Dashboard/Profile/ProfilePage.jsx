export default function ProfilePage() {
  const dataProfile = {
    nama: "John Doe",
    email: "john.doe@example.com",
    noTelepon: "081234567890",
    alamat: "Jl. Contoh No. 123, Jakarta",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 ml-4">Profil Saya</h1>
        </div>

        {/* Informasi Pengguna */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-blue-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Informasi Akun
            </h2>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Aktif
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Nama Lengkap</p>
              <p className="text-gray-800 font-semibold">{dataProfile.nama}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Email</p>
              <p className="text-gray-800 font-semibold">{dataProfile.email}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Nomor Telepon</p>
              <p className="text-gray-800 font-semibold">
                {dataProfile.noTelepon}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Alamat</p>
              <p className="text-gray-800 font-semibold">
                {dataProfile.alamat}
              </p>
            </div>
          </div>
        </div>

        {/* Edit Profil */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-purple-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ubah Profil
          </h2>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  defaultValue={dataProfile.nama}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={dataProfile.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                  placeholder="Masukkan email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password Saat Ini
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    placeholder="Masukkan password saat ini"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password Baru
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                    placeholder="Masukkan password baru"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg shadow-md transition duration-300 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        {/* Hapus Akun */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
          <div className="flex items-start mb-4">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Hapus Akun
              </h2>
              <p className="text-red-600 text-sm mt-1">
                PERINGATAN: Tindakan ini akan menghapus semua data Anda secara
                permanen dan tidak dapat dikembalikan!
              </p>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Konfirmasi Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                placeholder="Masukkan password Anda"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="konfirmasiHapus"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label
                htmlFor="konfirmasiHapus"
                className="ml-2 block text-sm text-gray-700"
              >
                Saya mengerti bahwa semua data saya akan dihapus secara permanen
              </label>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg shadow-md transition duration-300 disabled:opacity-50 flex items-center"
                disabled
                id="tombolHapus"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Hapus Akun Saya
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
